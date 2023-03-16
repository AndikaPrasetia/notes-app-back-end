/**
 * Server: Memuat kode untuk membuat, mengonfigurasi,
 * dan menjalankan server HTTP menggunakan Hapi.
 */

// eslint-disable-next-line import/no-extraneous-dependencies
const Hapi = require('@hapi/hapi');
const routes = require('./routes');

// membuat server menggunakan Hapi
const init = async () => {
  const server = Hapi.server({
    port: 5000,
    host: 'localhost',
    routes: {
      // menerapkan CORS pada origin yang berbeda.
      cors: {
        // (*) untuk memperbolehkan data di konsumsi oleh seluruh origin.
        origin: ['*'],
      },
    },
  });

  server.route(routes);

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
