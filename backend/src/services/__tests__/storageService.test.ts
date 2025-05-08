import fs from 'fs';
import path from 'path';
import { getData } from '../storageService';

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
  });
});