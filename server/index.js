const express = require('express');
const verifyProof = require('../utils/verifyProof');

const port = 1225;

const app = express();
app.use(express.json());

// TODO: hardcode a merkle root here representing the whole nice list
// paste the hex string in here, without the 0x prefix
const MERKLE_ROOT = 'ddd59a2ffccddd60ff47993312821cd57cf30f7f14fb82937ebe2c4dc78375aa';

app.post('/gift', (req, res) => {
  
  // get params
  const { proof, leaf } = req.body;

  // TODO: prove that a name is in the list
  //using verifyProof for checking 
  const isProofVerified = verifyProof(proof, leaf, MERKLE_ROOT);
  //console.log("proof:", proof);
  console.log("leaf:", leaf);
  console.log("MERKLE_ROOT:", MERKLE_ROOT);
  console.log("isProofVerified (isInTheList):", isProofVerified);
  const isInTheList = isProofVerified;
  
  if (isInTheList) {
    res.send("You got a toy robot!");
  }
  else {
    res.send("You are not on the list :(");
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
