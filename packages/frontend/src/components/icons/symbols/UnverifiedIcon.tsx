import React, { SVGAttributes } from 'react'

import { Icon } from '../Icon'

export function UnverifiedIcon(props: SVGAttributes<SVGElement>) {
  return (
    <Icon
      viewBox="0 0 20 20"
      width="18"
      height="18"
      aria-label="Unverified contract icon"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19.965 8.46092C20.0958 9.21224 19.8555 9.98305 19.3218 10.5231L18.5559 11.297C18.3208 11.5344 18.2574 11.899 18.3978 12.2037L18.856 13.1965C19.1753 13.8889 19.1403 14.6966 18.7632 15.3577C18.3861 16.0187 17.712 16.4531 16.9604 16.5193L15.8823 16.6146C15.5513 16.6434 15.271 16.8813 15.1854 17.2065L14.9056 18.2645C14.7104 19.0014 14.1706 19.5974 13.4621 19.8589C13.2051 19.9533 12.9375 19.9999 12.6709 19.9999C12.202 19.9999 11.7367 19.8558 11.3429 19.5763L10.4559 18.9471C10.1837 18.7532 9.81779 18.7553 9.5456 18.9471L8.65912 19.5763C8.03974 20.0148 7.24804 20.1199 6.53946 19.8589C5.83037 19.5979 5.29108 19.0019 5.09594 18.2645L4.81615 17.2065C4.72999 16.8818 4.45021 16.6439 4.11923 16.6146L3.04014 16.5193C2.28848 16.4531 1.61487 16.0187 1.23726 15.3577C0.859655 14.6966 0.825189 13.8889 1.144 13.197L1.6022 12.2037C1.74259 11.899 1.67924 11.5344 1.44406 11.297L0.678201 10.5226C0.144485 9.98305 -0.0957638 9.21224 0.0350045 8.46041C0.165773 7.70858 0.652352 7.06701 1.3366 6.74494L2.31838 6.28235C2.61996 6.13978 2.80242 5.81926 2.77353 5.48437L2.67875 4.39303C2.61286 3.63248 2.91799 2.88578 3.4958 2.39499C4.07361 1.90419 4.85366 1.73034 5.58252 1.92676L6.62816 2.21139C6.95001 2.29703 7.29315 2.1719 7.48372 1.89599L8.10462 0.99851C8.53697 0.373864 9.24605 0 10.0003 0C10.7545 0 11.4635 0.373864 11.8954 0.999535L12.5163 1.89701C12.7069 2.17293 13.051 2.29806 13.3713 2.21241L14.4175 1.92779C15.1453 1.73188 15.9269 1.90573 16.5047 2.39601C17.0825 2.88681 17.3876 3.63351 17.3218 4.39406L17.227 5.48488C17.1976 5.82028 17.3805 6.14081 17.6816 6.28235L18.6634 6.74545C19.3476 7.06752 19.8342 7.7096 19.965 8.46092ZM7.70711 6.29289C7.31658 5.90237 6.68342 5.90237 6.29289 6.29289C5.90237 6.68342 5.90237 7.31658 6.29289 7.70711L8.58579 10L6.29289 12.2929C5.90237 12.6834 5.90237 13.3166 6.29289 13.7071C6.68342 14.0976 7.31658 14.0976 7.70711 13.7071L10 11.4142L12.2929 13.7071C12.6834 14.0976 13.3166 14.0976 13.7071 13.7071C14.0976 13.3166 14.0976 12.6834 13.7071 12.2929L11.4142 10L13.7071 7.70711C14.0976 7.31658 14.0976 6.68342 13.7071 6.29289C13.3166 5.90237 12.6834 5.90237 12.2929 6.29289L10 8.58579L7.70711 6.29289Z"
      />
    </Icon>
  )
}
