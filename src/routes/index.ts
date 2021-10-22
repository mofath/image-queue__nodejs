import express from 'express';
import * as logController from '../controllers/logController';

const router = express.Router();

router.get('/logs', logController.list);

export default router;
