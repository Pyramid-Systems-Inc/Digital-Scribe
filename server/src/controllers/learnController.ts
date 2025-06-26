import { Request, Response } from 'express';

// --- Mock Data (to be replaced by database calls) ---

const mockGods = [
  { id: '1', name: 'Ra', domain: 'God of the Sun', description: 'One of the most important gods in ancient Egypt, Ra was the god of the sun, order, kings, and the sky.', imageUrl: '/path/to/ra.png' },
  { id: '2', name: 'Anubis', domain: 'God of Mummification', description: 'Associated with death and embalming, Anubis was depicted as a canid-headed man.', imageUrl: '/path/to/anubis.png' },
  { id: '3', name: 'Isis', domain: 'Goddess of Magic and Life', description: 'A major goddess in ancient Egyptian religion, Isis was revered as the ideal mother and wife.', imageUrl: '/path/to/isis.png' },
];

// In a real scenario, this would come from the glyphs.json or the Glyph model in the DB
import * as fs from 'fs';
import * as path from 'path';
const mockGlyphs = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/glyphs.json'), 'utf8'));


// --- Controller Functions ---

/**
 * Get all hieroglyphs for the gallery
 */
export const getAllGlyphs = async (req: Request, res: Response): Promise<void> => {
  try {
    // const glyphs = await Glyph.find().sort({ glyphId: 1 }); // Real DB call
    res.json(mockGlyphs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching glyphs' });
  }
};

/**
 * Get all gods
 */
export const getAllGods = async (req: Request, res: Response): Promise<void> => {
  try {
    // const gods = await God.find().sort({ name: 1 }); // Real DB call
    res.json(mockGods);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching gods' });
  }
};

/**
 * Get a single god by ID
 */
export const getGodById = async (req: Request, res: Response): Promise<void> => {
  try {
    // const god = await God.findById(req.params.id); // Real DB call
    const god = mockGods.find(g => g.id === req.params.id);
    if (god) {
      res.json(god);
    } else {
      res.status(404).json({ message: 'God not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching god' });
  }
};