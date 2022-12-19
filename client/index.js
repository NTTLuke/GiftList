const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');

const INDEX_NAME_PROOF = 10;
const LEAF = niceList[10];
const merkleTree = new MerkleTree(niceList);

const serverUrl = 'http://localhost:1225';

async function main() {
  // TODO: how do we prove to the server we're on the nice list? 
  //using the get proof for checking if the name is inside the 
  const root = merkleTree.getRoot();
  const proof = merkleTree.getProof(INDEX_NAME_PROOF);

  console.log("root", root);
  console.log("LEAF:", LEAF);
 // console.log("proof:", proof);
  console.log(
    `Proof generated for niceList[${INDEX_NAME_PROOF}]:`,
    niceList[INDEX_NAME_PROOF]
  );

  const body = {
    proof,
    leaf: LEAF,
  };

  const { data: response } = await axios.post(`${serverUrl}/gift`, body);

  console.log({ response });
}

main();