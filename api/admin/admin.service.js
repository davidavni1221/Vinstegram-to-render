const dbService = require('../../services/db.service')
const utilService = require('../../services/utilService.js')
const ObjectId = require('mongodb').ObjectId

async function query(filterBy=null) {
  const criteria = _buildCriteria(filterBy)
  console.log(criteria);
  const collection = await dbService.getCollection('admin')
  var admins = await collection.find(criteria).toArray()
  return admins
}

async function getById(adminId) {
  console.log('1');
  const collection = await dbService.getCollection('admin')
  console.log('2');
  const admin = await collection.findOne({ _id: ObjectId(adminId) })
  console.log('3');
  return admin
}

async function remove(adminId) {
  const collection = await dbService.getCollection('admin')
  await collection.deleteOne({ _id: ObjectId(adminId) })
  return adminId
}

async function add(admin) {
  const collection = await dbService.getCollection('admin')
  const { ops } = await collection.insertOne(admin)
  console.log(ops[0]);
  console.log("okjhhhh");
  return ops[0]
}
async function update(admin) {
  var id = ObjectId(admin._id)
  delete admin._id
  const collection = await dbService.getCollection('admin')
  await collection.updateOne({ _id: id }, { $set: { ...admin } })
  admin._id = id
  return admin
}

async function addReview(review, adminId) {
  try {
    const collection = await dbService.getCollection('admin')
    review.id = utilService.makeId()
    review.createdAt = Date.now()
    await collection.updateOne({ _id: ObjectId(adminId) }, { $push: { reviews: review } })
    return review
  } catch (err) {
    console.log(err)
    throw err
  }
}

async function addMsg(adminId, msg) {
  const admin = await getById(adminId)
  admin.msgs = admin.msgs || []
  admin.msgs.push(msg)
  update(admin)
}

function _buildCriteria(filterBy) {
  const criteria = {}
  console.log('filterBy', filterBy)
  if (filterBy.name) {
    const txtCriteria = { $regex: filterBy.name, $options: 'i' }
    criteria.name = txtCriteria
  }
  return criteria
}



module.exports = {
  remove,
  query,
  getById,
  add,
  update,
  addReview,
  addMsg
}
