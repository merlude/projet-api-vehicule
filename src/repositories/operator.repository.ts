import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Operator, OperatorRelations} from '../models';

export class OperatorRepository extends DefaultCrudRepository<
  Operator,
  typeof Operator.prototype.id_operator,
  OperatorRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Operator, dataSource);
  }
}
