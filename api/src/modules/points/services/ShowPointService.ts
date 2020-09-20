import IPointsRepository from '@modules/points/repositories/IPointsRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Point from '../infra/typeorm/entities/Points';

@injectable()
class ShowPointService {
  constructor(
    @inject('PointsRepository')
    private pointsRepository: IPointsRepository,
  ) {}

  public async execute(id: string): Promise<Point> {
    const point = await this.pointsRepository.findById(id);

    if (!point) {
      throw new AppError('Point not found.');
    }

    return point;
  }
}

export default ShowPointService;
