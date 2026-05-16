const express = require('express')
const router = express.Router()
const informasiController = require('../controllers/informasi.controller')

// Route GET dan POST
router.get('/', informasiController.getAllInformasi)
router.post('/', informasiController.createInformasi)

// ✅ Tambahkan ini untuk UPDATE dan DELETE
router.put('/:id', informasiController.updateInformasi)
router.delete('/:id', informasiController.deleteInformasi)

module.exports = router