
// const multer = require('multer');
// const path = require('path');
// const fs = require('fs');


// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
      
//       const uploadPath = path.join(__dirname, 'public', 'uploads');

      
//       fs.exists(uploadPath, (exists) => {
//         if (!exists) {
//           fs.mkdirSync(uploadPath, { recursive: true }); 
//         }
//         cb(null, uploadPath);  
//       });
//     },
//     filename: (req, file, cb) => {
//       const uniqueName = Date.now() + '-' + file.originalname;
//       cb(null, uniqueName);  
//     }
// });

// const upload = multer({ storage: storage });

// module.exports = upload;

const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Assume 'public/uploads' directory already exists
    const uploadPath = path.join(__dirname, 'public', 'uploads');
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage: storage });

module.exports = upload;
