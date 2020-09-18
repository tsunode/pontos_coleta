import IPointsRepository from '@modules/points/repositories/IPointsRepository';
import AppError from '@shared/errors/AppError';
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
    const pointFound = await this.pointsRepository.findByName(name);

    if (pointFound) {
      throw new AppError(
        'This name already exists at another collection point',
      );
    }

    const point = await this.pointsRepository.create({ name, address });

    return point;
  }
}

export default CreatePointService;
