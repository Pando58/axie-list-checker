import axios from 'axios'

const getData = async (sort, fn) => {
  console.log(sort);
  axios.post(urls[sort], requests[sort])
  .then(res => fn(res.data.data.axies.results))
  .catch(err => console.error(err));
};


const urls = {
  latest: 'https://graphql-gateway.axieinfinity.com/graphql',
  lowestPrice: 'https://axieinfinity.com/graphql-server-v2/graphql'
}

const requests = {
  latest: {
    operationName: "GetAxieLatest",
    variables: {
      from: 0,
      size: 10,
      sort: "Latest",
      auctionType: "Sale"
    },
    query: `
      query GetAxieLatest($auctionType: AuctionType, $criteria: AxieSearchCriteria, $from: Int, $sort: SortBy, $size: Int, $owner: String) {
        axies(auctionType: $auctionType, criteria: $criteria, from: $from, sort: $sort, size: $size, owner: $owner) {
          total
          results {
            ...AxieRowData
            __typename
          }
          __typename
        }
      }
      
      fragment AxieRowData on Axie {
        id
        image
        class
        name
        genes
        owner
        class
        stage
        title
        breedCount
        level
        parts {
          ...AxiePart
          __typename
        }
        stats {
          ...AxieStats
          __typename
        }
        auction {
          ...AxieAuction
          __typename
        }
        __typename
      }
      
      fragment AxiePart on AxiePart {
        id
        name
        class
        type
        specialGenes
        stage
        abilities {
          ...AxieCardAbility
          __typename
        }
        __typename
      }
      
      fragment AxieCardAbility on AxieCardAbility {
        id
        name
        attack
        defense
        energy
        description
        backgroundUrl
        effectIconUrl
        __typename
      }
      
      fragment AxieStats on AxieStats {
        hp
        speed
        skill
        morale
        __typename
      }
      
      fragment AxieAuction on Auction {
        startingPrice
        endingPrice
        startingTimestamp
        endingTimestamp
        duration
        timeLeft
        currentPrice
        currentPriceUSD
        suggestedPrice
        seller
        listingIndex
        state
        __typename
      }
    `
  },
  lowestPrice: {
    operationName: "GetAxieBriefList",
    query: `
      query GetAxieBriefList($auctionType: AuctionType, $criteria: AxieSearchCriteria, $from: Int, $sort: SortBy, $size: Int, $owner: String) {
        axies(auctionType: $auctionType, criteria: $criteria, from: $from, sort: $sort, size: $size, owner: $owner) {
          total
          results {
            ...AxieBrief
            __typename
          }
          __typename
        }
      }
      
      fragment AxieBrief on Axie {
        id
        name
        stage
        class
        breedCount
        image
        title
        genes
        battleInfo {
          banned
          __typename
        }
        auction {
          currentPrice
          currentPriceUSD
          __typename
        }
        stats {
          ...AxieStats
          __typename
        }
        parts {
          id
          name
          class
          type
          specialGenes
          __typename
        }
        __typename
      }
      
      fragment AxieStats on AxieStats {
        hp
        speed
        skill
        morale
        __typename
      }
    `,
    variables: {
      auctionType: "Sale",
      criteria: {
        classes: [],
        parts: [],
        hp: null,
        speed: null,
        skill: null,
        morale: null,
        breedCount: null,
        pureness: [],
        numMystic: [],
        title: null,
        region: null,
        stages: [
          3,
          4
        ]
      },
      from: 0,
      size: 12,
      sort: "PriceAsc",
      owner: null
    }
  },
}


export { getData };