import { Router } from 'express';

import pointsRouter from '@modules/points/infra/http/routes/points.routes';

const routes = Router();

routes.use('/pontos-coleta', pointsRouter);

export default routes;
