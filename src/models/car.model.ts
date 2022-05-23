import {Entity, model, property} from '@loopback/repository';

@model()
export class Car extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id_car?: number;

  @property({
    type: 'number',
    required: true,
  })
  id_model: number;

  @property({
    type: 'number',
    required: true,
  })
  id_user: number;

  @property({
    type: 'string',
    required: true,
  })
  color: string;

  @property({
    type: 'string',
    required: true,
  })
  licencePlate: string;


  constructor(data?: Partial<Car>) {
    super(data);
  }
}

export interface CarRelations {
  // describe navigational properties here
}

export type CarWithRelations = Car & CarRelations;
