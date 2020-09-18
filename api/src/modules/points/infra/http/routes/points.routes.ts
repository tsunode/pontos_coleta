import { Router } from 'express';

import PointController from '../controllers/PointController';

const pointsRouter = Router();
const pointController = new PointController();

pointsRouter.post('/', pointController.create);

export default pointsRouter;
