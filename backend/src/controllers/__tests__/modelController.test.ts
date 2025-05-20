import request from 'supertest';

import { mockModels, singleMockModel } from '../../__fixtures__/mockModels';
import app from '../../app';
import * as storageService from '../../services/storageService';

jest.mock('../../services/storageService');

describe('Model Controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return all models', async () => {
    (storageService.getData as jest.Mock).mockResolvedValue(mockModels);

    const response = await request(app).get('/api/models');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockModels);
    expect(storageService.getData).toHaveBeenCalledWith('models');
  });

  it('Should handle errors', async () => {
    (storageService.getData as jest.Mock).mockRejectedValue(new Error('Test Error'));

    const response = await request(app).get('/api/models');

    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty('error');
  });
});

describe('GET /api/models/:id', () => {
  it('should return a specific model if it exists', async () => {
    (storageService.getById as jest.Mock).mockResolvedValue(singleMockModel);

    const response = await request(app).get(`/api/models/${singleMockModel.id}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(singleMockModel);
    expect(storageService.getById).toHaveBeenCalledWith('models', singleMockModel.id);
  });

  it('should return 404 if model does not exist', async () => {
    (storageService.getById as jest.Mock).mockResolvedValue(null);

    const response = await request(app).get(`/api/models/unexisting`);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('error');
  });
});

describe('POST /api/models', () => {
  it('should fail if name or version are not provided', async () => {
    const noVersion = {
      name: 'Test Model',
    };

    const noName = {
      version: 'v1.0.0',
    };

    const responseA = await request(app).post('/api/models').send(noVersion);

    expect(responseA.status).toBe(400);
    expect(responseA.body).toHaveProperty('error');
    expect(storageService.createItem).not.toHaveBeenCalled();

    const responseB = await request(app).post('/api/models').send(noName);

    expect(responseB.status).toBe(400);
    expect(responseA.body).toHaveProperty('error');
    expect(storageService.createItem).not.toHaveBeenCalled();
  });
});

describe('PUT /api/models/:id', () => {
  it('should update an existing model', async () => {
    const modelId = 'model-123';
    const updateData = { version: '1.1.0' };

    const updatedModel = {
      id: modelId,
      name: 'Dental Alignment Analyzer',
      version: '1.1.0',
      updatedAt: '2025-05-08T10:00:00.000Z',
    };

    // Mock
    (storageService.getById as jest.Mock).mockResolvedValue(updatedModel);
    (storageService.updateItem as jest.Mock).mockResolvedValue(updatedModel);

    // Petición PUT
    const response = await request(app).put(`/api/models/${modelId}`).send(updateData);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(updatedModel);
  });
});
