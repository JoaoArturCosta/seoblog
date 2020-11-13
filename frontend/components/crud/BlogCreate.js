import Link from "next/link";
import { useState, useEffect } from "react";
import Router from "next/router";
import dynamic from "next/dynamic";
import { withRouter } from "next/router";
import { getCookie, isAuth } from "../../actions/auth";
import { getCategories } from "../../actions/category";
import { getTags } from "../../actions/tag";
import { createBlog } from "../../actions/blog";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import { QuillModules, QuillFormats } from "../../helpers/quill";

const CreateBlog = ({ router }) => {
	const blogFromLS = () => {
		if (typeof window === "undefined") {
			return false;
		}

		if (localStorage.getItem("blog")) {
			return JSON.parse(localStorage.getItem("blog"));
		} else {
			return false;
		}
	};

	const [categories, setCategories] = useState([]);
	const [tags, setTags] = useState([]);

	const [checked, setChecked] = useState([]); // categories
	const [checkedTag, setCheckedTag] = useState([]); // tags

	const [body, setBody] = useState(blogFromLS());
	const [values, setValues] = useState({
		error: "",
		sizeError: "",
		success: "",
		formData: "",
		title: "",
		description: "",
		location: "",
		distance: "",
		dificulty: "",
		duration: "",
		cost: "",
		altitude: "",
		elevationGain: "",
		routeType: "",
		traffic: "",
		dogFriendly: "",
		kidsFriendly: "",
		bugs: "",
		signal: "",
		fitnessLevel: "",
		visa: "",
		weatherDay: "",
		weatherNight: "",
		openAllYear: "",
		openFrom: "",
		priorBooking: "",
		activities: "",
		bestSeason: "",
		bestSeasonDescription: "",
		hostels: "",
		hotels: "",
		camping: "",
		hostelPrice: "",
		hotelPrice: "",
		campingPrice: "",
		startingPoint: "",
		endingPoint: "",
		directions: "",
		reachingDifficulty: "",
		transportation: "",
		parking: "",
		individualCost: "",
		guidedCost: "",
		notes: "",
		status: "",
		hidePublishButton: false,
	});

	const {
		error,
		sizeError,
		success,
		formData,
		title,
		description,
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
		status,
		hidePublishButton,
	} = values;
	const token = getCookie("token");

	useEffect(() => {
		setValues({ ...values, formData: new FormData() });
		initCategories();
		initTags();
	}, [router]);

	const initCategories = () => {
		getCategories().then((data) => {
			if (data.error) {
				setValues({ ...values, error: data.error });
			} else {
				setCategories(data);
			}
		});
	};

	const initTags = () => {
		getTags().then((data) => {
			if (data.error) {
				setValues({ ...values, error: data.error });
			} else {
				setTags(data);
			}
		});
	};

	const publishBlog = (e) => {
		e.preventDefault();
		// console.log('ready to publishBlog');
		console.log(values);
		console.log(JSON.stringify(formData));
		createBlog(formData, token).then((data) => {
			if (data.error) {
				setValues({ ...values, error: data.error });
			} else {
				setValues({
					...values,
					title: "",
					error: "",
					success: `A new blog titled "${data.title}" is created`,
				});
				setBody("");
				setCategories([]);
				setTags([]);
			}
		});
	};

	const handleChange = (name) => (e) => {
		console.log(name);
		const value = name === "photo" ? e.target.files : e.target.value;
		console.log(value);
		if (name === "photo") {
			console.log("here");
			for (let i = 0; i < value.length; i++) {
				formData.append("photo", value[i]);
				setValues({ ...values, [name]: value, formData, error: "" });
			}
		} else {
			formData.set(name, value);
			setValues({ ...values, [name]: value, formData, error: "" });
		}
	};

	// const handleChange = (name) => (e) => {
	// 	const value = name === "photo" ? e.target.files[0] : e.target.value;
	// 	setBody(formData);
	// 	formData.set(name, value);
	// 	setValues({ ...values, [name]: value, formData, error: "" });
	// 	console.log(formData);
	// 	if (typeof window !== "undefined") {
	// 		localStorage.setItem("blog", JSON.stringify(formData));
	// 	}
	// };

	const handleToggle = (c) => () => {
		setValues({ ...values, error: "" });
		// return the first index or -1
		const clickedCategory = checked.indexOf(c);
		const all = [...checked];

		if (clickedCategory === -1) {
			all.push(c);
		} else {
			all.splice(clickedCategory, 1);
		}
		setChecked(all);
		formData.set("categories", all);
	};

	const handleTagsToggle = (t) => () => {
		setValues({ ...values, error: "" });
		// return the first index or -1
		const clickedTag = checked.indexOf(t);
		const all = [...checkedTag];

		if (clickedTag === -1) {
			all.push(t);
		} else {
			all.splice(clickedTag, 1);
		}
		console.log(all);
		setCheckedTag(all);
		formData.set("tags", all);
	};

	const showCategories = () => {
		return (
			categories &&
			categories.map((c, i) => (
				<li key={i} className="list-unstyled">
					<input
						onChange={handleToggle(c._id)}
						type="checkbox"
						className="mr-2"
					/>
					<label className="form-check-label">{c.name}</label>
				</li>
			))
		);
	};

	const showTags = () => {
		return (
			tags &&
			tags.map((t, i) => (
				<li key={i} className="list-unstyled">
					<input
						onChange={handleTagsToggle(t._id)}
						type="checkbox"
						className="mr-2"
					/>
					<label className="form-check-label">{t.name}</label>
				</li>
			))
		);
	};

	const showError = () => (
		<div
			className="alert alert-danger"
			style={{ display: error ? "" : "none" }}>
			{error}
		</div>
	);

	const showSuccess = () => (
		<div
			className="alert alert-success"
			style={{ display: success ? "" : "none" }}>
			{success}
		</div>
	);

	const createBlogForm = () => {
		return (
			<form onSubmit={publishBlog}>
				<div className="form-group">
					<label className="text-muted">Title</label>
					<input
						type="text"
						className="form-control"
						value={title}
						onChange={handleChange("title")}
					/>
				</div>

				<div className="form-group">
					<label className="text-muted">Description</label>
					<input
						type="text"
						className="form-control"
						value={description}
						onChange={handleChange("description")}
					/>
				</div>
				<div className="form-group">
					<label className="text-muted">Location</label>
					<input
						type="text"
						className="form-control"
						value={location}
						onChange={handleChange("location")}
					/>
				</div>
				<div className="form-group">
					<label className="text-muted">Distance</label>
					<input
						type="text"
						className="form-control"
						value={distance}
						onChange={handleChange("distance")}
					/>
				</div>
				<div className="form-group">
					<label className="text-muted">Difficulty</label>
					<input
						type="text"
						className="form-control"
						value={dificulty}
						onChange={handleChange("dificulty")}
					/>
				</div>
				<div className="form-group">
					<label className="text-muted">Duration</label>
					<input
						type="text"
						className="form-control"
						value={duration}
						onChange={handleChange("duration")}
					/>
				</div>
				<div className="form-group">
					<label className="text-muted">Cost</label>
					<input
						type="text"
						className="form-control"
						value={cost}
						onChange={handleChange("cost")}
					/>
				</div>
				<div className="form-group">
					<label className="text-muted">Altitude</label>
					<input
						type="text"
						className="form-control"
						value={altitude}
						onChange={handleChange("altitude")}
					/>
				</div>
				<div className="form-group">
					<label className="text-muted">Elevation Gain</label>
					<input
						type="text"
						className="form-control"
						value={elevationGain}
						onChange={handleChange("elevationGain")}
					/>
				</div>
				<div className="form-group">
					<label className="text-muted">Route Type</label>
					<input
						type="text"
						className="form-control"
						value={routeType}
						onChange={handleChange("routeType")}
					/>
				</div>
				<div className="form-group">
					<label className="text-muted">Traffic</label>
					<input
						type="text"
						className="form-control"
						value={traffic}
						onChange={handleChange("traffic")}
					/>
				</div>
				<div className="form-group">
					<label className="text-muted">Dog Friendly</label>
					<input
						type="text"
						className="form-control"
						value={dogFriendly}
						onChange={handleChange("dogFriendly")}
					/>
				</div>
				<div className="form-group">
					<label className="text-muted">Kids Friendly</label>
					<input
						type="text"
						className="form-control"
						value={kidsFriendly}
						onChange={handleChange("kidsFriendly")}
					/>
				</div>
				<div className="form-group">
					<label className="text-muted">Bugs</label>
					<input
						type="text"
						className="form-control"
						value={bugs}
						onChange={handleChange("bugs")}
					/>
				</div>
				<div className="form-group">
					<label className="text-muted">Signal</label>
					<input
						type="text"
						className="form-control"
						value={signal}
						onChange={handleChange("signal")}
					/>
				</div>
				<div className="form-group">
					<label className="text-muted">Fitness Level</label>
					<input
						type="text"
						className="form-control"
						value={fitnessLevel}
						onChange={handleChange("fitnessLevel")}
					/>
				</div>
				<div className="form-group">
					<label className="text-muted">Visa</label>
					<input
						type="text"
						className="form-control"
						value={visa}
						onChange={handleChange("visa")}
					/>
				</div>
				<div className="form-group">
					<label className="text-muted">Weather during day</label>
					<input
						type="text"
						className="form-control"
						value={weatherDay}
						onChange={handleChange("weatherDay")}
					/>
				</div>
				<div className="form-group">
					<label className="text-muted">Weather at Night</label>
					<input
						type="text"
						className="form-control"
						value={weatherNight}
						onChange={handleChange("weatherNight")}
					/>
				</div>
				<div className="form-group">
					<label className="text-muted">Open All Year</label>
					<input
						type="text"
						className="form-control"
						value={openAllYear}
						onChange={handleChange("openAllYear")}
					/>
				</div>
				<div className="form-group">
					<label className="text-muted">Open From</label>
					<input
						type="text"
						className="form-control"
						value={openFrom}
						onChange={handleChange("openFrom")}
					/>
				</div>
				<div className="form-group">
					<label className="text-muted">Book in Advance</label>
					<input
						type="text"
						className="form-control"
						value={priorBooking}
						onChange={handleChange("priorBooking")}
					/>
				</div>
				<div className="form-group">
					<label className="text-muted">Description</label>
					<input
						type="text"
						className="form-control"
						value={description}
						onChange={handleChange("description")}
					/>
				</div>
				<div className="form-group">
					<label className="text-muted">Activities</label>
					<input
						type="text"
						className="form-control"
						value={activities}
						onChange={handleChange("activities")}
					/>
				</div>
				<div className="form-group">
					<label className="text-muted">Best Season</label>
					<input
						type="text"
						className="form-control"
						value={bestSeason}
						onChange={handleChange("bestSeason")}
					/>
				</div>
				<div className="form-group">
					<label className="text-muted">Best Season Description</label>
					<input
						type="text"
						className="form-control"
						value={bestSeasonDescription}
						onChange={handleChange("bestSeasonDescription")}
					/>
				</div>
				<div className="form-group">
					<label className="text-muted">Hostels</label>
					<input
						type="text"
						className="form-control"
						value={hostels}
						onChange={handleChange("hostels")}
					/>
				</div>
				<div className="form-group">
					<label className="text-muted">Hotels</label>
					<input
						type="text"
						className="form-control"
						value={hotels}
						onChange={handleChange("hotels")}
					/>
				</div>
				<div className="form-group">
					<label className="text-muted">Camping</label>
					<input
						type="text"
						className="form-control"
						value={camping}
						onChange={handleChange("camping")}
					/>
				</div>
				<div className="form-group">
					<label className="text-muted">Hostel Price</label>
					<input
						type="text"
						className="form-control"
						value={hostelPrice}
						onChange={handleChange("hostelPrice")}
					/>
				</div>
				<div className="form-group">
					<label className="text-muted">Hotel Price</label>
					<input
						type="text"
						className="form-control"
						value={hotelPrice}
						onChange={handleChange("hotelPrice")}
					/>
				</div>
				<div className="form-group">
					<label className="text-muted">Camping Price</label>
					<input
						type="text"
						className="form-control"
						value={campingPrice}
						onChange={handleChange("campingPrice")}
					/>
				</div>
				<div className="form-group">
					<label className="text-muted">Starting Point</label>
					<input
						type="text"
						className="form-control"
						value={startingPoint}
						onChange={handleChange("startingPoint")}
					/>
				</div>
				<div className="form-group">
					<label className="text-muted">Ending Point</label>
					<input
						type="text"
						className="form-control"
						value={endingPoint}
						onChange={handleChange("endingPoint")}
					/>
				</div>
				<div className="form-group">
					<label className="text-muted">Directions</label>
					<input
						type="text"
						className="form-control"
						value={directions}
						onChange={handleChange("directions")}
					/>
				</div>
				<div className="form-group">
					<label className="text-muted">Reaching Difficulty</label>
					<input
						type="text"
						className="form-control"
						value={reachingDifficulty}
						onChange={handleChange("reachingDifficulty")}
					/>
				</div>
				<div className="form-group">
					<label className="text-muted">Transportation</label>
					<input
						type="text"
						className="form-control"
						value={transportation}
						onChange={handleChange("transportation")}
					/>
				</div>
				<div className="form-group">
					<label className="text-muted">Parking</label>
					<input
						type="text"
						className="form-control"
						value={parking}
						onChange={handleChange("parking")}
					/>
				</div>
				<div className="form-group">
					<label className="text-muted">Individual Cost</label>
					<input
						type="text"
						className="form-control"
						value={individualCost}
						onChange={handleChange("individualCost")}
					/>
				</div>
				<div className="form-group">
					<label className="text-muted">Guided Cost</label>
					<input
						type="text"
						className="form-control"
						value={guidedCost}
						onChange={handleChange("guidedCost")}
					/>
				</div>
				<div className="form-group">
					<label className="text-muted">Notes</label>
					<input
						type="text"
						className="form-control"
						value={notes}
						onChange={handleChange("notes")}
					/>
				</div>
				{/* <div className="form-group">
					<input
						type="text"
						className="form-control"
						value={status}
						onChange={handleChange("status")}
					/>
				</div> */}

				<div>
					<button type="submit" className="btn btn-primary">
						Publish
					</button>
				</div>
			</form>
		);
	};

	return (
		<div className="container-fluid pb-5">
			<div className="row">
				<div className="col-md-8">
					{createBlogForm()}
					<div className="pt-3">
						{showError()}
						{showSuccess()}
					</div>
				</div>

				<div className="col-md-4">
					<div>
						<div className="form-group pb-2">
							<h5>Featured image</h5>
							<hr />

							<small className="text-muted">Max size: 1mb</small>
							<br />
							<label className="btn btn-outline-info">
								Upload featured image
								<input
									onChange={handleChange("photo")}
									type="file"
									accept="image/*"
									multiple
								/>
							</label>
						</div>
					</div>
					<div>
						<h5>Categories</h5>
						<hr />

						<ul style={{ maxHeight: "200px", overflowY: "scroll" }}>
							{showCategories()}
						</ul>
					</div>
					<div>
						<h5>Tags</h5>
						<hr />
						<ul style={{ maxHeight: "200px", overflowY: "scroll" }}>
							{showTags()}
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
};

export default withRouter(CreateBlog);
