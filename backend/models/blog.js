const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const blogSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			trim: true,
			min: 3,
			max: 160,
			required: true,
		},
		slug: {
			type: String,
			unique: true,
			index: true,
		},
		location: {
			type: String,
		},
		distance: {
			type: String,
		},
		dificulty: {
			type: String,
		},
		duration: {
			type: String,
		},
		cost: {
			type: String,
		},
		altitude: {
			type: String,
		},
		elevationGain: {
			type: String,
		},
		routeType: {
			type: String,
		},
		traffic: {
			type: String,
		},
		dogFriendly: {
			type: String,
		},
		kidsFriendly: {
			type: String,
		},
		bugs: {
			type: String,
		},
		signal: {
			type: String,
		},
		fitnessLevel: {
			type: String,
		},
		visa: {
			type: String,
		},
		weatherDay: {
			type: String,
		},
		weatherNight: {
			type: String,
		},
		openAllYear: {
			type: String,
		},
		openFrom: {
			type: String,
		},
		priorBooking: {
			type: String,
		},
		description: {
			type: String,
		},
		activities: {
			type: String,
		},
		bestSeason: {
			type: String,
		},
		bestSeasonDescription: {
			type: String,
		},
		hostels: {
			type: String,
		},
		hotels: {
			type: String,
		},
		camping: {
			type: String,
		},
		hostelPrice: {
			type: String,
		},
		hotelPrice: {
			type: String,
		},
		campingPrice: {
			type: String,
		},
		startingPoint: {
			type: String,
		},
		endingPoint: {
			type: String,
		},
		directions: {
			type: String,
		},
		reachingDifficulty: {
			type: String,
		},
		transportation: {
			type: String,
		},
		parking: {
			type: String,
		},
		individualCost: {
			type: String,
		},
		guidedCost: {
			type: String,
		},
		notes: {
			type: String,
		},
		excerpt: {
			type: String,
			max: 1000,
		},
		mtitle: {
			type: String,
		},
		mdesc: {
			type: String,
		},
		status: {
			type: Number,
			default: 0,
		},
		photos: [
			{
				type: String,
				required: true,
			},
		],
		categories: [{ type: ObjectId, ref: "Category", required: true }],
		tags: [{ type: ObjectId, ref: "Tag", required: true }],
		postedBy: {
			type: ObjectId,
			ref: "User",
		},
	},
	{ timestamp: true }
);

module.exports = mongoose.model("Blog", blogSchema);
