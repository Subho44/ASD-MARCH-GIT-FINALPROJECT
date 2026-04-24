const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage(
    {
        destination: function(req,file,cb) {
            cb(null,"uploads/");
        },
         filename: function(req,file,cb) {
            const uniquename = Date.now() +"_"+Math.random(Math.random()* 1000000);
            cb(null,uniquename + path.extname(file.originalname));
        },
    });

   const filefilter = (req,file,cb)=> {
    const allowed = /jpg|jpeg|png|webp/;
    const extname = allowed.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowed.test(file.mimetype);

     if(extname && mimetype){
        cb(null,true);

    } else {
        cb(new Error("only image file allowed"));
    }

   };

   const upload = multer({
    storage:storage,
    filefilter:filefilter,
   });

   module.exports = upload;

   