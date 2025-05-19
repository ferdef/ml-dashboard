import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from 'uuid';

export async function saveData(collection: string, data: any[]): Promise<void> {
  const filePath = getCollectionFile(collection);

  await fs.promises.writeFile(filePath, JSON.stringify(data));
}

export async function getData(collection: string): Promise<any[]> {
  try {
    const filePath = getCollectionFile(collection);

    if (!fs.existsSync(filePath)) {
        await fs.promises.writeFile(filePath, JSON.stringify([]));
        return [];
    }

    const data = await fs.promises.readFile(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error getting data from ${collection}:`, error);
    throw error;
  }
}

export async function getById(collection: string, id: string): Promise<any | null> {
  try {
    const items = await getData(collection);

    const item = items.find(item => item.id === id);

    return item || null;
  } catch (error) {
    console.error(`Error getting data from ${collection}:`, error);
    throw error;
  }
}

export async function createItem(collection: string, item: any): Promise<any> {
  try {
    const items = await getData(collection);

    const newItem = {
      ...item,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    items.push(newItem);

    await saveData(collection, items);

    return newItem;
  } catch (error) {
    console.error(`Error creating new item in ${collection}:`, error);
    throw error;
  }
}

export async function deleteItem(collection: string, id: string): Promise<boolean> {
  try {
    const items = await getData(collection);
    const index = items.findIndex(item => item.id === id);

    if (index === -1) {
      return false;
    }

    items.splice(index, 1);

    await saveData(collection, items);

    return true;
  } catch (error) {
    console.error(`Error deleting item in ${collection}:`, error);
    throw error;
  }
}

export async function updateItem(collection: string, id: string, item: any): Promise<any | null> {
  try {
    const items = await getData(collection);

    const index = items.findIndex(item => item.id === id);

    if (index === -1) {
      return null;
    }

    const updatedItem = {
      ...items[index],
      ...item,
      id: id,
      updatedAt: new Date().toISOString()
    };

    items[index] = updatedItem;

    await saveData(collection, items);

    return updatedItem;
  } catch (error) {
    console.error(`Error updating ${collection} with ID ${id}:`, error);
    throw error;
  }
}

function getCollectionFile(collection: string): string {
  if(!['models', 'run', 'metrics'].includes(collection)) {
    throw new Error(`Invalid Collection: ${collection}`);
  }

  return path.join(__dirname, `../../data/${collection}.json`);
}