import { groupCollapsed } from 'console';
import fs from 'fs';
import path from 'path';

import { mockModels } from '../../__fixtures__/mockModels';
import { createItem, deleteItem, updateItem, getById, getData } from '../storageService';

jest.mock('fs', () => ({
  promises: {
    readFile: jest.fn(),
    writeFile: jest.fn().mockResolvedValue(undefined),
  },
  existsSync: jest.fn(),
}));

describe('storageService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getData', () => {
    it('Should return an empty array if file does not exist', async () => {
      (fs.existsSync as jest.Mock).mockReturnValue(false);

      const result = await getData('models');

      expect(result).toEqual([]);

      expect(fs.promises.writeFile).toHaveBeenCalledWith(
        expect.stringContaining('models.json'),
        '[]',
      );
    });

    it('Should return an array of elements', async () => {
      (fs.existsSync as jest.Mock).mockReturnValue(true);
      (fs.promises.readFile as jest.Mock).mockResolvedValue(JSON.stringify(mockModels));

      const result = await getData('models');

      expect(result).toEqual(mockModels);
      expect(fs.existsSync).toHaveBeenCalledWith(expect.stringContaining('models.json'));

      expect(fs.promises.readFile).toHaveBeenCalledWith(
        expect.stringContaining('models.json'),
        'utf8',
      );

      expect(fs.promises.writeFile).not.toHaveBeenCalled();

      expect(result).toHaveLength(2);
      expect(result[0]).toHaveProperty('id');
      expect(result[0]).toHaveProperty('name');
      expect(result[0]).toHaveProperty('version');
      expect(result[0]).toHaveProperty('description');
      expect(result[0]).toHaveProperty('createdAt');
      expect(result[0]).toHaveProperty('updatedAt');
    });
  });

  describe('getById', () => {
    it('Should return null if file does not exist', async () => {
      (fs.existsSync as jest.Mock).mockReturnValue(false);

      const result = await getById('models', 'id');

      expect(result).toBeNull();

      expect(fs.promises.writeFile).toHaveBeenCalledWith(
        expect.stringContaining('models.json'),
        '[]',
      );
    });

    it('Should return an item', async () => {
      (fs.existsSync as jest.Mock).mockReturnValue(true);
      (fs.promises.readFile as jest.Mock).mockResolvedValue(JSON.stringify(mockModels));

      const result = await getById('models', 'model-456');

      expect(result).toEqual(mockModels[1]);
    });
  });

  describe('createItem', () => {
    it('should return the item created', async () => {
      (fs.existsSync as jest.Mock).mockReturnValue(true);
      (fs.promises.readFile as jest.Mock).mockResolvedValue(JSON.stringify(mockModels));

      const newItem = {
        name: 'new Item',
        version: '1.2',
        description: 'new Description',
      };

      const returnedItem = await createItem('models', newItem);

      expect(returnedItem).toHaveProperty('id');
      expect(returnedItem).toHaveProperty('name');
      expect(returnedItem.name).toBe(newItem.name);
      expect(returnedItem).toHaveProperty('version');
      expect(returnedItem).toHaveProperty('description');
      expect(returnedItem).toHaveProperty('createdAt');
      expect(returnedItem).toHaveProperty('updatedAt');

      expect(fs.promises.writeFile).toHaveBeenCalledWith(
        expect.stringContaining('models.json'),
        expect.any(String),
      );

      const savedData = JSON.parse((fs.promises.writeFile as jest.Mock).mock.calls[0][1]);
      expect(savedData).toHaveLength(mockModels.length + 1);
      expect(savedData).toContainEqual(returnedItem);
    });
  });

  describe('deleteItem', () => {
    it('should return false if the item does not exist', async () => {
      (fs.existsSync as jest.Mock).mockReturnValue(true);
      (fs.promises.readFile as jest.Mock).mockResolvedValue(JSON.stringify(mockModels));

      const deleted = await deleteItem('models', 'model-none');
      expect(deleted).toBeFalsy();
    });
    it('should return true if the item exists', async () => {
      (fs.existsSync as jest.Mock).mockReturnValue(true);
      (fs.promises.readFile as jest.Mock).mockResolvedValue(JSON.stringify(mockModels));

      const itemsFirst = await getData('models');
      expect(itemsFirst.length).toBe(2);

      const deleted = await deleteItem('models', 'model-456');
      expect(deleted).toBeTruthy();

      expect(fs.promises.writeFile).toHaveBeenCalledWith(
        expect.stringContaining('models.json'),
        expect.any(String),
      );

      const savedData = JSON.parse((fs.promises.writeFile as jest.Mock).mock.calls[0][1]);
      expect(savedData).toHaveLength(mockModels.length - 1);
    });
  });

  describe('updateItem', () => {
    it('should return null if item does not exist', async () => {
      (fs.existsSync as jest.Mock).mockReturnValue(true);
      (fs.promises.readFile as jest.Mock).mockResolvedValue(JSON.stringify(mockModels));

      const updated = await updateItem('models', 'model-none', {});
      expect(updated).toBeNull();
    });

    it('should return modified item', async () => {
      (fs.existsSync as jest.Mock).mockReturnValue(true);
      (fs.promises.readFile as jest.Mock).mockResolvedValue(JSON.stringify(mockModels));

      const newFields = {
        name: 'new Name',
      };

      const returnedItem = await getById('models', 'model-456');

      expect(returnedItem).toHaveProperty('name');
      expect(returnedItem.name).toBe('Dental Alignment Analyzer');

      const updated = await updateItem('models', 'model-456', newFields);

      expect(updated).not.toBeNull();
      expect(updated).toHaveProperty('name');
      expect(updated.name).toBe(newFields.name);
      expect(fs.promises.writeFile).toHaveBeenCalledWith(
        expect.stringContaining('models.json'),
        expect.any(String),
      );
    });
  });
});
