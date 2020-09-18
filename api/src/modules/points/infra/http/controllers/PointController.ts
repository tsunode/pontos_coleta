import { Request, Response } from 'express';
import CreatePointService from '@modules/points/services/CreatePointService';
import { container } from 'tsyringe';

class PointController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, address } = request.body;

    const createPoint = container.resolve(CreatePointService);

    const point = await createPoint.execute({ name, address });

    return response.json(point);
  }
}

export default PointController;
