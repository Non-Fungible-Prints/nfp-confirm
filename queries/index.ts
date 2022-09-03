import { createClient } from 'urql';

const API_URL = 'https://api.thegraph.com/subgraphs/name/kowalewskipawel/non-fungible-prints';

export const client = createClient({
  url: API_URL,
});

export const getNFCPrinteds = `query nfcprinteds ($nftAddress: String! ) {
    nfcprinteds(where: { nftInfo_nftAddres: $nftAddress }) {
        nftInfo_nftAddres
        nftInfo_isActive
      }
  }`;
