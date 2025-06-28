
import { Request, Response } from 'express';

import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';

// Define the data structure for your DB
interface Data {
  gods: { id: string; name: string; description: string; imageUrl: string }[];
  glyphs: any[]; // Define glyph type if needed
}

// Configure the adapter and initialize the database
const adapter = new JSONFile<Data>(path.join(__dirname, '../db/db.json'));
const db = new Low<Data>(adapter, { gods: [], glyphs: [] });

// Function to ensure db is read
async function readDb() {
    await db.read();
}
// Call it once when the controller is initialized
readDb();

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
    const gods = db.data?.gods || [];
    res.status(200).json(gods);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching gods' });
  }
};

export const getGodById = async (req: Request, res: Response) => {
  try {
    const god = db.data?.gods.find((g) => g.id === req.params.id);
    if (god) {
      res.status(200).json(god);
    } else {
      res.status(404).json({ message: 'God not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching god' });
  }
};
