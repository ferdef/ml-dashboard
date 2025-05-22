import axios from 'axios';
import type { MLModel } from '../types/MLModel';

const API_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  }
});

export const modelService = {
  getAll: async (): Promise<MLModel[]> => {
    const response = await api.get('/models');
    return response.data;
  },

  getById: async (id: string): Promise<MLModel> => {
    const response = await api.get(`/models/${id}`);
    return response.data;
  },

  createItem: async (model: Omit<MLModel, 'id' | 'createdAt' | 'updatedAt'>): Promise<MLModel> => {
    const response = await api.post('/models', model);
    return response.data;
  },

  updateItem: async (id: string, model: Partial<MLModel>): Promise<MLModel> => {
    const response = await api.put(`/models/${id}`, model);
    return response.data;
  },

  deleteItem: async (id: string): Promise<void> => {
    await api.delete(`/models/${id}`);
  }
};