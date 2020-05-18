import express from 'express';
import authRouter from './auth';
import appointmentRouter from './appointment';

const router = new express.Router();

router.use('/auth', authRouter);
router.use('/appointment', appointmentRouter);

export default router;
