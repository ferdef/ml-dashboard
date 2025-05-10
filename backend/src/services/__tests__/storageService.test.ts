import fs from 'fs';
import path from 'path';
import { getById, getData } from '../storageService';
import { mockModels } from '../../__fixtures__/mockModels';

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
        '[]'
      );
    });

    it('Should return an array of elements', async () => {
      (fs.existsSync as jest.Mock).mockReturnValue(true);
      (fs.promises.readFile as jest.Mock).mockResolvedValue(JSON.stringify(mockModels));

      const result = await getData('models');

      expect(result).toEqual(mockModels);
      expect(fs.existsSync).toHaveBeenCalledWith(expect.stringContaining('models.json'));

      expect(fs.promises.readFile).toHaveBeenCalledWith(expect.stringContaining('models.json'), 'utf8');

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

      expect(fs.promises.writeFile).toHaveBeenCalledWith(expect.stringContaining('models.json'),'[]');
    });

    it('Should return an item', async () => {
      (fs.existsSync as jest.Mock).mockReturnValue(true);
      (fs.promises.readFile as jest.Mock).mockResolvedValue(JSON.stringify(mockModels));

      const result = await getById('models', 'model-456');

      expect(result).toEqual(mockModels[1]);
    });
  });
});