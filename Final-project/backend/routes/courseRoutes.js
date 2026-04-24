const express = require('express');
const router = express.Router();

const coursectrl = require("../controller/courseController");
const upload = require('../middleware/upload');

//multiple image upload
router.post("/",upload.array("images",5),coursectrl.addcourse);
router.get("/", coursectrl.viewcourse);
router.get("/search/:keyword", coursectrl.searchcourse);
router.get("/:id", coursectrl.singelcourse);
router.put("/:id",upload.array("images",5), coursectrl.updatecourse);
router.delete("/:id", coursectrl.deletecourse);

module.exports = router;