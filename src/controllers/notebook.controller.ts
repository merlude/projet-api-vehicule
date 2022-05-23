import {authenticate} from '@loopback/authentication';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, param, patch, post, put, requestBody,
  response
} from '@loopback/rest';
import {Notebook} from '../models';
import {NotebookRepository} from '../repositories';

@authenticate('jwt')
export class NotebookController {
  constructor(
    @repository(NotebookRepository)
    public notebookRepository: NotebookRepository,
  ) { }

  @post('/notebooks')
  @response(200, {
    description: 'Notebook model instance',
    content: {'application/json': {schema: getModelSchemaRef(Notebook)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Notebook, {
            title: 'NewNotebook',
            exclude: ['id_notebook'],
          }),
        },
      },
    })
    notebook: Omit<Notebook, 'id_notebook'>,
  ): Promise<Notebook> {
    return this.notebookRepository.create(notebook);
  }

  @get('/notebooks/count')
  @response(200, {
    description: 'Notebook model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Notebook) where?: Where<Notebook>,
  ): Promise<Count> {
    return this.notebookRepository.count(where);
  }

  @get('/notebooks')
  @response(200, {
    description: 'Array of Notebook model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Notebook, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Notebook) filter?: Filter<Notebook>,
  ): Promise<Notebook[]> {
    return this.notebookRepository.find(filter);
  }

  @patch('/notebooks')
  @response(200, {
    description: 'Notebook PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Notebook, {partial: true}),
        },
      },
    })
    notebook: Notebook,
    @param.where(Notebook) where?: Where<Notebook>,
  ): Promise<Count> {
    return this.notebookRepository.updateAll(notebook, where);
  }

  @get('/notebooks/{id}')
  @response(200, {
    description: 'Notebook model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Notebook, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Notebook, {exclude: 'where'}) filter?: FilterExcludingWhere<Notebook>
  ): Promise<Notebook> {
    return this.notebookRepository.findById(id, filter);
  }

  @patch('/notebooks/{id}')
  @response(204, {
    description: 'Notebook PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Notebook, {partial: true}),
        },
      },
    })
    notebook: Notebook,
  ): Promise<void> {
    await this.notebookRepository.updateById(id, notebook);
  }

  @put('/notebooks/{id}')
  @response(204, {
    description: 'Notebook PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() notebook: Notebook,
  ): Promise<void> {
    await this.notebookRepository.replaceById(id, notebook);
  }

  @del('/notebooks/{id}')
  @response(204, {
    description: 'Notebook DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.notebookRepository.deleteById(id);
  }
}
