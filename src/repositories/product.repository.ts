import { BaseEntity, UpdateDto } from '../types';
import { InMemoryRepository } from './in-memory.repository';
import { LogExecutionTime } from '../decorators';

export class ProductRepository<T extends BaseEntity> extends InMemoryRepository<T> {
  @LogExecutionTime()
  override create(item: T): T {
    return super.create(item);
  }

  @LogExecutionTime()
  override update(id: string, patch: UpdateDto<T>): T | null {
    return super.update(id, patch);
  }

  @LogExecutionTime()
  override findAll(): T[] {
    return super.findAll();
  }
}