import { model, Schema } from 'mongoose';

const noteSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      default: '',
      trim: true,
    },
    tag: {
      type: String,
      enum: [
        'Todo',
        'Work',
        'Personal',
        'Shopping',
        'Meeting',
        'Ideas',
        'Travel',
        'Finance',
        'Health',
        'Important',
      ],
      default: 'Todo',
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Note = model('Note', noteSchema);
