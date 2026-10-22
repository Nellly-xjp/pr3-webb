import {
  BaseEntity,
  EntityStatus,
  CreateDto,
  UpdateDto,
  EntityAnalytics,
  ApiResponse,
} from './types';
import { ProductRepository } from './repositories';
import { FrozenEntity } from './decorators';

@FrozenEntity()
class Product implements BaseEntity {
  id!: string;
  title!: string;
  price!: number;
  status!: EntityStatus;
  createdAt!: Date;
  updatedAt!: Date;
}

const productRepo = new ProductRepository<Product>();

console.log('=== Створення сутностей ===');
const dto1: CreateDto<Product> = {
  title: 'Ноутбук',
  price: 35000,
  status: EntityStatus.Active,
};

const dto2: CreateDto<Product> = {
  title: 'Мишка',
  price: 800,
  status: EntityStatus.Draft,
};

const prod1 = productRepo.create({
  ...dto1,
  id: 'prod-1',
  createdAt: new Date(),
  updatedAt: new Date(),
});

const prod2 = productRepo.create({
  ...dto2,
  id: 'prod-2',
  createdAt: new Date(),
  updatedAt: new Date(),
});

console.log('\n=== Часткове оновлення ===');
const updateDto: UpdateDto<Product> = {
  price: 32000,
  status: EntityStatus.Archived,
};
productRepo.update('prod-1', updateDto);

console.log('\n=== Підрахунок статистики статусів ===');
const allProducts = productRepo.findAll();

const analytics: EntityAnalytics = {
  [EntityStatus.Active]: 0,
  [EntityStatus.Archived]: 0,
  [EntityStatus.Draft]: 0,
};

allProducts.forEach((p) => {
  analytics[p.status]++;
});

console.log('Аналітика за статусами:', analytics);

console.log('\n=== Формування ApiResponse ===');
const response: ApiResponse<Product[]> = {
  success: true,
  data: allProducts,
  timestamp: new Date(),
  meta: {
    total: allProducts.length,
    analytics,
  },
};

console.log(JSON.stringify(response, null, 2));