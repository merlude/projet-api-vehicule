import {Entity, model, property} from '@loopback/repository';

@model()
export class Operator extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id_operator?: number;

  @property({
    type: 'string',
    required: true,
  })
  username: string;

  @property({
    type: 'string',
    required: true,
  })
  password: string;


  constructor(data?: Partial<Operator>) {
    super(data);
  }
}

export interface OperatorRelations {
  // describe navigational properties here
}

export type OperatorWithRelations = Operator & OperatorRelations;
