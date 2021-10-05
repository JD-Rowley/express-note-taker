const router = require('express').Router();
const noteRoutes = require('./noteRoutes');

// tell server what routes to use
router.use(noteRoutes);

module.exports = router;