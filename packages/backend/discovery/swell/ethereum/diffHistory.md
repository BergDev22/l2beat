Generated with discovered.json: 0xaa1dd18f19c72836f6b4087c23b82a0cab0f6b45

# Diff at Sat, 04 May 2024 06:16:59 GMT:

- author: sekuba (<sekuba@users.noreply.github.com>)
- current block number: 19794895

## Description

Initial config for the Pre-launch phase of swell. There are two main contracts:
- Zap: Non-escrowing entry contract that wraps ETH, eETH or stETH and deposits them into the Vault. It is immutable and has no owner functions.
- SwellL2PrelaunchVault: Escrow that can hold predefined ERC-20s and nothing more. It is immutable and owner functions (`rescueERC20()`) are currently proxied with a 2d timelock in front of the SwellMultisig.


## Initial discovery

```diff
+   Status: CREATED
    contract SwellMultisig (0x20fDF47509C5eFC0e1101e3CE443691781C17F90)
    +++ description: None
```

```diff
+   Status: CREATED
    contract SwellL2PrelaunchVault (0x38D43a6Cb8DA0E855A42fB6b0733A0498531d774)
    +++ description: None
```

```diff
+   Status: CREATED
    contract Zap (0xBD9fc4FdB07e46a69349101E862e82aa002aDe0d)
    +++ description: None
```

```diff
+   Status: CREATED
    contract Timelock (0xCa2DF225ba3c4743E02611EC423FaAC311dEEEd4)
    +++ description: None
```
