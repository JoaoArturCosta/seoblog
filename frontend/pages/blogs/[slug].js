import Head from "next/head";
import Link from "next/link";
import Layout from "../../components/Layout";
import { useState, useEffect } from "react";
import { singleBlog, listRelated } from "../../actions/blog";
import { API, DOMAIN, APP_NAME, FB_APP_ID } from "../../config";
import renderHTML from "react-render-html";
import moment from "moment";
import SmallCard from "../../components/blog/SmallCard";
import DisqusThread from "../../components/DisqusThread";
import Gallery from "../../components/blog/Gallery";
import { Link as ScrollLink, animateScroll as scroll } from "react-scroll";

const SingleBlog = ({ blog, query }) => {
	const [related, setRelated] = useState([]);
	const [hidden, setHidden] = React.useState(false);

	const loadRelated = () => {
		listRelated({ blog }).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setRelated(data);
			}
		});
	};

	useEffect(() => {
		loadRelated();
	}, []);

	const head = () => (
		<Head>
			<title>
				{blog.title} | {APP_NAME}
			</title>
			<meta name="description" content={blog.mdesc} />
			<link rel="canonical" href={`${DOMAIN}/blogs/${query.slug}`} />
			<meta property="og:title" content={`${blog.title}| ${APP_NAME}`} />
			<meta property="og:description" content={blog.mdesc} />
			<meta property="og:type" content="webiste" />
			<meta property="og:url" content={`${DOMAIN}/blogs/${query.slug}`} />
			<meta property="og:site_name" content={`${APP_NAME}`} />

			<meta property="og:image" content={`${API}/blog/photo/${blog.slug}`} />
			<meta
				property="og:image:secure_url"
				ccontent={`${API}/blog/photo/${blog.slug}`}
			/>
			<meta property="og:image:type" content="image/jpg" />
			<meta property="fb:app_id" content={`${FB_APP_ID}`} />
		</Head>
	);

	const showBlogCategories = (blog) =>
		blog.categories.map((c, i) => (
			<Link key={i} href={`/categories/${c.slug}`}>
				<a className="btn category mr-1 ml-1 mt-3">{c.name}</a>
			</Link>
		));

	const showBlogTags = (blog) =>
		blog.tags.map((t, i) => (
			<Link key={i} href={`/tags/${t.slug}`}>
				<a className="btn tag mr-1 ml-1 mt-3">{t.name}</a>
			</Link>
		));

	const showRelatedBlog = () => {
		return related.map((blog, i) => (
			<div className="col-md-4" key={i}>
				<article>
					<SmallCard blog={blog} />
				</article>
			</div>
		));
	};

	const showComments = () => {
		console.log(blog._id);
		return (
			<div>
				<DisqusThread
					id={blog._id}
					title={blog.title}
					path={`/blog/${blog.slug}`}
				/>
			</div>
		);
	};

	const hideBar = () => {
		// const { hidden } = {isHidden};

		window.scrollY > 100
			? !hidden && setHidden(true)
			: hidden && setHidden(false);
	};

	useEffect(() => {
		window.addEventListener("scroll", hideBar);
<<<<<<< HEAD
		console.log(blog);
=======
>>>>>>> a9ba29db8db282aede6123054cd12a4d1bc5e9c3
	});

	return (
		<React.Fragment>
			{head()}
			<Layout>
				<main>
					<article>
						<div className="app-wrapper">
							<section className="hero">
								<img
<<<<<<< HEAD
									// src={`${API}/blog/photo/${blog.slug}`}
									src={`http://localhost:8000/${blog.photos[0]}`}
									alt={blog.title}
									className="hero-img"
								/>
								<Gallery photos={blog.photos} />
=======
									src={`${API}/blog/photo/${blog.slug}`}
									alt={blog.title}
									className="hero-img"
								/>
								<Gallery slug={blog.slug} />
>>>>>>> a9ba29db8db282aede6123054cd12a4d1bc5e9c3
							</section>
							<div className="ExpandedView_Info">
								{hidden && (
									<div className="ExpandedView_NavAnchors_Container">
										<div className="ExpandedView_NavAnchors">
											<ul>
												<li style={{ color: "white" }}>
													<ScrollLink
														className="ExpandedView_NavAnchors_inactive"
														activeClass="ExpandedView_NavAnchors_active"
														to="overview"
														spy={true}
														smooth={true}
														offset={-70}
														duration={500}>
														Overview
													</ScrollLink>
												</li>
												<li>&bull;</li>
												<li>
													<ScrollLink
														className="ExpandedView_NavAnchors_inactive"
														activeClass="ExpandedView_NavAnchors_active"
														to="besttime"
														spy={true}
														smooth={true}
														offset={-70}
														duration={500}>
														Best Season
													</ScrollLink>
												</li>
												<li>&bull;</li>
												<li>
													<ScrollLink
														className="ExpandedView_NavAnchors_inactive"
														activeClass="ExpandedView_NavAnchors_active"
														to="accomodation"
														spy={true}
														smooth={true}
														offset={-70}
														duration={500}>
														Accomodation
													</ScrollLink>
												</li>
												<li>&bull;</li>
												<li>
													<ScrollLink
														className="ExpandedView_NavAnchors_inactive"
														activeClass="ExpandedView_NavAnchors_active"
														to="location"
														spy={true}
														smooth={true}
														offset={-70}
														duration={500}>
														Location
													</ScrollLink>
												</li>
												<li>&bull;</li>
												<li>
													<ScrollLink
														className="ExpandedView_NavAnchors_inactive"
														activeClass="ExpandedView_NavAnchors_active"
														to="cost"
														spy={true}
														smooth={true}
														offset={-70}
														duration={500}>
														Cost
													</ScrollLink>
												</li>
												<li>&bull;</li>
												<li>
													<ScrollLink
														className="ExpandedView_NavAnchors_inactive"
														activeClass="ExpandedView_NavAnchors_active"
														to="permits"
														spy={true}
														smooth={true}
														offset={-70}
														duration={500}>
														Permits
													</ScrollLink>
												</li>
												<li>&bull;</li>
												<li>
													<ScrollLink
														className="ExpandedView_NavAnchors_inactive"
														activeClass="ExpandedView_NavAnchors_active"
														to="notes"
														spy={true}
														smooth={true}
														offset={-70}
														duration={500}>
														Notes
													</ScrollLink>
												</li>
											</ul>
										</div>
									</div>
								)}

								<section id="overview" className="ExpandedView_Overview">
									<div className="ExpandedView_Overview_header_wrapper">
										<div className="ExpandedView_Overview_header_Title">
<<<<<<< HEAD
											<h2>{blog.name}</h2>
											<div className="ExpandedView_Location_wrapper">
												{blog.location}
=======
											{/* <h2>{location.state.data.name}</h2> */}
											<div className="ExpandedView_Location_wrapper">
												{/* {location.state.data.location} */}
>>>>>>> a9ba29db8db282aede6123054cd12a4d1bc5e9c3
											</div>
										</div>
										<div className="ExpandedView_Overview_Details">
											<div className="ExpandedView_Overview_Details_Icon">
												{/* <img
													src={require("../../static/images/icons/distance.png")}
													alt="Distance"
												/> */}
											</div>
											<div className="ExpandedView_Overview_Details_part">
<<<<<<< HEAD
												{/* {blog.distance} */}
=======
												{/* {location.state.data.distance} */}
>>>>>>> a9ba29db8db282aede6123054cd12a4d1bc5e9c3
											</div>
											<div className="ExpandedView_Overview_Details_Icon">
												{/* <img
													src={require("../../static/images/icons/trekking.png")}
													alt="Difficulty"
												/> */}
											</div>
											<div className="ExpandedView_Overview_Details_part">
<<<<<<< HEAD
												{blog.dificulty}
=======
												{/* {location.state.data.dificulty} */}
>>>>>>> a9ba29db8db282aede6123054cd12a4d1bc5e9c3
											</div>
											<div className="ExpandedView_Overview_Details_Icon">
												{/* <img
													src={require("../../static/images/icons/time.png")}
													alt="Duration"
												/> */}
											</div>
											<div className="ExpandedView_Overview_Details_part">
<<<<<<< HEAD
												{blog.duration}
=======
												{/* {location.state.data.duration} */}
>>>>>>> a9ba29db8db282aede6123054cd12a4d1bc5e9c3
											</div>
											<div className="ExpandedView_Overview_Details_Icon">
												{/* <img
													src={require("../../static/images/icons/money.png")}
													alt="Cost"
												/> */}
											</div>
											<div className="ExpandedView_Overview_Details_part">
<<<<<<< HEAD
												{blog.cost}
=======
												{/* {location.state.data.cost} */}
>>>>>>> a9ba29db8db282aede6123054cd12a4d1bc5e9c3
											</div>
										</div>
									</div>
									<hr className="style1" />
									<div className="ExpandedView_Overview_Details_Description">
										Tour Description:
<<<<<<< HEAD
										<p>{blog.description}</p>
=======
										{/* <p>{location.state.data.description}</p> */}
>>>>>>> a9ba29db8db282aede6123054cd12a4d1bc5e9c3
									</div>
									<hr className="style1" />
									<ul>
										<li>
											<div className="ExpandedView_Overview_DetailsList_Item">
												<div className="ExpandedView_Overview_DetailsList_Icon">
													{/* <img
														src={require("../../static/images/icons/map.png")}
														alt="RouteType"
													/> */}
												</div>
												<div className="ExpandedView_Overview_DetailsList_Info">
													<h4>Route Type</h4>
<<<<<<< HEAD
													{blog.routeType}
=======
													{/* {location.state.data.routeType} */}
>>>>>>> a9ba29db8db282aede6123054cd12a4d1bc5e9c3
												</div>
											</div>
										</li>
										<li>
											<div className="ExpandedView_Overview_DetailsList_Item">
												<div className="ExpandedView_Overview_DetailsList_Icon">
													{/* <img
														src={require("../../static/images/icons/increase.png")}
														alt="ElevationGain"
													/> */}
												</div>
												<div className="ExpandedView_Overview_DetailsList_Info">
													<h4>Elevation Gain</h4>
<<<<<<< HEAD
													{/* {blog.elevationGain} */}
=======
													{/* {location.state.data.elevationGain} */}
>>>>>>> a9ba29db8db282aede6123054cd12a4d1bc5e9c3
												</div>
											</div>
										</li>
										<li>
											<div className="ExpandedView_Overview_DetailsList_Item">
												<div className="ExpandedView_Overview_DetailsList_Icon">
													{/* <img
														src={require("../../static/images/icons/elevation.png")}
														alt="Altitude"
													/> */}
												</div>
												<div className="ExpandedView_Overview_DetailsList_Info">
													<h4>Altitude</h4>
<<<<<<< HEAD
													{/* {blog.altitude} */}
=======
													{/* {location.state.data.altitude} */}
>>>>>>> a9ba29db8db282aede6123054cd12a4d1bc5e9c3
												</div>
											</div>
										</li>
										<li>
											<div className="ExpandedView_Overview_DetailsList_Item">
												<div className="ExpandedView_Overview_DetailsList_Icon">
													{/* <img
														src={require("../../static/images/icons/cellSignal.png")}
														alt="CellSignal"
													/> */}
												</div>
												<div className="ExpandedView_Overview_DetailsList_Info">
													<h4>Cell Signal</h4>
<<<<<<< HEAD
													{blog.signal}
=======
													{/* {location.state.data.signal} */}
>>>>>>> a9ba29db8db282aede6123054cd12a4d1bc5e9c3
												</div>
											</div>
										</li>
										<li>
											<div className="ExpandedView_Overview_DetailsList_Item">
												<div className="ExpandedView_Overview_DetailsList_Icon">
													{/* <img
														src={require("../../static/images/icons/users.png")}
														alt="TrailTraffic"
													/> */}
												</div>
												<div className="ExpandedView_Overview_DetailsList_Info">
													<h4>Trail Traffic</h4>
<<<<<<< HEAD
													{/* {blog.traffic} */}
=======
													{/* {location.state.data.traffic} */}
>>>>>>> a9ba29db8db282aede6123054cd12a4d1bc5e9c3
												</div>
											</div>
										</li>
										<li>
											<div className="ExpandedView_Overview_DetailsList_Item">
												<div className="ExpandedView_Overview_DetailsList_Icon">
													{/* <img
														src={require("../../static/images/icons/dog.png")}
														alt="DogFriendly"
													/> */}
												</div>
												<div className="ExpandedView_Overview_DetailsList_Info">
													<h4>Dog Friendly</h4>
<<<<<<< HEAD
													{blog.dogFriendly}
=======
													{/* {location.state.data.dogFriendly} */}
>>>>>>> a9ba29db8db282aede6123054cd12a4d1bc5e9c3
												</div>
											</div>
										</li>
										<li>
											<div className="ExpandedView_Overview_DetailsList_Item">
												<div className="ExpandedView_Overview_DetailsList_Icon">
													{/* <img
														src={require("../../static/images/icons/kids.png")}
														alt="KidsFriendly"
													/> */}
												</div>
												<div className="ExpandedView_Overview_DetailsList_Info">
													<h4>Kids</h4>
<<<<<<< HEAD
													{blog.kidsFriendly}
=======
													{/* {location.state.data.kidsFriendly} */}
>>>>>>> a9ba29db8db282aede6123054cd12a4d1bc5e9c3
												</div>
											</div>
										</li>
										<li>
											<div className="ExpandedView_Overview_DetailsList_Item">
												<div className="ExpandedView_Overview_DetailsList_Icon">
													{/* <img
														src={require("../../static/images/icons/bug.png")}
														alt="Bugs"
													/> */}
												</div>
												<div className="ExpandedView_Overview_DetailsList_Info">
													<h4>Bugs</h4>
<<<<<<< HEAD
													{blog.bugs}
=======
													{/* {location.state.data.bugs} */}
>>>>>>> a9ba29db8db282aede6123054cd12a4d1bc5e9c3
												</div>
											</div>
										</li>
										<li>
											<div className="ExpandedView_Overview_DetailsList_Item">
												<div className="ExpandedView_Overview_DetailsList_Icon">
													{/* <img
														src={require("../../static/images/icons/fitness.png")}
														alt="FitnessLevel"
													/> */}
												</div>
												<div className="ExpandedView_Overview_DetailsList_Info">
													<h4>Fitness Level</h4>
<<<<<<< HEAD
													{blog.fitnessLevel}
=======
													{/* {location.state.data.fitnessLevel} */}
>>>>>>> a9ba29db8db282aede6123054cd12a4d1bc5e9c3
												</div>
											</div>
										</li>
										<li>
											<div className="ExpandedView_Overview_DetailsList_Item">
												<div className="ExpandedView_Overview_DetailsList_Icon">
													{/* <img
														src={require("../../static/images/icons/visa.png")}
														alt="Visa"
													/> */}
												</div>
												<div className="ExpandedView_Overview_DetailsList_Info">
													<h4>Visa</h4>
<<<<<<< HEAD
													{blog.visa}
=======
													{/* {location.state.data.visa} */}
>>>>>>> a9ba29db8db282aede6123054cd12a4d1bc5e9c3
												</div>
											</div>
										</li>
										<li>
											<div className="ExpandedView_Overview_DetailsList_Item">
												<div className="ExpandedView_Overview_DetailsList_Icon">
													{/* <img
														src={require("../../static/images/icons/mountain.png")}
														alt="Activities"
													/> */}
												</div>
												<div className="ExpandedView_Overview_DetailsList_Info">
													<h4>What to do</h4>
<<<<<<< HEAD
													{blog.activities}
=======
													{/* {location.state.data.activities} */}
>>>>>>> a9ba29db8db282aede6123054cd12a4d1bc5e9c3
												</div>
											</div>
										</li>
										<li>
											<div className="ExpandedView_Overview_DetailsList_Item">
												<div className="ExpandedView_Overview_DetailsList_Icon">
													{/* <img
														src={require("../../static/images/icons/ticket.png")}
														alt="Booking"
													/> */}
												</div>
												<div className="ExpandedView_Overview_DetailsList_Info">
													<h4>Book in advance</h4>
<<<<<<< HEAD
													{blog.priorBooking}
=======
													{/* {location.state.data.priorBooking} */}
>>>>>>> a9ba29db8db282aede6123054cd12a4d1bc5e9c3
												</div>
											</div>
										</li>
									</ul>
								</section>

								<section id="besttime" className="ExpandedView_BestTime">
									<hr class="style1" />
									<h3>Best Time to go</h3>
									<div className="ExpandedView_BestTime_Container">
										<div className="ExpandedView_BestTime_Container_Details">
											<div className="ExpandedView_BestTime_Container_Details_Item">
												<div className="ExpandedView_BestTime_DetailsList_Icon">
													{/* <img
														src={require("../../static/images/icons/calendar.png")}
														alt="BestMonths"
													/> */}
												</div>
												<div className="ExpandedView_Overview_DetailsList_Info">
													<h4>Best Months</h4>
<<<<<<< HEAD
													{blog.bestSeason}
=======
													{/* {location.state.data.bestSeason} */}
>>>>>>> a9ba29db8db282aede6123054cd12a4d1bc5e9c3
												</div>
											</div>
											<div className="ExpandedView_BestTime_Container_Details_Item">
												<div className="ExpandedView_BestTime_DetailsList_Icon">
													{/* <img
														src={require("../../static/images/icons/forbidden.png")}
														alt="Availability"
													/> */}
												</div>
												<div className="ExpandedView_Overview_DetailsList_Info">
													<h4>Open Season</h4>
<<<<<<< HEAD
													{blog.openSeason}
=======
													{/* {location.state.data.openSeason} */}
>>>>>>> a9ba29db8db282aede6123054cd12a4d1bc5e9c3
												</div>
											</div>
										</div>
										<div className="ExpandedView_BestTime_Container_Text">
<<<<<<< HEAD
											{blog.bestSeasonDescription}
=======
											{/* {location.state.data.bestSeasonDescription} */}
>>>>>>> a9ba29db8db282aede6123054cd12a4d1bc5e9c3
										</div>
									</div>
								</section>
								<section id="accomodation" className="Accomodation">
									<hr className="style1" />
									<h3>Accomodation</h3>
									<div className="ExpandedView_Accomodation_Container">
										<div className="ExpandedView_Accomodation_List_Table">
											<ul>
												<li>
													<div className="ExpandedView_Accomodation_List_Item">
														{/* <img
															src={require("../../static/images/icons/tent.png")}
															alt="Campsites"
														/> */}
														<h4>Campsites</h4>
<<<<<<< HEAD
														<p>{blog.camping}</p>
=======
														{/* <p>{location.state.data.camping}</p> */}
>>>>>>> a9ba29db8db282aede6123054cd12a4d1bc5e9c3
													</div>
												</li>
												<li>
													<div className="ExpandedView_Accomodation_List_Item">
														{/* <img
															src={require("../../static/images/icons/hostel.png")}
															alt="Hostels"
														/> */}
														<h4>Hostels</h4>
<<<<<<< HEAD
														<p>{blog.hostels}</p>
=======
														{/* <p>{location.state.data.hostels}</p> */}
>>>>>>> a9ba29db8db282aede6123054cd12a4d1bc5e9c3
													</div>
												</li>
												<li>
													<div className="ExpandedView_Accomodation_List_Item">
														{/* <img
															src={require("../../static/images/icons/hotel.png")}
															alt="Hotels"
														/> */}
														<h4>Hotels</h4>
<<<<<<< HEAD
														<p>{blog.hotels}</p>
=======
														{/* <p>{location.state.data.hotels}</p> */}
>>>>>>> a9ba29db8db282aede6123054cd12a4d1bc5e9c3
													</div>
												</li>
											</ul>
										</div>
									</div>
								</section>
								<section id="location" className="ExpandedView_Location">
									<hr className="style1" />
									<h3>Location</h3>
									<div className="ExpandedView_Location_Container">
										<div className="ExpandedView_Location_Topic">
											<h4>Starting Point:</h4>
<<<<<<< HEAD
											<p>{blog.startingPoint}</p>
										</div>
										<div className="ExpandedView_Location_Topic">
											<h4>Ending Point:</h4>
											<p>{blog.endingPoint}</p>
										</div>
										<div className="ExpandedView_Location_Topic">
											<h4>Get Directions:</h4>
											<p>{blog.directions}</p>
										</div>
										<div className="ExpandedView_Location_Topic">
											<h4>Parking:</h4>
											<p>{blog.parking}</p>
										</div>
										<div className="ExpandedView_Location_Topic_FullWidth">
											<h4>How to get there:</h4>
											<p>{blog.transportation}</p>
=======
											{/* <p>{location.state.data.startingPoint}</p> */}
										</div>
										<div className="ExpandedView_Location_Topic">
											<h4>Ending Point:</h4>
											{/* <p>{location.state.data.endingPoint}</p> */}
										</div>
										<div className="ExpandedView_Location_Topic">
											<h4>Get Directions:</h4>
											{/* <p>{location.state.data.directions}</p> */}
										</div>
										<div className="ExpandedView_Location_Topic">
											<h4>Parking:</h4>
											{/* <p>{location.state.data.parking}</p> */}
										</div>
										<div className="ExpandedView_Location_Topic_FullWidth">
											<h4>How to get there:</h4>
											{/* <p>{location.state.data.transportation}</p> */}
>>>>>>> a9ba29db8db282aede6123054cd12a4d1bc5e9c3
										</div>
									</div>
								</section>
								<section id="cost" className="ExpandedView_Cost">
									<hr className="style1" />
									<h3>Cost</h3>
									<div className="ExpandedView_Accomodation_Container">
										<div className="ExpandedView_Accomodation_List_Table">
											<ul>
												<li>
													<div className="ExpandedView_Accomodation_List_Item">
														{/* <img
															src={require("../../static/images/icons/trekking.png")}
															alt="Independent"
														/> */}
														<h4>Independent</h4>
<<<<<<< HEAD
														<p>{blog.individualCost}</p>
=======
														{/* <p>{location.state.data.individualCost}</p> */}
>>>>>>> a9ba29db8db282aede6123054cd12a4d1bc5e9c3
													</div>
												</li>
												<li>
													<div className="ExpandedView_Accomodation_List_Item">
														{/* <img
															src={require("../../static/images/icons/guide.png")}
															alt="Guided"
														/> */}
														<h4>Guided</h4>
<<<<<<< HEAD
														<p>{blog.guidedCost}</p>
=======
														{/* <p>{location.state.data.guidedCost}</p> */}
>>>>>>> a9ba29db8db282aede6123054cd12a4d1bc5e9c3
													</div>
												</li>
											</ul>
										</div>
									</div>
								</section>
								<section id="permits" className="ExpandedView_Permits">
									<hr className="style1" />
									<h3>Permits & Fees</h3>
									<div className="ExpandedView_Permits_Container">
<<<<<<< HEAD
										<p>{blog.permits}</p>
=======
										{/* <p>{location.state.data.permits}</p> */}
>>>>>>> a9ba29db8db282aede6123054cd12a4d1bc5e9c3
									</div>
								</section>
								<section id="notes" className="ExpandedView_Notes">
									<hr className="style1" />
									<h3>Notes</h3>
									<div className="ExpandedView_Notes_Container">
<<<<<<< HEAD
										<p>{blog.notes}</p>
									</div>
								</section>
							</div>
							{/* <section>
=======
										{/* <p>{location.state.data.notes}</p> */}
									</div>
								</section>
							</div>
							<section>
>>>>>>> a9ba29db8db282aede6123054cd12a4d1bc5e9c3
								<div className="container">
									<h1 className="display-2 pb-3 pt-3 text-center font-weight-bold">
										{blog.title}
									</h1>
									<p className="lead mt-3 mark">
										Written by{" "}
										<Link href={`/profile/${blog.postedBy.username}`}>
											<a>{blog.postedBy.username}</a>
										</Link>{" "}
										| Published {moment(blog.updatedAt).fromNow()}
									</p>

									<div className="pb-3">
										{showBlogCategories(blog)}
										{showBlogTags(blog)}
										<br />
										<br />
									</div>
								</div>
<<<<<<< HEAD
							</section> */}
						</div>

						{/* <div className="container">
							<section>
								<div className="col-md-12 lead">{renderHTML(blog.body)}</div>
							</section>
						</div> */}
=======
							</section>
						</div>

						<div className="container">
							<section>
								<div className="col-md-12 lead">{renderHTML(blog.body)}</div>
							</section>
						</div>
>>>>>>> a9ba29db8db282aede6123054cd12a4d1bc5e9c3

						<div className="container">
							<h4 className="text-center pt-5 pb-5 h2">Related blogs</h4>
							<div className="row">{showRelatedBlog()}</div>
						</div>

						<div className="container pt-5 pb-5">{showComments()}</div>
					</article>
				</main>
			</Layout>
		</React.Fragment>
	);
};

SingleBlog.getInitialProps = ({ query }) => {
	return singleBlog(query.slug).then((data) => {
<<<<<<< HEAD
		console.log(data);
=======
>>>>>>> a9ba29db8db282aede6123054cd12a4d1bc5e9c3
		if (data.error) {
			console.log(data.error);
		} else {
			// console.log('GET INITIAL PROPS IN SINGLE BLOG', data);
<<<<<<< HEAD
			console.log(data);
=======
>>>>>>> a9ba29db8db282aede6123054cd12a4d1bc5e9c3
			return { blog: data, query };
		}
	});
};

export default SingleBlog;
