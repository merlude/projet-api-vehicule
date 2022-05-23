import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {CarModel} from '../models';
import {CarModelRepository} from '../repositories';

export class CarmodelController {
  constructor(
    @repository(CarModelRepository)
    public carModelRepository : CarModelRepository,
  ) {}

  @post('/car-models')
  @response(200, {
    description: 'CarModel model instance',
    content: {'application/json': {schema: getModelSchemaRef(CarModel)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CarModel, {
            title: 'NewCarModel',
            exclude: ['id_model'],
          }),
        },
      },
    })
    carModel: Omit<CarModel, 'id_model'>,
  ): Promise<CarModel> {
    return this.carModelRepository.create(carModel);
  }

  @get('/car-models/count')
  @response(200, {
    description: 'CarModel model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(CarModel) where?: Where<CarModel>,
  ): Promise<Count> {
    return this.carModelRepository.count(where);
  }

  @get('/car-models')
  @response(200, {
    description: 'Array of CarModel model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(CarModel, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(CarModel) filter?: Filter<CarModel>,
  ): Promise<CarModel[]> {
    return this.carModelRepository.find(filter);
  }

  @patch('/car-models')
  @response(200, {
    description: 'CarModel PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CarModel, {partial: true}),
        },
      },
    })
    carModel: CarModel,
    @param.where(CarModel) where?: Where<CarModel>,
  ): Promise<Count> {
    return this.carModelRepository.updateAll(carModel, where);
  }

  @get('/car-models/{id}')
  @response(200, {
    description: 'CarModel model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(CarModel, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(CarModel, {exclude: 'where'}) filter?: FilterExcludingWhere<CarModel>
  ): Promise<CarModel> {
    return this.carModelRepository.findById(id, filter);
  }

  @patch('/car-models/{id}')
  @response(204, {
    description: 'CarModel PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CarModel, {partial: true}),
        },
      },
    })
    carModel: CarModel,
  ): Promise<void> {
    await this.carModelRepository.updateById(id, carModel);
  }

  @put('/car-models/{id}')
  @response(204, {
    description: 'CarModel PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() carModel: CarModel,
  ): Promise<void> {
    await this.carModelRepository.replaceById(id, carModel);
  }

  @del('/car-models/{id}')
  @response(204, {
    description: 'CarModel DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.carModelRepository.deleteById(id);
  }
}
