const Mood = require('../models/Mood');

exports.createMood = async (req, res, next) => {
  try {
    const moodEntry = new Mood(req.body);
    const savedEntry = await moodEntry.save();
    res.status(201).json(savedEntry);
  } catch (err) {
    next(err);
  }
};

exports.getMoods = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;       // Default to page 1
    const limit = parseInt(req.query.limit) || 10;    // Default to 10 items per page
    const skip = (page - 1) * limit;

    // Total entries
    const total = await Mood.countDocuments();

    // Paginated moods
    const moods = await Mood.find()
      .sort({ timestamp: -1 })
      .skip(skip)
      .limit(limit);

    // Average mood across all documents
    const avgResult = await Mood.aggregate([
      { $group: { _id: null, avgMood: { $avg: "$mood" } } }
    ]);

    const averageMood = avgResult.length > 0 ? avgResult[0].avgMood.toFixed(1) : "0";

    res.status(200).json({
      success: true,
      total,
      page,
      limit,
      averageMood,   // <-- now added
      data: moods
    });
  } catch (err) {
    next(err);
  }
};

exports.getMoodsRangeGraph = async (req, res, next) => {
  try {
    const range = req.query.range; // "7d" | "30d"

    if (!range) {
      return res.status(400).json({
        success: false,
        message: "Range parameter is required (7d or 30d)",
      });
    }

    const now = new Date();
    const fromDate = new Date();

    if (range === "7d") {
      fromDate.setDate(now.getDate() - 6); // last 7 days
    } else if (range === "30d") {
      fromDate.setDate(now.getDate() - 29); // last 30 days
    } else {
      return res.status(400).json({
        success: false,
        message: "Invalid range. Use '7d' or '30d'",
      });
    }

    // query by date
    const query = {
      date: { $gte: fromDate.toISOString().split("T")[0] },
    };

    const moods = await Mood.find(query).sort({ date: 1 }); // oldest → newest

    res.status(200).json({
      success: true,
      total: moods.length,
      data: moods,
    });
  } catch (err) {
    next(err);
  }
};
