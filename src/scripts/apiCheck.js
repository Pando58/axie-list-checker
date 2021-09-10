import { ref } from 'vue'
import axios from 'axios'

const getData = async (fn) => {
  axios.post('https://axieinfinity.com/graphql-server-v2/graphql', {
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
  })
  .then(res => fn(res.data.data.axies.results))
  .catch(err => console.error(err));
};

export { getData };