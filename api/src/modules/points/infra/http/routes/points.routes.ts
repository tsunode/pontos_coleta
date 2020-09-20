import { Router } from 'express';

import PointController from '../controllers/PointController';

const pointsRouter = Router();
const pointController = new PointController();

pointsRouter.post('/', pointController.create);
pointsRouter.get('/', pointController.index);
pointsRouter.get('/:id', pointController.show);
pointsRouter.put('/:id', pointController.update);

export default pointsRouter;
