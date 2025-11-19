import { Router } from 'express';
import { translate } from '../controllers/translationController';

const router = Router();

// POST /api/v1/translate
router.post('/translate', translate);

export default router;