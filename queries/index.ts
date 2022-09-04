import { createClient } from 'urql';

const API_URL = 'https://api.thegraph.com/subgraphs/name/kowalewskipawel/non-fungible-prints';

export const client = createClient({
  url: API_URL,
});

export const getNFCStatusChanged = `query NFCStatusChanged($nftAddress: String! ) {
  nfcstatusChangeds(where: { nftInfo_nftAddress: $nftAddress }) {
      nftInfo_nftAddress
      nftInfo_isActive
      nfcTag
      nftInfo_nftId
      nftInfo_nftUri
      nftInfo_nftName
      nftInfo_lastUpdated
      }
  }`;

export const isNFCDestroyed = `query NFCDestroyed($localTag: String! ) {
    nfcdestroyeds(where: { nfcTag: $localTag }) {
        nfcTag
        }
    }`;
