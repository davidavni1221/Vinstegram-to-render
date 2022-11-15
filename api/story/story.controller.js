const storyService = require('./story.service.js')
const logger = require('../../services/logger.service')
const { broadcast } = require('../../services/socket.service.js')

async function getStorys(req, res) {
  try {
    const queryParams = req.query
    console.log({queryParams});
    const storys = await storyService.query(queryParams)
    res.json(storys)
  } catch (err) {
    res.status(404).send(err)
  }
}

async function getStoryById(req, res) {
  try {
    console.log('hi');
    const storyId = req.params.id
    const story = await storyService.getById(storyId)
    res.json(story)
  } catch (err) {
    res.status(404).send(err)
  }
}

async function addStory(req, res) {
  const story = req.body
  console.log('wwwwwwmmmmmm');
  console.log(story);
  try {
    const addedStory = await storyService.add(story)
    // broadcast({ type: 'something-changed', userId: req.session?.user._id })
    res.json(addedStory)
  } catch (err) {
    res.status(500).send(err)
  }
}

async function updateStory(req, res) {
  try {
    const story = req.body
    const updatedStory = await storyService.update(story)
    res.json(updatedStory)
  } catch (err) {
    res.status(500).send(err)
  }
}

async function removeStory(req, res) {
  try {
    const storyId = req.params.id
    const removedId = await storyService.remove(storyId)
    res.send(removedId)
  } catch (err) {
    res.status(500).send(err)
  }
}

async function addReview(req, res) {
  const storyId = req.params.id
  const review = req.body
  try {
    const addedReview = await storyService.addReview(review, storyId)
    res.send(addedReview)
  } catch (err) {
    res.status(500).send(err)
  }
}

module.exports = {
  getStorys,
  getStoryById,
  addStory,
  updateStory,
  removeStory,
  addReview,
}
