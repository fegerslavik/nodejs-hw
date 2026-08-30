import { Joi, celebrate } from 'celebrate';
import { isValidObjectId } from 'mongoose';
import { TAGS } from '../constants/tags.js';

export const getAllNotesSchema = {
  query: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    perPage: Joi.number().integer().min(5).max(20).default(10),
    tag: Joi.string()
      .valid(...TAGS)
      .optional(),
    search: Joi.string().allow('').optional(),
  }).unknown(true),
};

export const noteIdSchema = {
  params: Joi.object({
    noteId: Joi.string()
      .required()
      .custom((value, helpers) => {
        if (!isValidObjectId(value)) {
          return helpers.message({ custom: 'Invalid noteId' });
        }

        return value;
      }, 'ObjectId validation'),
  }),
};

export const createNoteSchema = {
  body: Joi.object({
    title: Joi.string().trim().min(1).required(),
    content: Joi.string().trim().allow('').optional(),
    tag: Joi.string()
      .valid(...TAGS)
      .optional(),
  }).required(),
};

export const updateNoteSchema = {
  params: Joi.object({
    noteId: Joi.string()
      .required()
      .custom((value, helpers) => {
        if (!isValidObjectId(value)) {
          return helpers.message({ custom: 'Invalid noteId' });
        }

        return value;
      }, 'ObjectId validation'),
  }),
  body: Joi.object({
    title: Joi.string().trim().min(1).optional(),
    content: Joi.string().trim().allow('').optional(),
    tag: Joi.string()
      .valid(...TAGS)
      .optional(),
  })
    .or('title', 'content', 'tag')
    .required(),
};

export const validateGetAllNotes = celebrate(getAllNotesSchema);
export const validateNoteId = celebrate(noteIdSchema);
export const validateCreateNote = celebrate(createNoteSchema);
export const validateUpdateNote = celebrate(updateNoteSchema);
