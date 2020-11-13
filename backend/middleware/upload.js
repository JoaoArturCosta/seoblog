const util = require("util");
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");
require("dotenv").config();

// var storage = new GridFsStorage({
// 	url: `${process.env.DATABASE}`,
// 	options: { useNewUrlParser: true, useUnifiedTopology: true },
// 	file: (req, file) => {
// 		console.log(req);
// 		return new Promise((resolve, reject) => {
// 			const match = ["image/png", "image/jpeg"];

// 			// console.log("REQ:", req);

// 			if (match.indexOf(file.mimetype) === -1) {
// 				const filename = `${Date.now()}-trail-${file.originalname}`;
// 				return filename;
// 			}

// 			const fileInfo = {
// 				bucketName: "photos",
// 				filename: `${Date.now()}-trail-${file.originalname}`,
// 			};
// 			resolve(fileInfo);
// 		});
// 	},
// });

const ImageStorage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "assets/images");
	},
	filename: (req, file, cb) => {
		cb(null, new Date().toISOString() + "-" + file.originalname);
	},
});

const ImageFilter = (req, file, cb) => {
	if (
		file.mimetype === "image/png" ||
		file.mimetype === "image/jpg" ||
		file.mimetype === "image.jpeg"
	) {
		cb(null, true);
	} else {
		cb(null, false);
	}
};

// var uploadFile = multer({ storage: storage }).single("file");
exports.uploadImage = multer({
	storage: ImageStorage,
	fileFilter: ImageFilter,
});
// var uploadFilesMiddleware = util.promisify(uploadFile);
// module.exports = uploadFile;
