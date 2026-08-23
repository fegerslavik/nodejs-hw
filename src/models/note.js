import { model, Schema } from 'mongoose';

const noteSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    tag: {
      type: String,
      default: 'personal',
    },
  },
  {
    timestamps: true,
  },
);

export const Note = model('Note', noteSchema);
