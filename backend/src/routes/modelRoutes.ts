import { Router } from 'express';
import * as modelController from '../controllers/modelController';

const router = Router();

router.get('/', modelController.getAllModels);
router.get('/:id', modelController.getModelById);

export default router;