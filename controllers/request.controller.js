const Request = require("../models/request");

// POST /api/request/submit
exports.submitRequest = async (req, res) => {
    try {
        const request = new Request(req.body);
        await request.save();
        res.status(201).json({ message: "Permohonan berhasil dikirim" });
    } catch (error) {
        console.error("Error saving request:", error);
        res.status(500).json({ message: "Gagal menyimpan permohonan" });
    }
};

// GET /api/request
exports.getAllRequests = async (req, res) => {
    try {
        const requests = await Request.find().sort({ timestamp: -1 });
        res.json(requests);
    } catch (error) {
        console.error("Error fetching requests:", error);
        res.status(500).json({ message: "Gagal mengambil data permohonan" });
    }
};