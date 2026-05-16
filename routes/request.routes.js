const express = require('express');
const router = express.Router();
const requestController = require('../controllers/request.controller');

// POST /api/request/submit
router.post('/submit', requestController.submitRequest);

// GET /api/request
router.get('/', requestController.getAllRequests);

module.exports = router;
