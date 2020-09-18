import ICreatePointDTO from '@modules/points/dtos/ICreatePointDTO';
import IPointsRepository from '@modules/points/repositories/IPointsRepository';
import { getRepository, Repository } from 'typeorm';
import Point from '../entities/Points';

class PointsRepository implements IPointsRepository {
  private ormRepository: Repository<Point>;

  constructor() {
    this.ormRepository = getRepository(Point);
  }

  public async create({ name, address }: ICreatePointDTO): Promise<Point> {
    const point = this.ormRepository.create({ name, address });

    await this.ormRepository.save(point);

    return point;
  }
}

export default PointsRepository;
