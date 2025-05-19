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
  try {
    const modelData = req.body;

    if (!modelData.name || !modelData.version) {
      res.status(400).json({ error: 'name and version fields are mandatory'});
      return;
    }

    const newModel = await storageService.createItem('models', modelData);
    res.status(201).json(newModel);
  } catch(error) {
    console.error('Error creating model', error);
    res.status(500).json({ error: 'Error creating model' });
  }
}

export async function updateModel(req: Request, res: Response): Promise<void> {
  try {
    const id = req.params.id;
    const modelData = req.body;

    const existingModel = await storageService.getById('models', id);
    if(!existingModel) {
      res.status(404).json({ error: `Model with ID ${id} not found`});
      return;
    }

    const updatedModel = await storageService.update('models', id, modelData);
    res.status(200).json(updatedModel);
  } catch(error) {
    console.error(`Error updating model with ID ${req.params.id}`, error);
    res.status(500).json({error: 'Error updating the model'});
  }
}

export async function deleteModel(req: Request, res: Response): Promise<void> {
  try {
    const id = req.params.id;

    const deleted = await storageService.deleteItem('models', id);

    if(!deleted) {
      res.status(404).json({error: `Model with ID ${id} not found`});
      return;
    }

    res.status(200).json({ message: `Model with ID ${id} removed successfully`});
  } catch(error) {
    console.error(`Error deleting model with ID ${req.params.id}:`, error);
    res.status(500).json({ error: 'Error deleting model'});
  }
}