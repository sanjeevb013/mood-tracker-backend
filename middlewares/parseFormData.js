// middleware/parseFormData.js

const parseFormDataJSON = (req, res, next) => {
  try {
    // Parse 'content' field if it exists and is a string
    if (req.body.content && typeof req.body.content === 'string') {
      try {
        req.body.content = JSON.parse(req.body.content);
        console.log('✅ Content parsed successfully:', req.body.content);
      } catch (parseError) {
        return res.status(400).json({
          error: 'Invalid JSON format in content field',
          message: parseError.message,
          hint: 'Make sure content is valid JSON array'
        });
      }
    }

    next();
  } catch (error) {
    res.status(500).json({
      error: 'Error processing form data',
      message: error.message
    });
  }
};

module.exports = parseFormDataJSON;