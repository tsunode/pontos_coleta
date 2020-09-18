import ICreatePointDTO from '@modules/points/dtos/ICreatePointDTO';
import IPointsRepository from '@modules/points/repositories/IPointsRepository';
import { getRepository, Like, Repository } from 'typeorm';
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

  public async findAll(name: string): Promise<Point[] | undefined> {
    let points: Point[];

    if (name) {
      points = await this.ormRepository.find({
        name: Like(`%${name}%`),
      });
    } else {
      points = await this.ormRepository.find();
    }

    return points;
  }

  public async findByName(name: string): Promise<Point | undefined> {
    const point = await this.ormRepository.findOne({ name });

    return point;
  }
}

export default PointsRepository;
