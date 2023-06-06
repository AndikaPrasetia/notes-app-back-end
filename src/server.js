/**
 * Server: Memuat kode untuk membuat, mengonfigurasi,
 * dan menjalankan server HTTP menggunakan Hapi.
 */

const Hapi = require('@hapi/hapi');
// const routes = require('./routes');
const notes = require('./api/notes');
const NotesService = require('./services/inMemory/NotesService');

// membuat server menggunakan Hapi
const init = async () => {
  const notesService = new NotesService();
  const server = Hapi.server({
    port: 5000,
    host: process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0',
    routes: {
      // menerapkan CORS pada origin yang berbeda.
      cors: {
        // (*) untuk memperbolehkan data di konsumsi oleh seluruh origin.
        origin: ['*'],
      },
    },
  });

  // server.route(routes);

  await server.register({
    plugin: notes,
    options: {
      service: notesService,
    },
  });

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
