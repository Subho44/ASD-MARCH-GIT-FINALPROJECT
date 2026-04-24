const Course = require("../models/Course");

// add course
exports.addcourse = async (req, res) => {
  try {
    const { title, instructor, duration, price, category, description } = req.body;
    const imageFiles = req.files ? req.files.map((file)=>file.filename) : [];

    const newcourse = await Course.create({
      title,
      instructor,
      duration,
      price,
      category,
      description,
      images:imageFiles,
    });

    res.status(201).json({ message: "course added successfully", newcourse });
  } catch (err) {
    res.status(400).json({ message: "course not added successfully", err });
  }
};

// view all course
exports.viewcourse = async (req, res) => {
  try {
    const courses = await Course.find().sort({ createdAt: -1 });
    res.status(200).json(courses);
  } catch (err) {
    res.status(400).json({ message: "cannot fetch courses", err });
  }
};

// single view
exports.singelcourse = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await Course.findById(id);
    res.status(200).json(course);
  } catch (err) {
    res.status(400).json({ message: "cannot fetch single course", err });
  }
};

// update
exports.updatecourse = async (req, res) => {

  try {
     const { title, instructor, duration, price, category, description } = req.body;
     const oldcourse = await Course.findById(req.params.id);
     if(!oldcourse) {
      return res.status(400).json({ message: "course not found"});
     }
     let updatedimages = oldcourse.images;
     if(req.files && req.files.length >0){
      updatedimages = req.files.map((file)=> file.filename);
     }

    
    const course = await Course.findByIdAndUpdate(
      req.params.id,
      {
      title,
      instructor,
      duration,
      price,
      category,
      description,
      images:updatedimages,
    },
     { new: true });

    res.status(200).json(course);
  } catch (err) {
    res.status(400).json({ message: "course not updated", err });
  }
};

// delete
exports.deletecourse = async (req, res) => {
  try {
    await Course.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "course deleted" });
  } catch (err) {
    res.status(400).json({ message: "course not deleted", err });
  }
};

// search
exports.searchcourse = async (req, res) => {
  try {
    const keyword = req.params.keyword;
    const course = await Course.find({
      title: { $regex: keyword, $options: "i" }
    });
    res.status(200).json(course);
  } catch (err) {
    res.status(400).json({ message: "search failed", err });
  }
};