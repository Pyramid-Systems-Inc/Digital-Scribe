import { Schema, model, Document } from 'mongoose';

export interface IGlyph extends Document {
  glyphId: string;
  unicode: string;
  phoneticValue: string;
  description: string;
  category: string;
  imageUrl: string;
}

const glyphSchema = new Schema<IGlyph>({
  glyphId: { type: String, required: true, unique: true, index: true },
  unicode: { type: String, required: true },
  phoneticValue: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  imageUrl: { type: String, required: true },
});

export const Glyph = model<IGlyph>('Glyph', glyphSchema);