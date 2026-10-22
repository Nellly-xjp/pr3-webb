export interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export enum EntityStatus {
  Active = "ACTIVE",
  Archived = "ARCHIVED",
  Draft = "DRAFT",
}

export type CreateDto<T> = Omit<T, "id" | "createdAt" | "updatedAt">;

export type UpdateDto<T> = Partial<CreateDto<T>>;

export type EntitySummary<T extends { id: string; title: string; price: number }> = Pick<
  T,
  "id" | "title" | "price"
>;

export type EntityAnalytics = Record<EntityStatus, number>;


export interface ApiResponse<TData> {
  success: boolean;
  data: TData;
  timestamp: Date;
  meta?: Record<string, unknown>;
}

export interface IRepository<T extends BaseEntity> {
  create(item: T): T;
  findById(id: string): T | null;
  findAll(): T[];
  update(id: string, patch: UpdateDto<T>): T | null;
  deleteById(id: string): boolean;
}