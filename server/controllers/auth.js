import express from 'express';
import _ from 'lodash';
import logger from '../../services/serverLogger';
import User from '../models/users';
import { authRequired } from '../../services/authToken';

const router = new express.Router();

router.post('/signin', (req, res) => {
  const { userID } = req.body;
  User.upsertByEmployeeID(userID, { ...req.body })
    .then(() => {
      res.send({ succes: 'Successfully logged in' });
    })
    .catch((error) => {
      res.send({ error: error.message });
      logger.error(error.message);
    });
});

router.get('/user', authRequired, (req, res) => {
  User.getById(req.user.id)
    .then((userData) => _.omit(userData, ['_id', '__v']))
    .then((userData) => res.send(userData));
});

export default router;
