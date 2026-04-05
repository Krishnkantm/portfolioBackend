const Project = require('../models/Project.js');
const cloudinary = require('../utlis/cloudinary.js');
const fs = require('fs');


const addProject = async (req, res) => {
  try {
    const { title, demoLink, order } = req.body;

   
    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Title is required",
      });
    }

    let imageUrl = "";
    let videoUrl = "";

   
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        resource_type: "auto", // VERY IMPORTANT
      });

      // delete local file
      fs.unlinkSync(req.file.path);

      if (result.resource_type === "video") {
        videoUrl = result.secure_url;
      } else {
        imageUrl = result.secure_url;
      }
    }

    if (!imageUrl && !videoUrl) {
      return res.status(400).json({
        success: false,
        message: "Image or Video required",
      });
    }

    const newProject = await Project.create({
      title,
      image: imageUrl,
      video: videoUrl,
      demoLink,
      order: order || 0,
    });

    res.status(201).json({
      success: true,
      message: "Project added successfully",
      data: newProject,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ✅ GET PROJECTS
const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ order: 1 });

    res.json({
      success: true,
      data: projects,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    res.json({
      success: true,
      message: "Project deleted",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = { addProject, getProjects, deleteProject };