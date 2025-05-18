import { Request, Response } from 'express';
import * as storageService from '../services/storageService';

export async function getAllModels(req: Request, res: Response): Promise<void> {
  try {
    const models = await storageService.getData('models');
    res.status(200).json(models);
  } catch (error) {
    console.error('Error getting models', error);
    res.status(500).json({ error: 'Error getting the models'});
  }
}

export async function getModelById(req: Request, res: Response): Promise<void> {
  try {
    const id = req.params.id;
    const model = await storageService.getById('models', id);

    if (!model) {
      res.status(404).json({ error: `Model with ID ${id} mot found`});
      return;
    }

    res.status(200).json(model);
  } catch (error) {
    console.error(`Error getting model with Id ${req.params.id}`, error);
    res.status(500).json({ error: 'Error getting model'});
  }
}

export async function createModel(req: Request, res: Response): Promise<void> {

}

export async function updateModel(req: Request, res: Response): Promise<void> {

}

export async function deleteModel(req: Request, res: Response): Promise<void> {

}