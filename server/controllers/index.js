import express from 'express';
import authRouter from './auth';

const router = new express.Router();

router.use('/auth', authRouter);

export default router;
