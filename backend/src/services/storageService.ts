import { v4 as uuidv4 } from 'uuid';

import { dynamoService } from './awsService';

export async function getData(collection: string): Promise<any[]> {
  try {
    const tableName = getTableName(collection);
    return await dynamoService.getAll(tableName);
  } catch (error) {
    console.error(`Error getting data from ${collection}:`, error);
    throw error;
  }
}

export async function getById(collection: string, id: string): Promise<any | null> {
  try {
    const tableName = getTableName(collection);
    return await dynamoService.getById(tableName, id);
  } catch (error) {
    console.error(`Error getting data from ${collection}:`, error);
    throw error;
  }
}

export async function createItem(collection: string, item: any): Promise<any> {
  try {
    const tableName = getTableName(collection);
    const newItem = {
      ...item,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    return await dynamoService.createItem(tableName, newItem);
  } catch (error) {
    console.error(`Error creating new item in ${collection}:`, error);
    throw error;
  }
}

export async function deleteItem(collection: string, id: string): Promise<boolean> {
  try {
    const tableName = getTableName(collection);
    return await dynamoService.deleteItem(tableName, id);
  } catch (error) {
    console.error(`Error deleting item in ${collection}:`, error);
    throw error;
  }
}

export async function updateItem(collection: string, id: string, item: any): Promise<any | null> {
  try {
    const tableName = getTableName(collection);
    return await dynamoService.updateItem(tableName, id, {
      ...item,
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error(`Error updating ${collection} with ID ${id}:`, error);
    throw error;
  }
}

function getTableName(collection: string): string {
  switch (collection) {
    case 'models':
      return process.env.DYNAMODB_MODELS_TABLE || 'ml-dashboard-models';
    case 'runs':
      return process.env.DYNAMODB_RUNS_TABLE || 'ml-dashboard-runs';
    case 'metrics':
      return process.env.DYNAMODB_METRICS_TABLE || 'ml-dashboard-metrics';
    default:
      throw new Error(`Invalid Collection: ${collection}`);
  }
}
