/**
 * mengapa fungsi? tidak array langsung?
 * karena menggunakan plugin, kita akan menggunakan pendekatan yang berbeda.
 * Kita tidak akan menggunakan fungsi-fungsi handler dari hasil impor secara langsung,
 * melainkan handler yang akan digunakan pada route kali ini dimasukkan sebagai parameter fungsi.
 *
 * Inilah mengapa kita membuat fungsi yang mengembalikan array-
 * ketimbang membuat array secara langsung.
 *
 * Dengan ini, berkas routes.js tidak perlu tahu dari mana handler berasal.
 * Fungsi routes menjadi pure function karena tidak terikat pada sebuah objek secara langsung.
 */

const routes = (handler) => [
  {
    method: 'POST',
    path: '/notes',
    handler: handler.postNoteHandler,
  },
  {
    method: 'GET',
    path: '/notes',
    handler: handler.getNotesHandler,
  },
  {
    method: 'GET',
    path: '/notes/{id}',
    handler: handler.getNoteByIdHandler,
  },
  {
    method: 'PUT',
    path: '/notes/{id}',
    handler: handler.putNoteByIdHandler,
  },
  {
    method: 'DELETE',
    path: '/notes/{id}',
    handler: handler.deleteNoteByIdHandler,
  },
];

module.exports = routes;
