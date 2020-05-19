import express from 'express';
import Appointment from '../models/appointment';

const router = new express.Router();

router.post('/', (req, res) => {
  const { id: userId } = req.query;
  const dataToSave = new Appointment({ userId, ...req.body });
  dataToSave.save((err) => {
    if (err) return res.status(500).send(err);
    return res.status(200).send(dataToSave);
  });
});

export default router;
