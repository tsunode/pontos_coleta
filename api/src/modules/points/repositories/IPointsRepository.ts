import ICreatePointDTO from '../dtos/ICreatePointDTO';
import Point from '../infra/typeorm/entities/Points';

export default interface IPointsRepository {
  create(data: ICreatePointDTO): Promise<Point>;
  // findAll(): Promise<Point[]>;
  // findByName(name: string): Promise<Point[]>;
}
