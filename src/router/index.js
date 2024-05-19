import express from 'express';

import users from './users.js';
import Lists from './Lists.js'


const router = express.Router();

export default () => {
  users(router);
  Lists(router);
  return router;
};