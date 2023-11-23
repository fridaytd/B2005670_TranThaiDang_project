const StaffService = require('../services/staff.service')

const staffServie = new StaffService()

async function getStaffById(req, res) {
    const staffId = req.id
    try {
        const result = await staffServie.findById(staffId)
        res.status(200).json(result)
    } catch (err) {
        console.log(err);
        res.sendStatus(500)
    }
}

module.exports = {
    getStaffById,
}