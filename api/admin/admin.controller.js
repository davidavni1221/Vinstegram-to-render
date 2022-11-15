const adminService = require('./admin.service.js')
const logger = require('../../services/logger.service')
const { broadcast } = require('../../services/socket.service.js')

async function getAdmins(req, res) {
  try {
    const queryParams = req.query
    console.log('00000000000000000000000000000000000000000000000000000000000000');
    console.log({queryParams});
    const admins = await adminService.query(queryParams)
    res.json(admins)
  } catch (err) {
    res.status(404).send(err)
  }
}

async function getAdminById(req, res) {
  try {
    console.log('5555555555555555555555555555555555555555555555555555555555555555');
    const adminId = req.params.id
    const admin = await adminService.getById(adminId)
    res.json(admin)
  } catch (err) {
    res.status(404).send(err)
  }
}

async function addAdmin(req, res) {
  const admin = req.body
  console.log('wwwwwwmmmmmm');
  console.log(admin);
  try {
    const addedAdmin = await adminService.add(admin)
    // broadcast({ type: 'something-changed', userId: req.session?.user._id })
    res.json(addedAdmin)
  } catch (err) {
    res.status(500).send(err)
  }
}

async function updateAdmin(req, res) {
  try {
    const admin = req.body
    const updatedAdmin = await adminService.update(admin)
    res.json(updatedAdmin)
  } catch (err) {
    res.status(500).send(err)
  }
}

async function removeAdmin(req, res) {
  try {
    const adminId = req.params.id
    const removedId = await adminService.remove(adminId)
    res.send(removedId)
  } catch (err) {
    res.status(500).send(err)
  }
}

async function addReview(req, res) {
  const adminId = req.params.id
  const review = req.body
  try {
    const addedReview = await adminService.addReview(review, adminId)
    res.send(addedReview)
  } catch (err) {
    res.status(500).send(err)
  }
}

module.exports = {
  getAdmins,
  getAdminById,
  addAdmin,
  updateAdmin,
  removeAdmin,
  addReview,
}
