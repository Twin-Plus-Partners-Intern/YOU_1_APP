import { Router } from 'express';
import { breakdownGoal } from '../controllers/ai.controller.js';

export const aiRouter = Router();

aiRouter.post('/breakdown', breakdownGoal);
