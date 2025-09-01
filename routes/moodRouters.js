const express = require('express');
const router = express.Router();
const { createMood, getMoods, getMoodsRangeGraph } = require('../controllers/moodControllers');

router.post('/moods', createMood);
router.get('/moods', getMoods);
router.get('/moodsGraph',getMoodsRangeGraph)

module.exports = router;