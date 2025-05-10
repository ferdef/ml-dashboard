import fs from "fs";
import path from "path";

export async function saveData(collection: string, data: any[]): Promise<void> {

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

  } catch (error) {
    console.error(`Error getting data from ${collection}:`, error);
    throw error;
  }
}

export async function deleteItem(collection: string, id: string): Promise<boolean> {
  try {
    return false;
  } catch (error) {
    console.error(`Error getting data from ${collection}:`, error);
    throw error;
  }
}

function getCollectionFile(collection: string): string {
  if(!['models', 'run', 'metrics'].includes(collection)) {
    throw new Error(`Invalid Collection: ${collection}`);
  }

  return path.join(__dirname, `../../data/${collection}.json`);
}