const dbService = require('../../services/db.service')
const utilService = require('../../services/utilService.js')
const ObjectId = require('mongodb').ObjectId

async function query(filterBy=null) {
  const criteria = _buildCriteria(filterBy)
  console.log(criteria);
  const collection = await dbService.getCollection('story')
  var storys = await collection.find(criteria).toArray()
  return storys
}

async function getById(storyId) {
  console.log('1');
  const collection = await dbService.getCollection('story')
  console.log('2');
  const story = await collection.findOne({ _id: ObjectId(storyId) })
  console.log('3');
  return story
}

async function remove(storyId) {
  const collection = await dbService.getCollection('story')
  await collection.deleteOne({ _id: ObjectId(storyId) })
  return storyId
}

async function add(story) {
  const collection = await dbService.getCollection('story')
  const { ops } = await collection.insertOne(story)
  console.log(ops[0]);
  console.log("okjhhhh");
  return ops[0]
}
async function update(story) {
  var id = ObjectId(story._id)
  delete story._id
  const collection = await dbService.getCollection('story')
  await collection.updateOne({ _id: id }, { $set: { ...story } })
  story._id = id
  return story
}

async function addReview(review, storyId) {
  try {
    const collection = await dbService.getCollection('story')
    review.id = utilService.makeId()
    review.createdAt = Date.now()
    await collection.updateOne({ _id: ObjectId(storyId) }, { $push: { reviews: review } })
    return review
  } catch (err) {
    console.log(err)
    throw err
  }
}

async function addMsg(storyId, msg) {
  const story = await getById(storyId)
  story.msgs = story.msgs || []
  story.msgs.push(msg)
  update(story)
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
