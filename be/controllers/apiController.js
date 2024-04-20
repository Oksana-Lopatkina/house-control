const mongoClient = require('../db');
const ObjectId = require('mongodb').ObjectId;

const DB_NAME = 'pzdb';

exports.getAccounts = async (req, res) => {
  // const collectionName = req._parsedUrl.path.substring(1);
  const collectionName = 'rooms';
  const accounts = [];
  const accountsCursor = mongoClient.db(DB_NAME).collection('rooms').aggregate( [
    {
      $lookup:
        {
          from: "owners",
          localField: "cadastralNumber",
          foreignField: "cadastralNumber",
          as: "owners"
        }
    }
  ] );
  // const accounts = await collection.find({}).toArray();
  for await (const acc of accountsCursor) {
    console.log('[getAccounts] acc: ', acc);
    accounts.push(acc);
  }
  res.send(accounts);
}

exports.getVoting = async (req, res) => {
  const collection = mongoClient.db(DB_NAME).collection(req.params.voteId);
  const voting = await collection.find({}).toArray();
  console.log('[getAccounts] voting: ', voting);
  res.send(voting);
}

exports.updateVotedStatusVoting = async (req, res) => {
  console.log('[updateVotedStatusVoting] req.body._id: ', req.body._id);
  if(!req.body) return res.status(400).send('No body');
  const collection = mongoClient.db(DB_NAME).collection(req.body.voteId);
  const vote = await collection.findOneAndUpdate({"_id": new ObjectId(req.body._id)}, {$set: {hasVoted: req.body.hasVoted}});
  console.log('[updateVotedStatusVoting] vote: ', vote);
  res.send(req.body);
}

exports.updateVoting = async (req, res) => {
  console.log('[updateVoting] req.body: ', req.body);
  if(!req.body) return res.status(400).send('No body');
  const collection = mongoClient.db(DB_NAME).collection(req.body.votingId);
  const vote = await collection.findOneAndUpdate({"_id": new ObjectId(req.body._id)}, {$set: req.body.updated});
  console.log('[updateVoting] vote: ', vote);
  res.send(req.body);
}
