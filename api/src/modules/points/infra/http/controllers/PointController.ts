import { Request, Response } from 'express';
import CreatePointService from '@modules/points/services/CreatePointService';
import { container } from 'tsyringe';
import ListPointsService from '@modules/points/services/ListPointsService';
import UpdatePointService from '@modules/points/services/UpdatePointService';
import ShowPointService from '@modules/points/services/ShowPointService';

class PointController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, address } = request.body;

    const createPoint = container.resolve(CreatePointService);

    const point = await createPoint.execute({ name, address });

    return response.json(point);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const { name } = request.query;

    const listPoint = container.resolve(ListPointsService);

    const points = await listPoint.execute(name as string);

    return response.json(points);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showPoint = container.resolve(ShowPointService);

    const point = await showPoint.execute(id);

    return response.json(point);
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
