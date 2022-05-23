import {Entity, model, property} from '@loopback/repository';

@model()
export class CarModel extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id_model?: number;

  @property({
    type: 'string',
    required: true,
  })
  brand: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'number',
    required: true,
  })
  power: number;

  @property({
    type: 'number',
    required: true,
  })
  numberOfDoors: number;


  constructor(data?: Partial<CarModel>) {
    super(data);
  }
}

export interface CarModelRelations {
  // describe navigational properties here
}

export type CarModelWithRelations = CarModel & CarModelRelations;
