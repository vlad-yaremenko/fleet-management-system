const router = require('express').Router();

router.use('/driver', require('./driver'));
router.use('/car', require('./car'));
router.use('/trip', require('./trip'));

module.exports = router;
