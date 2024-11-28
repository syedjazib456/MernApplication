const Course = require('../models/course-model');
const fs = require('fs');
const path = require('path');
const courses = async (req, res) => {
  try {

    const response = await Course.find();

    if (!response) {
      return res.status(404).json({ msg: "No Courses Found" });
    }
    res.status(200).json({ msg: response });
  } catch (error) {
    console.log('Courses : ' + error);
  }
}
const addCourse = async (req, res) => {
  try {
    const { coursename, coursedesc, courseinstruct } = req.body; // Extract course details from body

    // Ensure images were uploaded
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ msg: "At least one image file is required." });
    }

    // Extract the image paths
    const imagePaths = req.files.map(file => file.path);

    // Log the uploaded files (optional)
    console.log("Uploaded Files:", req.files);

    // Create a new course instance
    const newCourse = new Course({
      coursename,
      coursedesc,
      courseinstruct,
      courseimages: imagePaths // Save array of image paths
    });

    // Save the course to the database
    const savedCourse = await newCourse.save();

    // Respond with the saved course
    res.status(201).json({ msg: "Course added successfully", course: savedCourse });
  } catch (error) {
    console.log('Add Course Error: ', error);
    res.status(500).json({ msg: "Error adding course" });
  }
};

const deleteCourse = async (req, res) => {
  try {
    const id = req.params.courseid;

    const response = await Course.deleteOne({ _id: id });

    if (response.deletedCount === 0) {
      return res.status(404).json({ msg: "Course Not Found" });
    }
    res.status(200).json({ msg: "Course Deleted Successfully" });
  } catch (error) {
    console.log('Course : ' + error);
  }
}
const getcoursebyId = async (req, res) => {
  try {
    const id = req.params.courseid;

    const response = await Course.findOne({ _id: id });


    res.status(200).json({ msg: response });
  } catch (error) {
    console.log('Course : ' + error);
  }
}

const updateacoursebyId = async (req, res, next) => {
  try {
    const id = req.params.courseid;

    // Parse `existingImages` from the request body
    const { coursename, coursedesc, courseinstruct } = req.body;
    const existingImages = req.body.existingImages
      ? JSON.parse(req.body.existingImages)
      : [];

    // Verify that the course exists
    const course = await Course.findById(id);
    if (!course) {
      return res.status(404).json({ msg: "Course not found." });
    }

    // Identify images to delete (those not in `existingImages`)
    const imagesToDelete = course.courseimages.filter(
      (image) => !existingImages.includes(image)
    );

    // Delete removed images from disk
    imagesToDelete.forEach((image) => {
      const fullPath = path.join(__dirname, "..", image);
      fs.access(fullPath, fs.constants.F_OK, (err) => {
        if (!err) {
          fs.unlink(fullPath, (unlinkErr) => {
            if (unlinkErr) {
              console.error("Failed to delete old image:", unlinkErr);
            } else {
              console.log("Old image deleted successfully:", image);
            }
          });
        }
      });
    });

    // Add paths of newly uploaded images to the updated list
    const newImagePaths = req.files.map((file) => file.path);
    const updatedCourseImages = [...existingImages, ...newImagePaths];

    // Update the course document
    const updatedCourseData = {
      coursename,
      coursedesc,
      courseinstruct,
      courseimages: updatedCourseImages,
    };

    const response = await Course.updateOne({ _id: id }, { $set: updatedCourseData });

    if (response.nModified === 0) {
      return res
        .status(404)
        .json({ msg: "Course not found or no changes made." });
    }

    return res.status(200).json({ msg: "Course updated successfully", updatedCourseData });
  } catch (error) {
    console.error("Update error:", error);
    next(error);
  }
};

module.exports = { courses, addCourse, deleteCourse, getcoursebyId, updateacoursebyId };