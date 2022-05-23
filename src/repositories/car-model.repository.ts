import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {CarModel, CarModelRelations} from '../models';

export class CarModelRepository extends DefaultCrudRepository<
  CarModel,
  typeof CarModel.prototype.id_model,
  CarModelRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(CarModel, dataSource);
  }
}
