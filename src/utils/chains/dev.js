export const DevQuickSilverChainInfo = {
  chainId: "magic-1",
  chainName: "Quicksilver Dev",
  rpc: "https://rpc.dev.quicksilver.zone",
  rest: "https://lcd.dev.quicksilver.zone",
  apis: {
    rpc: [
      {
        address: "https://rpc.dev.quicksilver.zone",
        provider: "quicksilver",
      },
    ],
    rest: [
      {
        address: "https://lcd.dev.quicksilver.zone",
        provider: "quicksilver",
      },
    ],
    grpc: [],
  },
  bip44: {
    coinType: 118,
  },
  bech32Config: {
    bech32PrefixAccAddr: "quick",
    bech32PrefixAccPub: "quickpub",
    bech32PrefixValAddr: "quickvaloper",
    bech32PrefixValPub: "quickvaloperpub",
    bech32PrefixConsAddr: "quickvalcons",
    bech32PrefixConsPub: "quickvalconspub",
  },
  currencies: [
    {
      coinDenom: "QCK",
      coinMinimalDenom: "uqck",
      coinDecimals: 6,
      coinGeckoId: "quicksilver",
    },
    {
      coinDenom: "qATOM",
      coinMinimalDenom: "uqatom",
      coinDecimals: 6,
      coinGeckoId: "cosmos",
    },
    {
      coinDenom: "qSTARS",
      coinMinimalDenom: "uqstars",
      coinDecimals: 6,
      coinGeckoId: "stargaze",
    },
    {
      coinDenom: "qOSMO",
      coinMinimalDenom: "uqosmo",
      coinDecimals: 6,
      coinGeckoId: "osmosis",
    },
    {
      coinDenom: "qREGEN",
      coinMinimalDenom: "uqregen",
      coinDecimals: 6,
      coinGeckoId: "regen",
    },
    {
      coinDenom: "qJUNOX",
      coinMinimalDenom: "uqjunox",
      coinDecimals: 6,
      coinGeckoId: "juno",
    },
  ],
  feeCurrencies: [
    {
      coinDenom: "QCK",
      coinMinimalDenom: "uqck",
      coinDecimals: 6,
      coinGeckoId: "quicksilver",
    },
  ],
  stakeCurrency: {
    coinDenom: "QCK",
    coinMinimalDenom: "uqck",
    coinDecimals: 6,
    coinGeckoId: "quicksilver",
  },
  coinType: 118,
  gasPriceStep: {
    low: 0.0,
    average: 0.015,
    high: 0.03,
  },
};
export const devChains = [
  {
    $schema: "../chain.schema.json",
    chain_name: "magic-1",
    status: "Quicksilver",
    network_type: "testnet",
    pretty_name: "Quicksilver Dev",
    chain_id: "magic-1",
    bech32_prefix: "quick",
    daemon_name: "magic-1",
    slip44: 118,
    apis: {
      rpc: [
        {
          address: "https://rpc.dev.quicksilver.zone",
          provider: "quicksilver",
        },
      ],
      rest: [
        {
          address: "https://lcd.dev.quicksilver.zone",
          provider: "quicksilver",
        },
      ],
      grpc: [],
    },
    bip44: {
      coinType: 118,
    },
    staking: {
      staking_tokens: [
        {
          coinDenom: "QCK",
          coinMinimalDenom: "uqck",
          coinDecimals: 6,
          coinGeckoId: "quicksilver",
        },
        {
          coinDenom: "qATOM",
          coinMinimalDenom: "uqatom",
          coinDecimals: 6,
          coinGeckoId: "cosmos",
        },
        {
          coinDenom: "qSTARS",
          coinMinimalDenom: "uqstars",
          coinDecimals: 6,
          coinGeckoId: "stargaze",
        },
        {
          coinDenom: "qOSMO",
          coinMinimalDenom: "uqosmo",
          coinDecimals: 6,
          coinGeckoId: "osmosis",
        },
        {
          coinDenom: "qREGEN",
          coinMinimalDenom: "uqregen",
          coinDecimals: 6,
          coinGeckoId: "regen",
        },
        {
          coinDenom: "qJUNOX",
          coinMinimalDenom: "uqjunox",
          coinDecimals: 6,
          coinGeckoId: "juno",
        },
      ],
    },
    fees: {
      fee_tokens: [
        {
          coinDenom: "QCK",
          coinMinimalDenom: "uqck",
          coinDecimals: 6,
          coinGeckoId: "quicksilver",
        },
      ],
    },
    codebase: {
      git_repo: "https://secp256k1.net/8ball.git",
      recommended_version: "v1",
      compatible_versions: ["v1"],
      cosmos_sdk_version: "0.46.7",
      cosmwasm_enabled: true,
      binaries: {
        "linux/amd64": "https://8ball.info/8ball.tar.gz",
      },
      genesis: {
        genesis_url: "https://8ball.info/8ball-genesis.json",
      },
      versions: [
        {
          name: "v1",
          recommended_version: "v1",
          compatible_versions: ["v1"],
          cosmos_sdk_version: "0.46.7",
          cosmwasm_enabled: true,
          binaries: {
            "linux/amd64": "https://8ball.info/8ball.tar.gz",
          },
        },
      ],
    },
    logo_URIs: {
      png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/8ball/images/8ball.png",
      svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/8ball/images/8ball.svg",
    },
    peers: {
      seeds: [],
      persistent_peers: [
        {
          id: "fca96d0a1d7357afb226a49c4c7d9126118c37e9",
          address: "one.8ball.info:26656",
          provider: "8ball",
        },
        {
          id: "aa918e17c8066cd3b031f490f0019c1a95afe7e3",
          address: "two.8ball.info:26656",
          provider: "8ball",
        },
        {
          id: "ce168b8022e525650011352175fa020ce75edcfa",
          address: "45.141.122.178:34656",
          provider: "genznodes",
        },
        {
          id: "49778546e7511a1cd6dde65805cd70547c75ce2b",
          address: "rpc.8ball.nodexcapital.com:11056",
          provider: "NodeX Validator",
        },
      ],
    },
    explorers: [
      {
        url: "https://explorer.8ball.info/",
        tx_page: "https://explorer.8ball.info/8ball/tx/${txHash}",
      },
      {
        kind: "ping.pub",
        url: "https://ping.pub/8ball",
        tx_page: "https://ping.pub/8ball/tx/${txHash}",
      },
      {
        kind: "NodeStake Explorer",
        url: "https://explorer.nodestake.top/8ball/",
        tx_page: "https://explorer.nodestake.top/8ball/tx/${txHash}",
      },
      {
        kind: "TC Network",
        url: "https://explorer.tcnetwork.io/8ball",
        tx_page: "https://explorer.tcnetwork.io/8ball/transaction/${txHash}",
      },
      {
        kind: "TC Network",
        url: "https://explorer.co.id/8ball",
        tx_page: "https://explorer.co.id/8ball/tx/${txHash}",
      },
      {
        kind: "NODEXPLORER",
        url: "https://explorer.nodexcapital.com/8ball",
        tx_page: "https://explorer.nodexcapital.com/8ball/tx/${txHash}",
      },
    ],
  },
  {
    $schema: "../chain.schema.json",
    chain_name: "osmo-test-5",
    status: "live",
    network_type: "testnet",
    pretty_name: "Osmosis Testnet",
    chain_id: "osmo-test-5",
    bech32_prefix: "osmo-test-5",
    daemon_name: "osmo-test-5",
    slip44: 118,
    fees: {
      fee_tokens: [
        {
          denom: "OSMO",
          fixed_min_gas_price: 0,
          low_gas_price: 0,
          average_gas_price: 0.025,
          high_gas_price: 0.04,
        },
      ],
    },
    staking: {
      staking_tokens: [
        {
          denom: "OSMO",
          minimal_denom: "uosmo",
          decimals: 6,
          gecko_id: "osmosis",
        },
      ],
    },
    apis: {
      rpc: [
        {
          address: "https://rpc.osmo-test-5.dev.quicksilver.zone",
          provider: "osmo",
        },
      ],
      rest: [
        {
          address: "https://lcd.osmo-test-5.dev.quicksilver.zone",
          provider: "osmo",
        },
      ],
      grpc: [],
    },
    codebase: {
      git_repo: "https://secp256k1.net/8ball.git",
      recommended_version: "v1",
      compatible_versions: ["v1"],
      cosmos_sdk_version: "0.46.7",
      cosmwasm_enabled: true,
      binaries: {
        "linux/amd64": "https://8ball.info/8ball.tar.gz",
      },
      genesis: {
        genesis_url: "https://8ball.info/8ball-genesis.json",
      },
      versions: [
        {
          name: "v1",
          recommended_version: "v1",
          compatible_versions: ["v1"],
          cosmos_sdk_version: "0.46.7",
          cosmwasm_enabled: true,
          binaries: {
            "linux/amd64": "https://8ball.info/8ball.tar.gz",
          },
        },
      ],
    },
    logo_URIs: {
      png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/8ball/images/8ball.png",
      svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/8ball/images/8ball.svg",
    },
    peers: {
      seeds: [],
      persistent_peers: [
        {
          id: "fca96d0a1d7357afb226a49c4c7d9126118c37e9",
          address: "one.8ball.info:26656",
          provider: "8ball",
        },
        {
          id: "aa918e17c8066cd3b031f490f0019c1a95afe7e3",
          address: "two.8ball.info:26656",
          provider: "8ball",
        },
        {
          id: "ce168b8022e525650011352175fa020ce75edcfa",
          address: "45.141.122.178:34656",
          provider: "genznodes",
        },
        {
          id: "49778546e7511a1cd6dde65805cd70547c75ce2b",
          address: "rpc.8ball.nodexcapital.com:11056",
          provider: "NodeX Validator",
        },
      ],
    },
    explorers: [
      {
        url: "https://explorer.8ball.info/",
        tx_page: "https://explorer.8ball.info/8ball/tx/${txHash}",
      },
      {
        kind: "ping.pub",
        url: "https://ping.pub/8ball",
        tx_page: "https://ping.pub/8ball/tx/${txHash}",
      },
      {
        kind: "NodeStake Explorer",
        url: "https://explorer.nodestake.top/8ball/",
        tx_page: "https://explorer.nodestake.top/8ball/tx/${txHash}",
      },
      {
        kind: "TC Network",
        url: "https://explorer.tcnetwork.io/8ball",
        tx_page: "https://explorer.tcnetwork.io/8ball/transaction/${txHash}",
      },
      {
        kind: "TC Network",
        url: "https://explorer.co.id/8ball",
        tx_page: "https://explorer.co.id/8ball/tx/${txHash}",
      },
      {
        kind: "NODEXPLORER",
        url: "https://explorer.nodexcapital.com/8ball",
        tx_page: "https://explorer.nodexcapital.com/8ball/tx/${txHash}",
      },
    ],
  },
  {
    $schema: "../chain.schema.json",
    chain_name: "regen-redwood-1",
    status: "live",
    network_type: "testnet",
    pretty_name: "Regen Testnet",
    chain_id: "regen-redwood-1",
    bech32_prefix: "regen-redwood-1",
    daemon_name: "regen-redwood-1",
    slip44: 118,
    fees: {
      fee_tokens: [
        {
          denom: "REGEN",
          fixed_min_gas_price: 0,
          low_gas_price: 0,
          average_gas_price: 0.025,
          high_gas_price: 0.04,
        },
      ],
    },
    staking: {
      staking_tokens: [
        {
          denom: "REGEN",
          minimal_denom: "uregen",
          decimals: 6,
          gecko_id: "regen",
        },
      ],
    },
    apis: {
      rpc: [
        {
          address: "https://rpc.regen-redwood-1.dev.quicksilver.zone",
          provider: "regen",
        },
      ],
      rest: [
        {
          address: "https://lcd.regen-redwood-1.dev.quicksilver.zone",
          provider: "regen",
        },
      ],
    },
    codebase: {
      git_repo: "https://secp256k1.net/8ball.git",
      recommended_version: "v1",
      compatible_versions: ["v1"],
      cosmos_sdk_version: "0.46.7",
      cosmwasm_enabled: true,
      binaries: {
        "linux/amd64": "https://8ball.info/8ball.tar.gz",
      },
      genesis: {
        genesis_url: "https://8ball.info/8ball-genesis.json",
      },
      versions: [
        {
          name: "v1",
          recommended_version: "v1",
          compatible_versions: ["v1"],
          cosmos_sdk_version: "0.46.7",
          cosmwasm_enabled: true,
          binaries: {
            "linux/amd64": "https://8ball.info/8ball.tar.gz",
          },
        },
      ],
    },
    logo_URIs: {
      png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/8ball/images/8ball.png",
      svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/8ball/images/8ball.svg",
    },
    peers: {
      seeds: [],
      persistent_peers: [
        {
          id: "fca96d0a1d7357afb226a49c4c7d9126118c37e9",
          address: "one.8ball.info:26656",
          provider: "8ball",
        },
        {
          id: "aa918e17c8066cd3b031f490f0019c1a95afe7e3",
          address: "two.8ball.info:26656",
          provider: "8ball",
        },
        {
          id: "ce168b8022e525650011352175fa020ce75edcfa",
          address: "45.141.122.178:34656",
          provider: "genznodes",
        },
        {
          id: "49778546e7511a1cd6dde65805cd70547c75ce2b",
          address: "rpc.8ball.nodexcapital.com:11056",
          provider: "NodeX Validator",
        },
      ],
    },
    explorers: [
      {
        url: "https://explorer.8ball.info/",
        tx_page: "https://explorer.8ball.info/8ball/tx/${txHash}",
      },
      {
        kind: "ping.pub",
        url: "https://ping.pub/8ball",
        tx_page: "https://ping.pub/8ball/tx/${txHash}",
      },
      {
        kind: "NodeStake Explorer",
        url: "https://explorer.nodestake.top/8ball/",
        tx_page: "https://explorer.nodestake.top/8ball/tx/${txHash}",
      },
      {
        kind: "TC Network",
        url: "https://explorer.tcnetwork.io/8ball",
        tx_page: "https://explorer.tcnetwork.io/8ball/transaction/${txHash}",
      },
      {
        kind: "TC Network",
        url: "https://explorer.co.id/8ball",
        tx_page: "https://explorer.co.id/8ball/tx/${txHash}",
      },
      {
        kind: "NODEXPLORER",
        url: "https://explorer.nodexcapital.com/8ball",
        tx_page: "https://explorer.nodexcapital.com/8ball/tx/${txHash}",
      },
    ],
  },
  {
    $schema: "../chain.schema.json",
    chain_name: "elgafar-1",
    status: "live",
    network_type: "testnet",
    pretty_name: "Stargaze Testnet",
    chain_id: "elgafar-1",
    bech32_prefix: "elgafar-1",
    daemon_name: "elgafar-1",
    slip44: 118,
    fees: {
      fee_tokens: [
        {
          denom: "STARS",
          fixed_min_gas_price: 0,
          low_gas_price: 0,
          average_gas_price: 0.025,
          high_gas_price: 0.04,
        },
      ],
    },
    staking: {
      staking_tokens: [
        {
          denom: "STARS",
          minimal_denom: "ustars",
          decimals: 6,
          gecko_id: "stargaze",
        },
      ],
    },
    apis: {
      rpc: [
        {
          address: "https://rpc.elgafar-1.dev.quicksilver.zone",
          provider: "elgafar-1",
        },
      ],
      rest: [
        {
          address: "https://lcd.elgafar-1.dev.quicksilver.zone",
          provider: "elgafar-1",
        },
      ],
      grpc: [],
    },
    codebase: {
      git_repo: "https://secp256k1.net/8ball.git",
      recommended_version: "v1",
      compatible_versions: ["v1"],
      cosmos_sdk_version: "0.46.7",
      cosmwasm_enabled: true,
      binaries: {
        "linux/amd64": "https://8ball.info/8ball.tar.gz",
      },
      genesis: {
        genesis_url: "https://8ball.info/8ball-genesis.json",
      },
      versions: [
        {
          name: "v1",
          recommended_version: "v1",
          compatible_versions: ["v1"],
          cosmos_sdk_version: "0.46.7",
          cosmwasm_enabled: true,
          binaries: {
            "linux/amd64": "https://8ball.info/8ball.tar.gz",
          },
        },
      ],
    },
    logo_URIs: {
      png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/8ball/images/8ball.png",
      svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/8ball/images/8ball.svg",
    },
    peers: {
      seeds: [],
      persistent_peers: [
        {
          id: "fca96d0a1d7357afb226a49c4c7d9126118c37e9",
          address: "one.8ball.info:26656",
          provider: "8ball",
        },
        {
          id: "aa918e17c8066cd3b031f490f0019c1a95afe7e3",
          address: "two.8ball.info:26656",
          provider: "8ball",
        },
        {
          id: "ce168b8022e525650011352175fa020ce75edcfa",
          address: "45.141.122.178:34656",
          provider: "genznodes",
        },
        {
          id: "49778546e7511a1cd6dde65805cd70547c75ce2b",
          address: "rpc.8ball.nodexcapital.com:11056",
          provider: "NodeX Validator",
        },
      ],
    },
    explorers: [
      {
        url: "https://explorer.8ball.info/",
        tx_page: "https://explorer.8ball.info/8ball/tx/${txHash}",
      },
      {
        kind: "ping.pub",
        url: "https://ping.pub/8ball",
        tx_page: "https://ping.pub/8ball/tx/${txHash}",
      },
      {
        kind: "NodeStake Explorer",
        url: "https://explorer.nodestake.top/8ball/",
        tx_page: "https://explorer.nodestake.top/8ball/tx/${txHash}",
      },
      {
        kind: "TC Network",
        url: "https://explorer.tcnetwork.io/8ball",
        tx_page: "https://explorer.tcnetwork.io/8ball/transaction/${txHash}",
      },
      {
        kind: "TC Network",
        url: "https://explorer.co.id/8ball",
        tx_page: "https://explorer.co.id/8ball/tx/${txHash}",
      },
      {
        kind: "NODEXPLORER",
        url: "https://explorer.nodexcapital.com/8ball",
        tx_page: "https://explorer.nodexcapital.com/8ball/tx/${txHash}",
      },
    ],
  },
  {
    $schema: "../chain.schema.json",
    chain_name: "theta-testnet-001",
    status: "live",
    network_type: "testnet",
    pretty_name: "Cosmos Hub Test",
    chain_id: "theta-testnet-001",
    bech32_prefix: "theta-testnet-001",
    daemon_name: "theta-testnet-001",
    slip44: 118,
    fees: {
      fee_tokens: [
        {
          denom: "ATOM",
          fixed_min_gas_price: 0,
          low_gas_price: 0,
          average_gas_price: 0.025,
          high_gas_price: 0.04,
        },
      ],
    },
    staking: {
      staking_tokens: [
        {
          denom: "ATOM",
          minimal_denom: "uatom",
          decimals: 6,
          gecko_id: "cosmos",
        },
      ],
    },
    apis: {
      rpc: [
        {
          address: "https://rpc.theta-testnet-001.dev.quicksilver.zone",
          provider: "theta-testnet-001",
        },
      ],
      rest: [
        {
          address: "https://lcd.theta-testnet-001.dev.quicksilver.zone",
          provider: "theta-testnet-001",
        },
      ],
      grpc: [],
    },
    codebase: {
      git_repo: "https://secp256k1.net/8ball.git",
      recommended_version: "v1",
      compatible_versions: ["v1"],
      cosmos_sdk_version: "0.46.7",
      cosmwasm_enabled: true,
      binaries: {
        "linux/amd64": "https://8ball.info/8ball.tar.gz",
      },
      genesis: {
        genesis_url: "https://8ball.info/8ball-genesis.json",
      },
      versions: [
        {
          name: "v1",
          recommended_version: "v1",
          compatible_versions: ["v1"],
          cosmos_sdk_version: "0.46.7",
          cosmwasm_enabled: true,
          binaries: {
            "linux/amd64": "https://8ball.info/8ball.tar.gz",
          },
        },
      ],
    },
    logo_URIs: {
      png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/8ball/images/8ball.png",
      svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/8ball/images/8ball.svg",
    },
    peers: {
      seeds: [],
      persistent_peers: [
        {
          id: "fca96d0a1d7357afb226a49c4c7d9126118c37e9",
          address: "one.8ball.info:26656",
          provider: "8ball",
        },
        {
          id: "aa918e17c8066cd3b031f490f0019c1a95afe7e3",
          address: "two.8ball.info:26656",
          provider: "8ball",
        },
        {
          id: "ce168b8022e525650011352175fa020ce75edcfa",
          address: "45.141.122.178:34656",
          provider: "genznodes",
        },
        {
          id: "49778546e7511a1cd6dde65805cd70547c75ce2b",
          address: "rpc.8ball.nodexcapital.com:11056",
          provider: "NodeX Validator",
        },
      ],
    },
    explorers: [
      {
        url: "https://explorer.8ball.info/",
        tx_page: "https://explorer.8ball.info/8ball/tx/${txHash}",
      },
      {
        kind: "ping.pub",
        url: "https://ping.pub/8ball",
        tx_page: "https://ping.pub/8ball/tx/${txHash}",
      },
      {
        kind: "NodeStake Explorer",
        url: "https://explorer.nodestake.top/8ball/",
        tx_page: "https://explorer.nodestake.top/8ball/tx/${txHash}",
      },
      {
        kind: "TC Network",
        url: "https://explorer.tcnetwork.io/8ball",
        tx_page: "https://explorer.tcnetwork.io/8ball/transaction/${txHash}",
      },
      {
        kind: "TC Network",
        url: "https://explorer.co.id/8ball",
        tx_page: "https://explorer.co.id/8ball/tx/${txHash}",
      },
      {
        kind: "NODEXPLORER",
        url: "https://explorer.nodexcapital.com/8ball",
        tx_page: "https://explorer.nodexcapital.com/8ball/tx/${txHash}",
      },
    ],
  },
];
