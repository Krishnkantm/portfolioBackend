const cloudinary = require('../utlis/cloudinary.js');

const getStorage = async (req, res) => {
  try {
    const result = await cloudinary.api.usage();

    console.log("Cloudinary usage result:", result);

    res.json({
      success: true,
      data: {
        used: result.storage.usage,   
        limit: 22 * 1024 * 1024 * 1024        
      }
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

module.exports = { getStorage };