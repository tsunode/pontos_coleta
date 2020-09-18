import PointsRepository from '@modules/points/infra/typeorm/repositories/PointsRepository';
import IPointsRepository from '@modules/points/repositories/IPointsRepository';
import { container } from 'tsyringe';

container.registerSingleton<IPointsRepository>(
  'PointsRepository',
  PointsRepository,
);
