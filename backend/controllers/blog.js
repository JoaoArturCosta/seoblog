const Blog = require("../models/blog");
const Category = require("../models/category");
const Tag = require("../models/tag");
const User = require("../models/user");
const formidable = require("formidable");
const slugify = require("slugify");
const stripHtml = require("string-strip-html");
const _ = require("lodash");
const { errorHandler } = require("../helpers/dbErrorHandler");
const fs = require("fs");
const { smartTrim } = require("../helpers/blog");
require("dotenv").config();

exports.create = (req, res) => {
	let form = new formidable.IncomingForm();
	form.keepExtensions = true;
	console.log("req:", req.body);
	console.log("req:", req.files);
	// form.parse(req, (err, body, files) => {
	console.log("here");
	console.log("here:", req);
	let body = req.body;
	// if (err) {
	// 	return res.status(400).json({
	// 		error: "Image could not upload",
	// 	});
	// }
	const {
		title,
		description,
		categories,
		tags,
		location,
		distance,
		dificulty,
		duration,
		cost,
		altitude,
		elevationGain,
		routeType,
		traffic,
		dogFriendly,
		kidsFriendly,
		bugs,
		signal,
		fitnessLevel,
		visa,
		weatherDay,
		weatherNight,
		openAllYear,
		openFrom,
		priorBooking,
		activities,
		bestSeason,
		bestSeasonDescription,
		hostels,
		hotels,
		camping,
		hostelPrice,
		hotelPrice,
		campingPrice,
		startingPoint,
		endingPoint,
		directions,
		reachingDifficulty,
		transportation,
		parking,
		individualCost,
		guidedCost,
		notes,
		excerpt,
		mtitle,
		mdesc,
		status,
	} = body;

	if (!title || !title.length) {
		return res.status(400).json({
			error: "title is required",
		});
	}

	if (!description || description.length < 10) {
		return res.status(400).json({
			error: "Content is too short",
		});
	}

	if (!categories || categories.length === 0) {
		return res.status(400).json({
			error: "At least one category is required",
		});
	}

	if (!tags || tags.length === 0) {
		return res.status(400).json({
			error: "At least one tag is required",
		});
	}

	let blog = new Blog();
	blog.title = title;
	blog.description = description;
	blog.location = location;
	blog.distance = distance;
	blog.dificulty = dificulty;
	blog.duration = duration;
	blog.cost = cost;
	blog.altitude = altitude;
	blog.elevationGain = elevationGain;
	blog.routeType = routeType;
	blog.traffic = traffic;
	blog.dogFriendly = dogFriendly;
	blog.kidsFriendly = kidsFriendly;
	blog.bugs = bugs;
	blog.signal = signal;
	blog.fitnessLevel = fitnessLevel;
	blog.visa = visa;
	blog.weatherDay = weatherDay;
	blog.weatherNight = weatherNight;
	blog.openAllYear = openAllYear;
	blog.openFrom = openFrom;
	blog.priorBooking = priorBooking;
	blog.activities = activities;
	blog.bestSeason = bestSeason;
	blog.bestSeasonDescription = bestSeasonDescription;
	blog.hostels = hostels;
	blog.hotels = hotels;
	blog.camping = camping;
	blog.hostelPrice = hostelPrice;
	blog.hotelPrice = hotelPrice;
	blog.campingPrice = campingPrice;
	blog.startingPoint = startingPoint;
	blog.endingPoint = endingPoint;
	blog.directions = directions;
	blog.reachingDifficulty = reachingDifficulty;
	blog.transportation = transportation;
	blog.parking = parking;
	blog.individualCost = individualCost;
	blog.guidedCost = guidedCost;
	blog.notes = notes;
	blog.excerpt = smartTrim(description, 320, " ", " ...");
	blog.slug = slugify(title).toLowerCase();
	blog.mtitle = `${title} | ${process.env.APP_NAME}`;
	blog.mdesc = stripHtml(description.substring(0, 160));
	blog.postedBy = req.user._id;
	// categories and tags
	let arrayOfCategories = categories && categories.split(",");
	let arrayOfTags = tags && tags.split(",");
	let arrayOfPhotos = [];

	console.log("REQ:", blog);
	console.log("FILES:", req.files);

	if (req.files) {
		// if (files.photo.size > 10000000) {
		// 	return res.status(400).json({
		// 		error: "Image should be less then 1mb in size",
		// 	});
		// }
		// try {
		//     await upload(req, res);

		//     console.log(req.file);
		//     if (req.file == undefined) {
		//       return res.send(`You must select a file.`);
		//     }

		//     return res.send(`File has been uploaded.`);
		//   } catch (error) {
		//     console.log(error);
		//     return res.send(`Error when trying upload image: ${error}`);
		//   }
		console.log(req.files);
		req.files.map((file) => {
			arrayOfPhotos.push(file.path);
		});

		// blog.photo.data = fs.readFileSync(files.photo.path);
		// blog.photo.contentType = files.photo.type;
	}

	blog.save((err, result) => {
		if (err) {
			return res.status(400).json({
				error: errorHandler(err),
			});
		}
		// res.json(result);
		Blog.findByIdAndUpdate(
			result._id,
			{ $push: { categories: arrayOfCategories } },
			{ new: true }
		).exec((err, result) => {
			if (err) {
				return res.status(400).json({
					error: errorHandler(err),
				});
			} else {
				Blog.findByIdAndUpdate(
					result._id,
					{ $push: { tags: arrayOfTags } },
					{ new: true }
				).exec((err, result) => {
					if (err) {
						return res.status(400).json({
							error: errorHandler(err),
						});
					} else {
						Blog.findByIdAndUpdate(
							result._id,
							{ $push: { photos: arrayOfPhotos } },
							{ new: true }
						).exec((err, result) => {
							if (err) {
								return res.status(400).json({
									error: errorHandler(err),
								});
							} else {
								res.json(result);
							}
						});
					}
				});
			}
		});
	});
	// });
};

// list, listAllBlogsCategoriesTags, read, remove, update

exports.list = (req, res) => {
	Blog.find({})
		.populate("categories", "_id name slug")
		.populate("tags", "_id name slug")
		.populate("postedBy", "_id name username")
		.populate("photos", "_id contentType filename")
		.select(
			"_id title slug excerpt categories tags photos postedBy createdAt updatedAt"
		)
		.exec((err, data) => {
			if (err) {
				return res.json({
					error: errorHandler(err),
				});
			}
			res.json(data);
		});
};

exports.listAllBlogsCategoriesTags = (req, res) => {
	let limit = req.body.limit ? parseInt(req.body.limit) : 10;
	let skip = req.body.skip ? parseInt(req.body.skip) : 0;

	let blogs;
	let categories;
	let tags;

	Blog.find({})
		.populate("categories", "_id name slug")
		.populate("tags", "_id name slug")
		.populate("postedBy", "_id name username profile")

		.sort({ createdAt: -1 })
		.skip(skip)
		.limit(limit)
		.select(
			"_id title slug excerpt categories tags photos postedBy createdAt updatedAt"
		)
		.exec((err, data) => {
			if (err) {
				return res.json({
					error: errorHandler(err),
				});
			}
			blogs = data; // blogs
			// get all categories
			Category.find({}).exec((err, c) => {
				if (err) {
					return res.json({
						error: errorHandler(err),
					});
				}
				categories = c; // categories
				// get all tags
				Tag.find({}).exec((err, t) => {
					if (err) {
						return res.json({
							error: errorHandler(err),
						});
					}
					tags = t;
					// return all blogs categories tags
					res.json({ blogs, categories, tags, size: blogs.length });
				});
			});
		});
};

exports.read = (req, res) => {
	const slug = req.params.slug.toLowerCase();
	Blog.findOne({ slug })
		// .select("-photo")
		.populate("categories", "_id name slug")
		.populate("tags", "_id name slug")
		.populate("postedBy", "_id name username")
		.select(
			"_id title description slug location distance dificulty duration cost altitude elevationGain routeType traffic dogFriendly kidsFriendly bugs signal	fitnessLevel visa weatherDay weatherNight openAllYear openFrom priorBooking	description	activities bestSeason bestSeasonDescription	hostels	hotels camping hostelPrice	hotelPrice	campingPrice startingPoint endingPoint directions reachingDifficulty transportation	parking	individualCost	guidedCost notes mtitle mdesc categories tags postedBy photos createdAt updatedAt"
		)
		.exec((err, data) => {
			if (err) {
				return res.json({
					error: errorHandler(err),
				});
			}
			res.json(data);
		});
};

exports.remove = (req, res) => {
	const slug = req.params.slug.toLowerCase();
	Blog.findOneAndRemove({ slug }).exec((err, data) => {
		if (err) {
			return res.json({
				error: errorHandler(err),
			});
		}
		res.json({
			message: "Blog deleted successfully",
		});
	});
};

exports.update = (req, res) => {
	const slug = req.params.slug.toLowerCase();

	Blog.findOne({ slug }).exec((err, oldBlog) => {
		if (err) {
			return res.status(400).json({
				error: errorHandler(err),
			});
		}

		let form = new formidable.IncomingForm();
		form.keepExtensions = true;

		form.parse(req, (err, fields, files) => {
			if (err) {
				return res.status(400).json({
					error: "Image could not upload",
				});
			}

			let slugBeforeMerge = oldBlog.slug;
			oldBlog = _.merge(oldBlog, fields);
			oldBlog.slug = slugBeforeMerge;

			const { description, desc, categories, tags } = fields;

			if (description) {
				oldBlog.excerpt = smartTrim(description, 320, " ", " ...");
				oldBlog.desc = stripHtml(description.substring(0, 160));
			}

			if (categories) {
				oldBlog.categories = categories.split(",");
			}

			if (tags) {
				oldBlog.tags = tags.split(",");
			}

			if (files.photo) {
				if (files.photo.size > 10000000) {
					return res.status(400).json({
						error: "Image should be less then 1mb in size",
					});
				}
				oldBlog.photo.data = fs.readFileSync(files.photo.path);
				oldBlog.photo.contentType = files.photo.type;
			}

			oldBlog.save((err, result) => {
				if (err) {
					return res.status(400).json({
						error: errorHandler(err),
					});
				}
				// result.photo = undefined;
				res.json(result);
			});
		});
	});
};

exports.photo = (req, res) => {
	const slug = req.params.slug.toLowerCase();
	console.log(slug);
	Blog.findOne({ slug })
		.select("slug photos")
		.exec((err, blog) => {
			if (err || !blog) {
				return res.status(400).json({
					error: errorHandler(err),
				});
			}

			console.log("photos", blog.photos);
			// res.set("Content-Type", blog.photos[0].contentType);
			return res.send(blog.photos.data);
		});
};

exports.listRelated = (req, res) => {
	// console.log(req.body.blog);
	let limit = req.body.limit ? parseInt(req.body.limit) : 3;
	const { _id, categories } = req.body.blog;

	Blog.find({ _id: { $ne: _id }, categories: { $in: categories } })
		.limit(limit)
		.populate("postedBy", "_id name username profile")
		.select("title slug excerpt postedBy photos createdAt updatedAt")
		.exec((err, blogs) => {
			if (err) {
				return res.status(400).json({
					error: "Blogs not found",
				});
			}
			res.json(blogs);
		});
};

//
exports.listSearch = (req, res) => {
	const { search } = req.query;
	if (search) {
		Blog.find(
			{
				$or: [
					{ title: { $regex: search, $options: "i" } },
					{ description: { $regex: search, $options: "i" } },
				],
			},
			(err, blogs) => {
				if (err) {
					return res.status(400).json({
						error: errorHandler(err),
					});
				}
				res.json(blogs);
			}
		).select("-photos -description");
	}
};

exports.listByUser = (req, res) => {
	User.findOne({ username: req.params.username }).exec((err, user) => {
		if (err) {
			return res.status(400).json({
				error: errorHandler(err),
			});
		}
		let userId = user._id;
		Blog.find({ postedBy: userId })
			.populate("categories", "_id name slug")
			.populate("tags", "_id name slug")
			.populate("postedBy", "_id name username")
			.select("_id title slug postedBy photos createdAt updatedAt")
			.exec((err, data) => {
				if (err) {
					return res.status(400).json({
						error: errorHandler(err),
					});
				}
				res.json(data);
			});
	});
};
