
import { Router } from 'express';
import { getAllGlyphs, getAllGods, getGodById } from '../controllers/learnController';

const router = Router();

router.get('/glyphs', getAllGlyphs);
router.get('/gods', getAllGods);
router.get('/gods/:id', getGodById);

export default router;
