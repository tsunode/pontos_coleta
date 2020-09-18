import IPointsRepository from '@modules/points/repositories/IPointsRepository';
import { inject, injectable } from 'tsyringe';
import Point from '../infra/typeorm/entities/Points';

@injectable()
class ListPointsService {
  constructor(
    @inject('PointsRepository')
    private pointsRepository: IPointsRepository,
  ) {}

  public async execute(name: string): Promise<Point[] | undefined> {
    const points = await this.pointsRepository.findAll(name);

    return points;
  }
}

export default ListPointsService;
