import { Request, Response } from 'express';
import { translateText } from '../services/translator';

export const translate = (req: Request, res: Response): void => {
    try {
        const { text } = req.body;

        // 1. Input Validation
        if (typeof text !== 'string') {
            res.status(400).json({ error: 'Invalid input. "text" must be a string.' });
            return;
        }

        if (text.trim().length === 0) {
             res.status(422).json({ error: 'Input text cannot be empty.' });
             return;
        }

        // 2. Invoke Service
        const glyphs = translateText(text);

        // 3. Return Response
        res.status(200).json(glyphs);

    } catch (error) {
        console.error('Translation Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};