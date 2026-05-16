const Informasi = require('../models/informasi')

// Ambil semua informasi
exports.getAllInformasi = async (req, res) => {
  try {
    const data = await Informasi.find().sort({ dibuatPada: -1 })
    res.json(data)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}


// Tambahkan informasi baru
exports.createInformasi = async (req, res) => {
  const { judul, isi, kategori } = req.body

  try {
    const infoBaru = new Informasi({ judul, isi, kategori })
    await infoBaru.save()
    res.status(201).json(infoBaru)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

exports.updateInformasi = async (req, res) => {
  const { id } = req.params
  const { judul, isi, kategori } = req.body

//   console.log("ID:", id)
//   console.log("BODY:", req.body)

  try {
    const updated = await Informasi.findByIdAndUpdate(
      id,
      { judul, isi, kategori },
      { new: true }
    )
    if (!updated) return res.status(404).json({ message: "Informasi tidak ditemukan" })
    res.json(updated)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

exports.deleteInformasi = async (req, res) => {
  const { id } = req.params

  try {
    const deleted = await Informasi.findByIdAndDelete(id)
    if (!deleted) return res.status(404).json({ message: "Informasi tidak ditemukan" })
    res.json({ message: "Informasi berhasil dihapus" })
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}