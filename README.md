# Struktur Proyek

    notes-app-back-end
    ├── src
    │ ├── api
    │ │ └── notes
    │ │   ├── handler.js
    │ │   ├── index.js
    │ │   └── routes.js
    │ ├── services
    │ │ └── inMemory
    │ │   └── NotesService.js
    │ └── server.js
    └── package.json

## api Folder

Digunakan untuk menampung banyak folder yang merupakan Hapi plugin,
terdapat satu plugin 'notes' di dalamnya.

Plugin notes ini akan bertanggung jawab untuk menangani setiap permintaan yang mengarah ke url /notes.

## services Folder

Folder services akan menampung segala fungsi yang digunakan untuk menulis, mendapatkan, mengubah, atau menghapus (CRUD) sebuah resource. terdapat satu service 'NotesService' di dalamnya. 

Berkas NotesService.js bertanggung jawab untuk mengelola resource notes yang disimpan pada memory (array).

## Berkas server.js

Berkas server.js ini memiliki ketergantungan terhadap berkas routes.js. Berkas routes.js itu sendiri menampung kode dalam menentukan routes pada Hapi server seperti path, method, dan handler yang digunakan.