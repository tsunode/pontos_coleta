import IPointsRepository from "@modules/points/repositories/IPointsRepository";
import { Repository } from "typeorm";
import Point from "../entities/Points";

class PointsRepository implements IPointsRepository{
  private ormRepository: Repository<Point>;

}

export default PointsRepository;
