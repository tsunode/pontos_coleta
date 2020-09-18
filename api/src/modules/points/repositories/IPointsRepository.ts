import ICreatePointDTO from '../dtos/ICreatePointDTO';
import Point from '../infra/typeorm/entities/Points';

export default interface IPointsRepository {
  create(data: ICreatePointDTO): Promise<Point>;
  findAll(name: string): Promise<Point[] | undefined>;
  findByName(name: string): Promise<Point | undefined>;
  // findByContainsName(name: string): Promise<Point[] | undefined>;
}
