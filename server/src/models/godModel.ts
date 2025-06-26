import { Schema, model, Document } from 'mongoose';

export interface IGod extends Document {
  name: string;
  description: string;
  imageUrl: string;
  domain: string; // e.g., 'God of the Sun'
}

const godSchema = new Schema<IGod>({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  domain: { type: String, required: true },
});

export const God = model<IGod>('God', godSchema);