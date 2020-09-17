import { Router } from 'express';

import pointsRouter from './points.routes';


const routes = Router();

routes.use('/pontos-coleta', pointsRouter);

export default routes;