export interface MLModel {
  id: string;
  name: string;
  version: string;
  description?: string;
  createdAt: string; // En el frontend usamos string en lugar de Date
  updatedAt: string; // porque viene como string del JSON de la API
}