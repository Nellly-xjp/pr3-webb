import { BaseEntity, IRepository, UpdateDto } from '../types';

export class InMemoryRepository<T extends BaseEntity> implements IRepository<T> {
  protected items: T[] = [];

  create(item: T): T {
    this.items.push(item);
    return item;
  }

  findById(id: string): T | null {
    const item = this.items.find((i) => i.id === id);
    return item ?? null;
  }

  findAll(): T[] {
    return [...this.items];
  }

  update(id: string, patch: UpdateDto<T>): T | null {
    const index = this.items.findIndex((i) => i.id === id);
    if (index === -1) {
      return null;
    }

    const existingItem = this.items[index];

    const updatedItem: T = {
      ...existingItem,
      ...patch,
      id: existingItem.id,
      updatedAt: new Date(),
    };

    this.items[index] = updatedItem;
    return updatedItem;
  }

  deleteById(id: string): boolean {
    const index = this.items.findIndex((i) => i.id === id);
    if (index === -1) {
      return false;
    }
    this.items.splice(index, 1);
    return true;
  }
}