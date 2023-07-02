const Joi = require('joi');
/**
 * Berkas schema.js akan digunakan untuk fokus membuat-
 * dan menuliskan objek schema data notes.
 */

const NotePayloadSchema = Joi.object({
  title: Joi.string().required(),
  body: Joi.string().required(),
  tags: Joi.array().items(Joi.string()).required(),
});

module.exports = { NotePayloadSchema };
