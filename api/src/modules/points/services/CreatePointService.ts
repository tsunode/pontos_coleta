import IPointsRepository from '@modules/points/repositories/IPointsRepository';
import { inject, injectable } from 'tsyringe';
import Point from '../infra/typeorm/entities/Points';

interface IRequest {
  name: string;
  address: {
    street: string;
    number: string;
    neighborhood: string;
    city: string;
    state: string;
    zipcode: string;
    latitude: string;
    longitude: string;
    complement: string;
  };
}

@injectable()
class CreatePointService {
  constructor(
    @inject('PointsRepository')
    private pointsRepository: IPointsRepository,
  ) {}

  public async execute({ name, address }: IRequest): Promise<Point> {
    const point = await this.pointsRepository.create({ name, address });

    return point;
  }
}

export default CreatePointService;
