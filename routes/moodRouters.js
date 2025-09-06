const express = require('express');
const router = express.Router();
const { createMood, getMoods, getMoodsRangeGraph } = require('../controllers/moodControllers');

router.post('/saveMood', createMood);
router.get('/get', getMoods);
router.get('/moodsGraph',getMoodsRangeGraph)

module.exports = router;