import express from 'express';
import _ from 'lodash';
import { mapArobsUserData } from '../../helpers/arobsApi';
import arobsApi from '../../services/arobsApi';
import logger from '../../services/serverLogger';
import User from '../models/users';
import { genAuthToken, authRequired } from '../../services/authToken';
import { signInSchema, validate } from '../../services/validation';

const router = new express.Router();

router.post('/signin', validate(signInSchema), (req, res) => {
  const { username, password } = req.body;
  let arobsToken = '';
  let userData = {};
  arobsApi
    .post(`/user`, { username, password })
    .then(response => {
      if (response.data) {
        arobsToken = `Bearer ${response.data.token}`;
      } else {
        throw new Error('Wrong username or password');
      }
    })
    .then(() => {
      return arobsApi.get(`/userprofile`, {
        headers: { Authorization: arobsToken }
      });
    })
    .then(response => {
      userData = mapArobsUserData(response.data);

      const { employeeId } = userData;
      return User.upsertByEmployeeID(employeeId, { ...userData });
    })
    .then(upsertData => {
      const dataInToken = _.pick(upsertData, [
        'employeeId',
        'firstName',
        'lastName',
        'emailAddress'
      ]);
      const id = _.get(upsertData, ['_id']);
      return genAuthToken({ id, ...dataInToken });
    })
    .then(authToken => res.send({ authToken, ...userData }))
    .catch(error => {
      res.send({ error: error.message });
      logger.error(error.message);
    });
});

router.get('/user', authRequired, (req, res) => {
  User.getById(req.user.id)
    .then(userData => _.omit(userData, ['_id', '__v']))
    .then(userData => res.send(userData));
});

export default router;
