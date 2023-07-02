const NotesHandler = require('./handler');
const routes = require('./routes');

/**
 * Diperlukan sebuah objek yang memiliki properti 'register' sebagai fungsi.
 * Fungsi register ini akan dijalankan ketika plugin dipasang pada Hapi server.
 */

/**
 * param 'server' untuk melakukan konfigurasi ketika menginisialisasi server.
 *
 * param 'validator' sebagai argumen dalam membuat instances NoteHandler.
 */

module.exports = {
  name: 'notes',
  version: '1.0.0',

  register: async (server, { service, validator }) => {
    const notesHandler = new NotesHandler(service, validator);
    server.route(routes(notesHandler));
  },
};
