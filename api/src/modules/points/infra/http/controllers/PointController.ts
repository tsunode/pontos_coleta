import { Request, Response } from 'express';
import CreatePointService from '@modules/points/services/CreatePointService';
import { container } from 'tsyringe';
import ListPointsService from '@modules/points/services/ListPointsService';
import UpdatePointService from '@modules/points/services/UpdatePointService';

class PointController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, address } = request.body;

    const createPoint = container.resolve(CreatePointService);

    const point = await createPoint.execute({ name, address });

    return response.json(point);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const { name } = request.query;

    const ListPoint = container.resolve(ListPointsService);

    const points = await ListPoint.execute(name as string);

    return response.json(points);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, address } = request.body;

    const UpdatePoint = container.resolve(UpdatePointService);

    const points = await UpdatePoint.execute({ id, name, address });

    return response.json(points);
  }
}

export default PointController;
