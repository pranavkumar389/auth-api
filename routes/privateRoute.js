const router = require('express').Router();
const authGaurd = require('../middleware/verifyToken');

router.get('/', authGaurd, (req, res) => {
    res.send(req.user);
})

module.exports = router;