import {
  assert,
  AmountConfigEntry,
  EthereumAddress,
  PriceConfigEntry,
  ProjectId,
  UnixTime,
} from '@l2beat/shared-pure'

import {
  ManagedChildIndexer,
  ManagedChildIndexerOptions,
} from '../../../tools/uif/ManagedChildIndexer'
import { AmountRepository } from '../repositories/AmountRepository'
import { PriceRepository } from '../repositories/PriceRepository'
import { ValueRepository } from '../repositories/ValueRepository'
import { SyncOptimizer } from '../utils/SyncOptimizer'
import { createAmountId } from '../utils/createAmountId'
import { createPriceId } from '../utils/createPriceId'

export interface ValueIndexerDeps
  extends Omit<ManagedChildIndexerOptions, 'name'> {
  priceRepo: PriceRepository
  amountRepo: AmountRepository
  valueRepo: ValueRepository
  priceConfigs: PriceConfigEntry[]
  amountConfigs: AmountConfigEntry[]
  project: ProjectId
  dataSource: string
  syncOptimizer: SyncOptimizer
}

interface Values {
  canonical: bigint
  canonicalForTotal: bigint
  external: bigint
  externalForTotal: bigint
  native: bigint
  nativeForTotal: bigint
}

type AssetId = string
type PriceId = string

/**
 * Indexer that aggregates TVL for a project. Skips the configurations that are not included in the total.
 */
export class ValueIndexer extends ManagedChildIndexer {
  private readonly amountConfigs: (AmountConfigEntry & { configId: string })[]
  private readonly priceConfigIds: Map<AssetId, PriceId>

  constructor(private readonly $: ValueIndexerDeps) {
    const logger = $.logger.tag($.tag)
    const name = 'value_indexer'
    super({ ...$, name, logger })

    this.amountConfigs = $.amountConfigs.map((x) => ({
      ...x,
      configId: createAmountId(x),
    }))
    this.priceConfigIds = getPriceConfigIds($.priceConfigs)
  }

  override async update(from: number, to: number): Promise<number> {
    // Potential future optimization
    // check if db.configHash === this.configHash
    // YES - skip update
    // NO - continue update

    const timestamp = this.$.syncOptimizer.getTimestampToSync(
      new UnixTime(from),
    )
    if (timestamp.toNumber() > to) {
      return to
    }

    const value = await this.getTvlAt(timestamp)
    const isZeroValue = Object.values(value).every((x) => x === 0)
    if (isZeroValue) {
      return timestamp.toNumber()
    }

    await this.$.valueRepo.addOrUpdate({
      projectId: this.$.project,
      timestamp,
      dataSource: this.$.dataSource,
      ...value,
    })

    return timestamp.toNumber()
  }

  async getTvlAt(timestamp: UnixTime): Promise<Values> {
    const configIds = this.amountConfigs.map((x) => x.configId)
    const records = await this.$.amountRepo.getByConfigIdsAndTimestamp(
      configIds,
      timestamp,
    )

    const prices = await this.$.priceRepo.getByTimestamp(timestamp)

    const results = {
      canonical: 0n,
      canonicalForTotal: 0n,
      external: 0n,
      externalForTotal: 0n,
      native: 0n,
      nativeForTotal: 0n,
    }

    for (const record of records) {
      const amountConfig = this.amountConfigs.find(
        (x) => x.configId === record.configId,
      )
      assert(amountConfig, 'Config not found')

      const priceId = this.priceConfigIds.get(createAssetId(amountConfig))
      const price = prices.find((x) => x.configId === priceId)
      assert(price, 'Price not found')
      const value = calculateValue({
        amount: record.amount,
        priceUsd: price.priceUsd,
        decimals: amountConfig.decimals,
      })

      results[amountConfig.source] += value

      if (amountConfig.includeInTotal) {
        const forTotalKey = `${amountConfig.source}ForTotal` as const
        results[forTotalKey] += value
      }
    }

    return results
  }

  override async invalidate(targetHeight: number): Promise<number> {
    // Do not delete data
    return await Promise.resolve(targetHeight)
  }
}

const USD_DECIMALS = 2
export function calculateValue({
  amount,
  priceUsd,
  decimals,
}: {
  amount: bigint
  priceUsd: number
  decimals: number
}) {
  // we want to expose the balance as an integer, keeping the USD decimal places
  const priceWithDecimals = Math.floor(priceUsd * 10 ** USD_DECIMALS)
  return (amount * BigInt(priceWithDecimals)) / 10n ** BigInt(decimals)
}

function createAssetId(price: {
  address: EthereumAddress | 'native'
  chain: string
}): string {
  return `${price.chain}-${price.address.toString()}`
}

function getPriceConfigIds(prices: PriceConfigEntry[]) {
  const result = new Map<string, string>()
  for (const p of prices) {
    result.set(createAssetId(p), createPriceId(p))
  }

  return result
}
