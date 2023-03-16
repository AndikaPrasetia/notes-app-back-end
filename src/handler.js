/**
 * Handler: Membuat fungsi-fungsi handler yang digunakan -
 * pada berkas routes.
 */

// eslint-disable-next-line import/no-extraneous-dependencies
const { nanoid } = require('nanoid');
const notes = require('./notes');

// fungsi handler untuk menambahkan note.
const addNoteHandler = (request, h) => {
  // menyimpan catatan melalui body request dengan 'request.payload'.
  const { title, tags, body } = request.payload;

  // nanoid; untuk menghasilkan nilai id unik.
  const id = nanoid(16);
  // membuat tanggal pembuatan note.
  const createdAt = new Date().toISOString();
  // update dan create akan selalu sama (tanggalnya), karena createdAt akan selalu membuat new date.
  const updatedAt = createdAt;

  // menambahkan proterty baru (id, createdAt, updatedAt).
  const newNote = {
    title, tags, body, id, createdAt, updatedAt,
  };

  // menambahkan proterties 'newNote' ke dalam array 'notes'.
  notes.push(newNote);

  // menentukan 'newNote' ke dalam array 'notes' berdasarkan id catatan untuk mengetahuinya.
  const isSuccess = notes.filter((note) => note.id === id).length > 0;

  // menentukan response yang diberikan server.
  if (isSuccess) {
    // jika response 'true'.
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil ditambahkan',
      data: {
        noteId: id,
      },
    });
    response.code(201);
    return response;
  }
  // jika response 'false'.
  const response = h.response({
    status: 'fail',
    message: 'Catatan gagal ditambahkan',
  });
  response.code(500);
  return response;
};

// fungsi handler untuk mendapatkan seluruh catatan.
const getAllNotesHandler = () => ({
  status: 'success',
  data: {
    notes,
  },
});

// fungsi handler untuk mendapatkan catatan dengan ID.
const getNoteByIdHandler = (request, h) => {
  // mendapatkan nilai 'id' dari 'request.params'
  const { id } = request.params;

  // mendapatkan objek 'note' dengan 'id' tersebut dari objek array 'notes'.
  const note = notes.filter((n) => n.id === id)[0];

  if (note !== undefined) {
    // mengembalikan fungsi handler dengan data beserta objek note di dalamnya.
    return {
      status: 'success',
      data: {
        note,
      },
    };
  }

  // jika 'note' bernilai 'undifined'.
  const response = h.response({
    status: 'fail',
    message: 'Catatan tidak ditemukan',
  });
  response.code(404);
  return response;
};

const editNoteByIdHandler = (request, h) => {
  const { id } = request.params;

  // mendapatkan data 'notes' terbaru yang di kirimkan oleh client melalui body request.
  const { title, tags, body } = request.payload;
  // mendapatkan nilai terbaru dengan 'Date()' dan di ubah ke format ISO string '.toISOString()'.
  const updatedAt = new Date().toISOString();

  // eslint-disable-next-line max-len
  // mendapatkan index array pada objek catatan sesuai 'id' dengan menggunakan method array 'findIndex()'.
  const index = notes.findIndex((note) => note.id === id);

  if (index !== -1) {
    notes[index] = {
      ...notes[index],
      title,
      tags,
      body,
      updatedAt,
    };

    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil diperbarui',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui catatan. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

// menghapus catatan dengan 'id'
const deleteNoteByIdHandler = (request, h) => {
  const { id } = request.params;

  const index = notes.findIndex((note) => note.id === id);

  if (index !== -1) {
    notes.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil dihapus',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Catatan gagal dihapus. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

// meng-export dengan object literals.
module.exports = {
  addNoteHandler,
  getAllNotesHandler,
  getNoteByIdHandler,
  editNoteByIdHandler,
  deleteNoteByIdHandler,
};
