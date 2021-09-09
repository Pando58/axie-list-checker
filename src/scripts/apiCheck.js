import { ref } from 'vue'
import axios from 'axios'

const getData = async (fn) => {
  axios.post('https://graphql-gateway.axieinfinity.com/graphql', {
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
        auction {
          ...AxieAuction
          __typename
        }
        __typename
      }
      
      fragment AxieAuction on Auction {
        currentPrice
        currentPriceUSD
        __typename
      }
    `
  })
  .then(res => fn(res.data.data.axies.results))
  .catch(err => console.error(err));
};

export { getData };