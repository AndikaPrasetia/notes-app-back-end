const InvariantError = require('../../exceptions/InvariantError');
const { NotePayloadSchema } = require('./schema');
/**
 * Berkas index.js akan fokus dalam membuat fungsi sebagai validator-
 * yang menggunakan schema dari schema.js.
 */

const NotesValidator = {
  validateNotePayload: (payload) => {
    const validationResult = NotePayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = NotesValidator;
