import multer from "multer";
import path from "path";

const __dirname = path.resolve();

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, path.join(__dirname, "import React from 'react'"));
//     import PropTypes from 'prop-types'

//     const multerHandler = props => {
//       return (
//         <div>multerHandler</div>
//       )
//     }

//     multerHandler.propTypes = {}

//     export default multerHandler./uploads/"));
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.originalname);
//   },
// });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "./uploads/"));
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg"
    ) {
      cb(null, true);
    } else {
      cb(new Error("Only jpeg and png files are allowed"), false);
    }
  },
});

export default upload;
