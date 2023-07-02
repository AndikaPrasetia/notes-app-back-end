const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');

class NotesService {
  constructor() {
    this._notes = [];
  }

  // menyimpan note
  addNote({ title, body, tags }) {
    const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const newNote = {
      title, tags, body, id, createdAt, updatedAt,
    };

    this._notes.push(newNote);

    // fungsi filter untuk mencari berdasarkan id catatan yang baru saja dibuat (newNote).
    const isSuccess = this._notes.filter((note) => note.id === id).length > 0;

    // pengecekan id
    if (!isSuccess) {
      throw new InvariantError('Catatan gagal ditambahkan');
    }

    return id;
  }

  // membaca seluruh note yang disimpan
  getNotes() {
    return this._notes;
  }

  // membaca note yang disimpan berdasarkan id yang diberikan.
  getNoteById(id) {
    // mendapatkan note berdasarkan id
    const note = this._notes.filter((n) => n.id === id)[0];

    // pengecekan pada variabel note
    if (!note) {
      // Bila note tidak ditemukan
      throw new NotFoundError('Catatan tidak ditemukan');
    }
    return note;
  }

  /**
   * menerima dua parameter 'id' dan 'data note' terbaru dalam bentuk "objek",
   * (payload yang akan diambil sebagian field yaitu title, body, tags)
   */
  editNoteById(id, { title, body, tags }) {
    // mendapatkan index array pada objek note sesuai id dengan fungsi findIndex().
    const index = this._notes.findIndex((note) => note.id === id);

    /**
     * Bila note dengan id yang dicari ditemukan,
     * maka index akan bernilai array index dari objek catatan yang dicari.
     * Namun bila tidak ditemukan, maka index bernilai -1.
     */
    if (index === -1) {
      throw new NotFoundError('Gagal memperbarui catatan. Id tidak ditemukan');
    }

    const updatedAt = new Date().toISOString();

    /**
     * Spread operator (...) digunakan untuk mempertahankan nilai notes[index]-
     * yang tidak perlu diubah.
     */
    this._notes[index] = {
      ...this._notes[index],
      title,
      tags,
      body,
      updatedAt,
    };
  }

  // menghapus catatan berdasarkan id
  deleteNoteById(id) {
    const index = this._notes.findIndex((note) => note.id === id);
    if (index === -1) {
      throw new NotFoundError('Catatan gagal dihapus. Id tidak ditemukan');
    }
    this._notes.splice(index, 1);
  }
}

module.exports = NotesService;
