const apiController = require('../controllers/apiController');
const express = require('express');
// const jsonParser = express.json();
const apiRouter = express.Router();

apiRouter.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
})
// accounts
apiRouter.get('/accounts', apiController.getAccounts);
apiRouter.get('/voting/:voteId', apiController.getVoting);
// voting
apiRouter.put('/voting', apiController.updateVoting);
apiRouter.put('/voting/votestatus', apiController.updateVotedStatusVoting);

module.exports = apiRouter;
