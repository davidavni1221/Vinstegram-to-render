const express = require('express')
const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware')
const { getAdmins, getAdminById, addAdmin, updateAdmin, removeAdmin, addReview } = require('./admin.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', getAdmins)
router.get('/:id', getAdminById)
// router.post('/', addAdmin)
router.put('/', updateAdmin)
// router.put('/:id', updateAdmin)
// router.delete('/:id', removeAdmin)
// router.post('/', requireAuth, requireAdmin, addAdmin)//,
// router.put('/:id', requireAuth, requireAdmin, updateAdmin)
// router.put('/:id', requireAuth, updateAdmin)
// router.delete('/:id', removeAdmin)//requireAuth, requireAdmin,
// router.post('/:id/review', addReview)

module.exports = router
