import {Entity, model, property} from '@loopback/repository';

@model()
export class Notebook extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id_notebook?: number;

  @property({
    type: 'number',
    required: true,
  })
  id_car: number;

  @property({
    type: 'number',
    required: true,
  })
  id_operator: number;

  @property({
    type: 'number',
    required: true,
  })
  distance: number;

  @property({
    type: 'date',
    required: true,
  })
  date: string;

  @property({
    type: 'number',
    required: true,
  })
  stopDistance: number;

  @property({
    type: 'number',
    required: true,
  })
  breakingLength: number;


  constructor(data?: Partial<Notebook>) {
    super(data);
  }
}

export interface NotebookRelations {
  // describe navigational properties here
}

export type NotebookWithRelations = Notebook & NotebookRelations;
