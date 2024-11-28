const multer = require('multer');//npm install multer
const path = require('path');
// Set up storage for the uploaded images
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // cb stands for callback function
        cb(null, 'uploads/'); // Destination folder for uploads
        //null means there is not error 
    },
    filename: (req, file, cb) => {
       
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
         // For example, if it's currently October 18, 2024, at 12:00:00 UTC, Date.now() might return 1718918400000.
        //  1E9 is scientific notation for 1,000,000,000 (one billion).
        // Multiplying Math.random() by 1E9 gives a random number between 0 and 999,999,999
         cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname)); // Unique filename
    }
});
// File filter to allow only certain types of files
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif']; // Add more as needed
    // A MIME type (Multipurpose Internet Mail Extensions) is a standard way to indicate the nature and format 
    //of a document, file, or byte stream. It is used by browsers and servers to determine 
    //how to handle different types of files.
    if (allowedTypes.includes(file.mimetype)) { 
        // searchElement: string, fromIndex?: number
       
        cb(null, true); // Accept the file
    } else {
        cb(new Error('Invalid file type. Only JPEG, PNG, and GIF are allowed.'), false); // Reject the file
    }
};

// Initialize multer with storage, file filter, and size limit
const upload = multer({ 
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 } // Limit to 5MB //bytes
});



module.exports=upload;