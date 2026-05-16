const mongoose = require('mongoose')

const InformasiSchema = new mongoose.Schema({
  judul: { type: String, required: true },
  isi: { type: String, required: true },
  kategori: { type: String, required: true },
  dibuatPada: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Informasi', InformasiSchema)