export const customChain = [
  {
    $schema: "../chain.schema.json",
    chain_name: "8ball",
    status: "coming soon",
    website: "https://8ball.info/",
    network_type: "mainnet",
    pretty_name: "8ball",
    chain_id: "eightball-1",
    bech32_prefix: "8ball",
    daemon_name: "8ball",
    node_home: "$HOME/.8ball",
    key_algos: ["secp256k1"],
    slip44: 118,
    fees: {
      fee_tokens: [
        {
          denom: "uebl",
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
          denom: "uebl",
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
    apis: {
      rpc: [
        {
          address: "https://rpc.8ball.info/",
          provider: "8ball",
        },
        {
          address: "https://rpc.8ball.nodestake.top",
          provider: "NodeStake",
        },
        {
          address: "https://8ball-rpc.genznodes.dev/",
          provider: "genznodes",
        },
        {
          address: "https://rpc-8ball.comunitynode.my.id",
          provider: "ComunityNode",
        },
        {
          address: "https://rpc-8ball.nodine.id",
          provider: "Nodine.ID",
        },
        {
          address: "https://rpc.8ball.nodexcapital.com",
          provider: "NodeX Validator",
        },
      ],
      rest: [
        {
          address: "https://rest.8ball.info",
          provider: "8ball",
        },
        {
          address: "https://api.8ball.nodestake.top",
          provider: "NodeStake",
        },
        {
          address: "https://8ball-api.genznodes.dev/",
          provider: "genznodes",
        },
        {
          address: "https://api-8ball.comunitynode.my.id",
          provider: "ComunityNode",
        },
        {
          address: "https://api-8ball.nodine.id/",
          provider: "Nodine.ID",
        },
        {
          address: "https://rest.8ball.nodexcapital.com",
          provider: "NodeX Validator",
        },
      ],
      grpc: [
        {
          address: "grpc.8ball.nodestake.top:443",
          provider: "NodeStake",
        },
        {
          address: "8ball-grpc.genznodes.dev:31090",
          provider: "genznodes",
        },
        {
          address: "https://grpc.8ball.nodexcapital.com:443",
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
    chain_name: "cosmoshub",
    chain_id: "cosmoshub-4",
    website: "https://cosmos.network/",
    pretty_name: "Cosmos Hub",
    status: "live",
    network_type: "mainnet",
    bech32_prefix: "cosmos",
    daemon_name: "gaiad",
    node_home: "$HOME/.gaia",
    key_algos: ["secp256k1"],
    slip44: 118,
    fees: {
      fee_tokens: [
        {
          denom: "uatom",
          fixed_min_gas_price: 0,
          low_gas_price: 0.01,
          average_gas_price: 0.025,
          high_gas_price: 0.03,
        },
      ],
    },
    staking: {
      staking_tokens: [
        {
          denom: "uatom",
        },
      ],
    },
    codebase: {
      git_repo: "https://github.com/cosmos/gaia",
      recommended_version: "v10.0.2",
      compatible_versions: ["v10.0.0", "v10.0.1", "v10.0.2"],
      binaries: {
        "linux/amd64":
          "https://github.com/cosmos/gaia/releases/download/v10.0.2/gaiad-v10.0.2-linux-amd64",
        "linux/arm64":
          "https://github.com/cosmos/gaia/releases/download/v10.0.2/gaiad-v10.0.2-linux-arm64",
        "darwin/amd64":
          "https://github.com/cosmos/gaia/releases/download/v10.0.2/gaiad-v10.0.2-darwin-amd64",
        "darwin/arm64":
          "https://github.com/cosmos/gaia/releases/download/v10.0.2/gaiad-v10.0.2-darwin-arm64",
        "windows/amd64":
          "https://github.com/cosmos/gaia/releases/download/v10.0.2/gaiad-v10.0.2-windows-amd64.exe",
      },
      genesis: {
        genesis_url:
          "https://github.com/cosmos/mainnet/raw/master/genesis/genesis.cosmoshub-4.json.gz",
      },
      versions: [
        {
          name: "v9-Lambda",
          tag: "v9.1.1",
          recommended_version: "v9.1.1",
          compatible_versions: ["v9.1.1"],
          cosmos_sdk_version: "v0.45.15-ics",
          ibc_go_version: "v4.2.1",
          consensus: {
            type: "cometbft",
            version: "v0.34.27",
          },
          height: 15213800,
          binaries: {
            "linux/amd64":
              "https://github.com/cosmos/gaia/releases/download/v9.1.1/gaiad-v9.1.1-linux-amd64?checksum=sha256:f62814711be991e535b2fd86f7d4ed8c055bebf774253a06477dc182ce98cdc3",
            "linux/arm64":
              "https://github.com/cosmos/gaia/releases/download/v9.1.1/gaiad-v9.1.1-linux-arm64?checksum=sha256:a7112c03c7a2bec2a761a3d430bfea9616ed0ebb10c785cafdd6fac117abc504",
            "darwin/amd64":
              "https://github.com/cosmos/gaia/releases/download/v9.1.1/gaiad-v9.1.1-darwin-amd64?checksum=sha256:959f3ddbf3a65b557574527222c5a673b706e9d52a203dfbda2ceb827b760261",
            "darwin/arm64":
              "https://github.com/cosmos/gaia/releases/download/v9.1.1/gaiad-v9.1.1-darwin-arm64?checksum=sha256:0a913a3a9a31456ddfba26eccdfccca61d00b06498faa94019776df391509d27",
            "windows/amd64":
              "https://github.com/cosmos/gaia/releases/download/v9.1.1/gaiad-v9.1.1-windows-amd64.exe?checksum=sha256:db1d82650ed2a0aa9abccb2bb60dca902c4d1444444f6c76a8b6d61d6bc41e08",
          },
          next_version_name: "v10",
        },
        {
          name: "v10",
          tag: "v10.0.2",
          proposal: 798,
          height: 15816200,
          recommended_version: "v10.0.2",
          compatible_versions: ["v10.0.0", "v10.0.1", "v10.0.2"],
          cosmos_sdk_version: "v0.45.16-ics",
          ibc_go_version: "v4.4.2",
          consensus: {
            type: "cometbft",
            version: "v0.34.29",
          },
          binaries: {
            "linux/amd64":
              "https://github.com/cosmos/gaia/releases/download/v10.0.2/gaiad-v10.0.2-linux-amd64?checksum=sha256:fcb8210308223d78bc36f3d4c89e2578dcf784994c052cea97efd61f1672cf72",
            "linux/arm64":
              "https://github.com/cosmos/gaia/releases/download/v10.0.2/gaiad-v10.0.2-linux-arm64?checksum=sha256:db9b69cf224b410c669fa4f820192890357534e74d4693a744ef915028567462",
            "darwin/amd64":
              "https://github.com/cosmos/gaia/releases/download/v10.0.2/gaiad-v10.0.2-darwin-amd64?checksum=sha256:d0bee3b4b243fe1f88ad3258f4648de3a73787434702bcac6e31ca38f81a283a",
            "darwin/arm64":
              "https://github.com/cosmos/gaia/releases/download/v10.0.2/gaiad-v10.0.2-darwin-arm64?checksum=sha256:c8124d66ffa99b51da274656f6c3401b1ec9e165a76f3f01699761672e83a136gaiad-v10.0.1-linux-amd64",
            "windows/amd64":
              "https://github.com/cosmos/gaia/releases/download/v10.0.2/gaiad-v10.0.2-windows-amd64.exe?checksum=sha256:c02ab2b8fc347f858db1c33fcacafa2467ca550ed83178aee67331762e876926",
          },
          next_version_name: "",
        },
      ],
    },
    logo_URIs: {
      png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/cosmoshub/images/atom.png",
      svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/cosmoshub/images/atom.svg",
    },
    peers: {
      seeds: [
        {
          id: "ba3bacc714817218562f743178228f23678b2873",
          address: "public-seed-node.cosmoshub.certus.one:26656",
          provider: "certusone",
        },
        {
          id: "ade4d8bc8cbe014af6ebdf3cb7b1e9ad36f412c0",
          address: "seeds.polkachu.com:14956",
          provider: "Polkachu",
        },
        {
          id: "20e1000e88125698264454a884812746c2eb4807",
          address: "seeds.lavenderfive.com:14956",
          provider: "Lavender.Five Nodes 🐝",
        },
        {
          id: "57a5297537b9b6ef8b105c08a8ad3f6ac452c423",
          address: "seeds.goldenratiostaking.net:1618",
          provider: "Golden Ratio Staking",
        },
        {
          id: "7aa410eb8f699c366b1f1e2904ba6b0d1cac379b",
          address: "seeds.whispernode.com:14956",
          provider: "WhisperNode🤐",
        },
        {
          id: "e1b058e5cfa2b836ddaa496b10911da62dcf182e",
          address: "cosmoshub-seed-de.allnodes.me:26656",
          provider: "Allnodes.com ⚡️ Nodes & Staking",
        },
        {
          id: "e726816f42831689eab9378d5d577f1d06d25716",
          address: "cosmoshub-seed-us.allnodes.me:26656",
          provider: "Allnodes.com ⚡️ Nodes & Staking",
        },
        {
          id: "400f3d9e30b69e78a7fb891f60d76fa3c73f0ecc",
          address: "cosmoshub.rpc.kjnodes.com:11359",
          provider: "kjnodes",
        },
        {
          id: "fe21dd474640247888fc7c4dce82da8da08a8bfd",
          address: "seed-cosmos-hub-01.stakeflow.io:26656",
          provider: "Stakeflow",
        },
        {
          id: "8fdb467a66ac802a9f2d5f7a1ca484d8209ea755",
          address: "cosmos-seed.panthea.eu:40656",
          provider: "Panthea EU",
        },
        {
          id: "11c6114a18f7b380e536b0bd17c031f4746e4ded",
          address: "seed-node.mms.team:43656",
          provider: "MMS",
        },
      ],
      persistent_peers: [
        {
          id: "d6318b3bd51a5e2b8ed08f2e520d50289ed32bf1",
          address: "52.79.43.100:26656",
        },
        {
          id: "b0e746acb6fbed7a0311fe21cfb2ee94581ca3bc",
          address: "51.79.21.187:26656",
        },
        {
          id: "1da54d20c7339713f1d6d28dd2117087dd33d0ca",
          address: "cosmos-seed.icycro.org:26656",
          provider: "IcyCRO 🧊",
        },
        {
          id: "fe21dd474640247888fc7c4dce82da8da08a8bfd",
          address: "peer-cosmos-hub-01.stakeflow.io:26656",
          provider: "Stakeflow",
        },
        {
          id: "01c0d24922dcdf6f8816ec814a5c3436c5d5fbc5",
          address: "65.108.195.29:36656",
          provider: "Staketab",
        },
        {
          id: "28d36c3d45f0208528de3c38f2934ae241bd23e7",
          address: "peer-cosmoshub.mms.team:26656",
          provider: "MMS",
        },
      ],
    },
    apis: {
      rpc: [
        {
          address: "https://rpc-cosmoshub.blockapsis.com",
          provider: "chainapsis",
        },
        {
          address: "https://cosmos-rpc.quickapi.com:443",
          provider: "Chainlayer",
        },
        {
          address: "https://rpc-cosmoshub.whispernode.com:443",
          provider: "WhisperNode🤐",
        },
        {
          address: "https://cosmoshub-rpc.lavenderfive.com:443",
          provider: "Lavender.Five Nodes 🐝",
        },
        {
          address: "https://rpc.cosmoshub.strange.love",
          provider: "strangelove-ventures",
        },
        {
          address: "https://rpc-cosmoshub.ecostake.com",
          provider: "ecostake",
        },
        {
          address: "https://rpc-cosmoshub.pupmos.network",
          provider: "PUPMØS",
        },
        {
          address: "https://rpc-cached-cosmoshub.cosmos-spaces.cloud",
          provider: "Cosmos Spaces",
        },
        {
          address: "https://cosmos-rpc.polkachu.com",
          provider: "Polkachu",
        },
        {
          address: "https://cosmos-rpc.staketab.org:443",
          provider: "Staketab",
        },
        {
          address: "https://rpc-cosmoshub-ia.cosmosia.notional.ventures/",
          provider: "Notional",
        },
        {
          address: "https://rpc.cosmos.interbloc.org",
          provider: "Interbloc",
        },
        {
          address: "https://rpc-cosmoshub.architectnodes.com",
          provider: "Architect Nodes",
        },
        {
          address: "https://rpc.cosmos.dragonstake.io",
          provider: "DragonStake",
        },
        {
          address: "https://cosmoshub.rpc.stakin-nodes.com",
          provider: "Stakin",
        },
        {
          address: "https://cosmos-rpc.icycro.org",
          provider: "IcyCRO 🧊",
        },
        {
          address: "https://rpc.cosmos.bh.rocks",
          provider: "BlockHunters 🎯",
        },
        {
          address: "https://cosmos-rpc.rockrpc.net",
          provider: "RockawayX Infra",
        },
        {
          address: "http://rpc-cosmoshub.freshstaking.com:26657",
          provider: "FreshSTAKING",
        },
        {
          address: "https://cosmoshub.rpc.interchain.ivaldilabs.xyz",
          provider: "ivaldilabs",
        },
        {
          address: "https://cosmos-rpc.easy2stake.com/",
          provider: "Easy 2 Stake",
        },
        {
          address: "https://rpc.cosmos.nodestake.top",
          provider: "NodeStake",
        },
        {
          address: "https://cosmos.rpc.silknodes.io",
          provider: "Silk Nodes",
        },
        {
          address: "https://cosmos-rpc.publicnode.com",
          provider: "Allnodes.com ⚡️ Nodes & Staking",
        },
        {
          address: "https://cosmoshub.rpc.kjnodes.com",
          provider: "kjnodes",
        },
        {
          address: "https://rpc-cosmoshub.goldenratiostaking.net",
          provider: "Golden Ratio Staking",
        },
        {
          address: "https://rpc-cosmos-hub-01.stakeflow.io",
          provider: "Stakeflow",
        },
        {
          address: "https://cosmos-rpc.w3coins.io",
          provider: "w3coins",
        },
        {
          address: "https://rpc-cosmoshub.mms.team",
          provider: "MMS",
        },
      ],
      rest: [
        {
          address: "https://lcd-cosmoshub.blockapsis.com",
          provider: "chainapsis",
        },
        {
          address: "https://cosmos-lcd.quickapi.com:443",
          provider: "Chainlayer",
        },
        {
          address: "https://rest-cosmoshub.goldenratiostaking.net",
          provider: "Golden Ratio Staking",
        },
        {
          address: "https://cosmoshub-api.lavenderfive.com:443",
          provider: "Lavender.Five Nodes 🐝",
        },
        {
          address: "https://api-cosmoshub.pupmos.network",
          provider: "PUPMØS",
        },
        {
          address: "https://api-cosmoshub.cosmos-spaces.cloud",
          provider: "Cosmos Spaces",
        },
        {
          address: "https://api-cosmoshub-ia.cosmosia.notional.ventures/",
          provider: "Notional",
        },
        {
          address: "https://cosmos-rest.staketab.org",
          provider: "Staketab",
        },
        {
          address: "https://api.cosmos.interbloc.org",
          provider: "Interbloc",
        },
        {
          address: "https://lcd.cosmos.dragonstake.io",
          provider: "DragonStake",
        },
        {
          address: "https://cosmoshub.rest.stakin-nodes.com",
          provider: "Stakin",
        },
        {
          address: "https://rest-cosmoshub.architectnodes.com",
          provider: "Architect Nodes",
        },
        {
          address: "https://rest-cosmoshub.ecostake.com",
          provider: "ecostake",
        },
        {
          address: "https://cosmoshub.rest.interchain.ivaldilabs.xyz",
          provider: "ivaldilabs",
        },
        {
          address: "https://lcd-cosmoshub.whispernode.com:443",
          provider: "WhisperNode🤐",
        },
        {
          address: "https://cosmos-lcd.easy2stake.com",
          provider: "Easy 2 Stake",
        },
        {
          address: "https://api.cosmos.nodestake.top",
          provider: "NodeStake",
        },
        {
          address: "https://cosmos.api.silknodes.io",
          provider: "Silk Nodes",
        },
        {
          address: "https://cosmos-rest.publicnode.com",
          provider: "Allnodes.com ⚡️ Nodes & Staking",
        },
        {
          address: "https://cosmoshub.api.kjnodes.com",
          provider: "kjnodes",
        },
        {
          address: "https://api-cosmos-hub-01.stakeflow.io",
          provider: "Stakeflow",
        },
        {
          address: "https://cosmos-api.w3coins.io",
          provider: "w3coins",
        },
        {
          address: "https://api-cosmoshub.mms.team",
          provider: "MMS",
        },
      ],
      grpc: [
        {
          address: "cosmoshub-grpc.lavenderfive.com:443",
          provider: "Lavender.Five Nodes 🐝",
        },
        {
          address: "grpc-cosmoshub-ia.cosmosia.notional.ventures:443",
          provider: "Notional",
        },
        {
          address: "cosmos-grpc.polkachu.com:14990",
          provider: "Polkachu",
        },
        {
          address: "grpc.cosmos.interbloc.org:443",
          provider: "Interbloc",
        },
        {
          address: "services.staketab.com:9030",
          provider: "Staketab",
        },
        {
          address: "grpc.cosmos.dragonstake.io:443",
          provider: "DragonStake",
        },
        {
          address: "cosmoshub.grpc.stakin-nodes.com:443",
          provider: "Stakin",
        },
        {
          address: "cosmoshub.grpc.interchain.ivaldilabs.xyz:443",
          provider: "ivaldilabs",
        },
        {
          address: "https://grpc.cosmos.nodestake.top",
          provider: "NodeStake",
        },
        {
          address: "https://cosmos-grpc.publicnode.com",
          provider: "Allnodes.com ⚡️ Nodes & Staking",
        },
        {
          address: "grpc-cosmoshub.cosmos-spaces.cloud:1290",
          provider: "Cosmos Spaces",
        },
        {
          address: "cosmoshub.grpc.kjnodes.com:11390",
          provider: "kjnodes",
        },
        {
          address: "grpc-cosmos-hub-01.stakeflow.io:9090",
          provider: "Stakeflow",
        },
        {
          address: "grpc-cosmoshub.whispernode.com:443",
          provider: "WhisperNode🤐",
        },
        {
          address: "cosmos-grpc.w3coins.io:14990",
          provider: "w3coins",
        },
        {
          address: "grpc-cosmoshub.mms.team:443",
          provider: "MMS",
        },
      ],
    },
    explorers: [
      {
        kind: "EZ Staking Tools",
        url: "https://ezstaking.tools/cosmoshub",
        tx_page: "https://ezstaking.tools/cosmoshub/txs/${txHash}",
        account_page:
          "https://ezstaking.tools/cosmoshub/account/${accountAddress}",
      },
      {
        kind: "mintscan",
        url: "https://www.mintscan.io/cosmos",
        tx_page: "https://www.mintscan.io/cosmos/txs/${txHash}",
        account_page:
          "https://www.mintscan.io/cosmos/account/${accountAddress}",
      },
      {
        kind: "ping.pub",
        url: "https://ping.pub/cosmos",
        tx_page: "https://ping.pub/cosmos/tx/${txHash}",
      },
      {
        kind: "bigdipper",
        url: "https://bigdipper.live/cosmos",
        tx_page: "https://bigdipper.live/cosmos/transactions/${txHash}",
        account_page:
          "https://bigdipper.live/cosmos/accounts/${accountAddress}",
      },
      {
        kind: "atomscan",
        url: "https://atomscan.com",
        tx_page: "https://atomscan.com/transactions/${txHash}",
        account_page: "https://atomscan.com/accounts/${accountAddress}",
      },
      {
        kind: "unichain",
        url: "https://unicha.in/cosmos",
        tx_page: "https://unicha.in/cosmos/transaction/${txHash}",
      },
      {
        kind: "TC Network",
        url: "https://explorer.tcnetwork.io/cosmoshub",
        tx_page:
          "https://explorer.tcnetwork.io/cosmoshub/transaction/${txHash}",
      },
      {
        kind: "Stakeflow",
        url: "https://stakeflow.io/cosmos",
        account_page: "https://stakeflow.io/cosmos/accounts/${accountAddress}",
      },
    ],
  },
  {
    $schema: "../chain.schema.json",
    chain_name: "aura",
    status: "live",
    network_type: "mainnet",
    website: "https://aura.network/",
    pretty_name: "Aura Network",
    chain_id: "xstaxy-1",
    bech32_prefix: "aura",
    daemon_name: "aurad",
    node_home: "$HOME/.aura",
    slip44: 118,
    fees: {
      fee_tokens: [
        {
          denom: "uaura",
        },
      ],
    },
    staking: {
      staking_tokens: [
        {
          denom: "uaura",
        },
      ],
    },
    codebase: {
      git_repo: "https://github.com/aura-nw/aura",
      recommended_version: "aura_v0.4.5",
      compatible_versions: ["aura_v0.4.5"],
      genesis: {
        genesis_url:
          "https://raw.githubusercontent.com/aura-nw/mainnet-artifacts/main/xstaxy-1/genesis.json",
      },
      versions: [
        {
          name: "aura_v0.4.4",
          recommended_version: "aura_v0.4.4",
          compatible_versions: ["aura_v0.4.4"],
          next_version_name: "v0.4.5",
        },
        {
          name: "v0.4.5",
          proposal: 4,
          height: 1292226,
          recommended_version: "aura_v0.4.5",
          compatible_versions: ["aura_v0.4.5"],
          next_version_name: "",
        },
      ],
    },
    logo_URIs: {
      png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/aura/images/Aura-logo-2.2.png",
      svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/aura/images/Aura-logo-2.2.svg",
    },
    peers: {
      seeds: [
        {
          id: "22a0ca5f64187bb477be1d82166b1e9e184afe50",
          address: "18.143.52.13:26656",
        },
        {
          id: "ebc272824924ea1a27ea3183dd0b9ba713494f83",
          address: "auranetwork-mainnet-seed.autostake.com:26966",
          provider: "AutoStake 🛡️ Slash Protected",
        },
        {
          id: "0b8bd8c1b956b441f036e71df3a4d96e85f843b8",
          address: "13.250.159.219:26656",
        },
        {
          id: "400f3d9e30b69e78a7fb891f60d76fa3c73f0ecc",
          address: "aura.rpc.kjnodes.com:11759",
          provider: "kjnodes",
        },
        {
          id: "dc92560346a63ac23e117a8b16207c6adbb57f5e",
          address: "seeds.whispernode.com:21756",
          provider: "WhisperNode🤐",
        },
        {
          id: "20e1000e88125698264454a884812746c2eb4807",
          address: "seeds.lavenderfive.com:21756",
          provider: "Lavender.Five Nodes 🐝",
        },
        {
          id: "d05e3f406ed2275ec86957c5983a27768350ac47",
          address: "seed-node.mms.team:26656",
          provider: "MMS",
        },
      ],
      persistent_peers: [
        {
          id: "ebc272824924ea1a27ea3183dd0b9ba713494f83",
          address: "auranetwork-mainnet-peer.autostake.com:26966",
          provider: "AutoStake 🛡️ Slash Protected",
        },
        {
          id: "ced3a13f4f7200ce1a2392a5738c88532f794359",
          address: "mainnet-aura.konsortech.xyz:25656",
          provider: "KonsorTech",
        },
        {
          id: "57406c041d38af3bac9acdcb2b4bdc90dc7a8852",
          address: "aura.peers.stavr.tech:21056",
          provider: "🔥STAVR🔥",
        },
        {
          id: "9ee34b0829e9d85d88784aa17857fa1719760da2",
          address: "aura.ramuchi.tech:30000",
          provider: "ramuchi.tech",
        },
        {
          id: "b6a0d0d030f35ffffcfe92e72ea13933c1adbe62",
          address: "116.202.174.253:21656",
          provider: "Staketab",
        },
        {
          id: "07317346ab58eb4de14fe8c7705863002186d340",
          address: "142.132.201.53:36656",
          provider: "Stake-Take",
        },
        {
          id: "da9f07269cac08619190dbce8b0978556315b359",
          address: "p2p.aura.safeblock.space:26656",
          provider: "Safe Block",
        },
        {
          id: "bdd32536c902de9b240a36f0b23641233a080351",
          address: "peer-aura.mms.team:27656",
          provider: "MMS",
        },
      ],
    },
    apis: {
      rpc: [
        {
          address: "https://rpc.aura.network/",
          provider: "Aura Network Foundation",
        },
        {
          address: "https://auranetwork-mainnet-rpc.autostake.com:443",
          provider: "AutoStake 🛡️ Slash Protected",
        },
        {
          address: "https://m-aura.rpc.utsa.tech",
          provider: "𝐥𝐞𝐬𝐧𝐢𝐤 | 𝐔𝐓𝐒𝐀",
        },
        {
          address: "https://rpc.aura.nodestake.top",
          provider: "NodeStake",
        },
        {
          address: "http://aura.rpc.m.stavr.tech:11047",
          provider: "🔥STAVR🔥",
        },
        {
          address: "https://rpc-aura.whispernode.com:443",
          provider: "WhisperNode🤐",
        },
        {
          address: "https://aura-rpc.ramuchi.tech",
          provider: "ramuchi.tech",
        },
        {
          address: "https://aura.rpc.kjnodes.com",
          provider: "kjnodes",
        },
        {
          address: "https://mainnet-aura-rpc.konsortech.xyz",
          provider: "KonsorTech",
        },
        {
          address: "https://aura-rpc.tienthuattoan.ventures",
          provider: "TienThuatToan",
        },
        {
          address: "https://aura-rpc.lavenderfive.com",
          provider: "Lavender.Five Nodes 🐝",
        },
        {
          address: "https://aura-rpc.staketab.org:443",
          provider: "Staketab",
        },
        {
          address: "https://rpc.aura.safeblock.space",
          provider: "Safe Block",
        },
        {
          address: "https://rpc.aura.stake-take.com",
          provider: "Stake-Take",
        },
        {
          address: "https://rpc.aura.silentvalidator.com",
          provider: "silent",
        },
        {
          address: "https://aura-rpc.sergo.dev",
          provider: "SerGo",
        },
        {
          address: "https://rpc-aura.mms.team",
          provider: "MMS",
        },
      ],
      rest: [
        {
          address: "https://lcd.aura.network/",
          provider: "Aura Network Foundation",
        },
        {
          address: "https://auranetwork-mainnet-lcd.autostake.com:443",
          provider: "AutoStake 🛡️ Slash Protected",
        },
        {
          address: "https://m-aura.api.utsa.tech",
          provider: "𝐥𝐞𝐬𝐧𝐢𝐤 | 𝐔𝐓𝐒𝐀",
        },
        {
          address: "https://aura.api.m.stavr.tech",
          provider: "🔥STAVR🔥",
        },
        {
          address: "https://api.aura.nodestake.top",
          provider: "NodeStake",
        },
        {
          address: "https://lcd-aura.whispernode.com:443",
          provider: "WhisperNode🤐",
        },
        {
          address: "https://aura-api.ramuchi.tech",
          provider: "ramuchi.tech",
        },
        {
          address: "https://aura.api.kjnodes.com",
          provider: "kjnodes",
        },
        {
          address: "https://mainnet-aura-api.konsortech.xyz",
          provider: "KonsorTech",
        },
        {
          address: "https://aura-api.tienthuattoan.ventures",
          provider: "TienThuatToan",
        },
        {
          address: "https://aura-api.lavenderfive.com",
          provider: "Lavender.Five Nodes 🐝",
        },
        {
          address: "https://aura-rest.staketab.org",
          provider: "Staketab",
        },
        {
          address: "https://api.aura.safeblock.space",
          provider: "Safe Block",
        },
        {
          address: "https://api.aura.stake-take.com",
          provider: "Stake-Take",
        },
        {
          address: "https://api.aura.silentvalidator.com",
          provider: "silent",
        },
        {
          address: "https://aura-api.sergo.dev",
          provider: "SerGo",
        },
        {
          address: "https://api-aura.mms.team",
          provider: "MMS",
        },
      ],
      grpc: [
        {
          address: "https://grpc.aura.network",
          provider: "Aura Network Foundation",
        },
        {
          address: "auranetwork-mainnet-grpc.autostake.com:443",
          provider: "AutoStake 🛡️ Slash Protected",
        },
        {
          address: "https://grpc.aura.nodestake.top",
          provider: "NodeStake",
        },
        {
          address: "https://aura-grpc.ramuchi.tech:15000",
          provider: "ramuchi.tech",
        },
        {
          address: "http://aura.grpc.m.stavr.tech:9901",
          provider: "🔥STAVR🔥",
        },
        {
          address: "aura.grpc.kjnodes.com:11790",
          provider: "kjnodes",
        },
        {
          address: "aura-grpc.tienthuattoan.ventures:9090",
          provider: "TienThuatToan",
        },
        {
          address: "aura-grpc.lavenderfive.com:443",
          provider: "Lavender.Five Nodes 🐝",
        },
        {
          address: "services.staketab.com:9021",
          provider: "Staketab",
        },
        {
          address: "grpc.aura.silentvalidator.com:443",
          provider: "silent",
        },
        {
          address: "grpc-aura.mms.team:443",
          provider: "MMS",
        },
      ],
    },
    explorers: [
      {
        kind: "aurascan",
        url: "https://aurascan.io",
        tx_page: "https://aurascan.io/transaction/${txHash}",
        account_page: "https://aurascan.io/account/${accountAddress}",
      },
      {
        kind: "𝐥𝐞𝐬𝐧𝐢𝐤 | 𝐔𝐓𝐒𝐀 Explorer",
        url: "https://exp.utsa.tech/aura",
        tx_page: "https://exp.utsa.tech/aura/tx/${txHash}",
        account_page: "https://exp.utsa.tech/aura/account/${accountAddress}",
      },
      {
        kind: "🔥STAVR🔥 Explorer",
        url: "https://explorer.stavr.tech/aura-mainnet",
        tx_page: "https://explorer.stavr.tech/aura-mainnet/tx/${txHash}",
        account_page:
          "https://explorer.stavr.tech/aura-mainnet/account/${accountAddress}",
      },
      {
        kind: "NodeStake Explorer",
        url: "https://explorer.nodestake.top/aura",
        tx_page: "https://explorer.nodestake.top/aura/tx/${txHash}",
        account_page:
          "https://explorer.nodestake.top/aura/account/${accountAddress}",
      },
      {
        kind: "TC Network",
        url: "https://explorer.tcnetwork.io/aura",
        tx_page: "https://explorer.tcnetwork.io/aura/transaction/${txHash}",
        account_page:
          "https://explorer.tcnetwork.io/aura/account/${accountAddress}",
      },
      {
        kind: "Stake-Take",
        url: "https://explorer.stake-take.com/aura",
        tx_page: "https://explorer.stake-take.com/aura/tx/${txHash}",
        account_page:
          "https://explorer.stake-take.com/aura/account/${accountAddress}",
      },
    ],
  },
];
