import IPointsRepository from '@modules/points/repositories/IPointsRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Point from '../infra/typeorm/entities/Points';

interface IRequest {
  id: string;
  name: string;
  address: {
    id: string;
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
class UpdatePointService {
  constructor(
    @inject('PointsRepository')
    private pointsRepository: IPointsRepository,
  ) {}

  public async execute({ id, name, address }: IRequest): Promise<Point> {
    const point = await this.pointsRepository.findById(id);

    if (!point) {
      throw new AppError('Point not found.');
    }

    const pointFound = await this.pointsRepository.findByName(name);

    if (pointFound && point.id !== pointFound.id) {
      throw new AppError(
        'This name already exists at another collection point',
      );
    }

    const updatedPoint = await this.pointsRepository.save({
      id,
      name,
      address,
    });

    return updatedPoint;
  }
}

export default UpdatePointService;
