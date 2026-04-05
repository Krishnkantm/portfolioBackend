const Profile = require('../models/Profile.js');
const cloudinary = require('../utlis/cloudinary.js');
const fs = require('fs');

const getProfile = async (req, res) => {
  try {
    let profile = await Profile.findOne();

    // if not exists, create empty
    if (!profile) {
      profile = await Profile.create({});
    }

    res.status(200).json({
      success: true,
      data: profile
    });

  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};

const updateProfile = async (req, res) => {
  try {
    let imageUrl = "";

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        resource_type: "image"
      });

      imageUrl = result.secure_url;
      fs.unlinkSync(req.file.path);
    }

    const updated = await Profile.findOneAndUpdate(
      {},
      {
        ...req.body,
        ...(imageUrl && { image: imageUrl })
      },
      {
        new: true,
        upsert: true
      }
    );

    res.json({
      success: true,
      data: updated
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getProfile, updateProfile };