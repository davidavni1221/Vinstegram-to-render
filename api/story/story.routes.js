const express = require('express')
const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware')
const { getStorys, getStoryById, addStory, updateStory, removeStory, addReview } = require('./story.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', getStorys)
router.get('/:id', getStoryById)
router.post('/', addStory)
router.put('/', updateStory)
// router.put('/:id', updateStory)
// router.delete('/:id', removeStory)
// router.post('/', requireAuth, requireAdmin, addStory)//,
// router.put('/:id', requireAuth, requireAdmin, updateStory)
// router.put('/:id', requireAuth, updateStory)
router.delete('/:id', removeStory)//requireAuth, requireAdmin,
router.post('/:id/review', addReview)

module.exports = router
