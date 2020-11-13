import Head from "next/head";
import Link from "next/link";
import { withRouter } from "next/router";
import Layout from "../../components/Layout";
import { useState } from "react";
import { listBlogsWithCategoriesAndTags } from "../../actions/blog";
import Card from "../../components/blog/Card";
import { API, DOMAIN, APP_NAME, FB_APP_ID } from "../../config";

const Blogs = ({
	blogs,
	categories,
	tags,
	totalBlogs,
	blogsLimit,
	blogSkip,
	router,
}) => {
	const head = () => (
		<Head>
			<title>Programming blogs | {APP_NAME}</title>
			<meta
				name="description"
				content="Programming blogs and tutorials on react node next vue php laravel and web developoment"
			/>
			<link rel="canonical" href={`${DOMAIN}${router.pathname}`} />
			<meta
				property="og:title"
				content={`Latest web developoment tutorials | ${APP_NAME}`}
			/>
			<meta
				property="og:description"
				content="Programming blogs and tutorials on react node next vue php laravel and web developoment"
			/>
			<meta property="og:type" content="website" />
			<meta property="og:url" content={`${DOMAIN}${router.pathname}`} />
			<meta property="og:site_name" content={`${APP_NAME}`} />

			<meta
				property="og:image"
				content={`${DOMAIN}/static/images/seoblog.jpg`}
			/>
			<meta
				property="og:image:secure_url"
				content={`${DOMAIN}/static/images/seoblog.jpg`}
			/>
			<meta property="og:image:type" content="image/jpg" />
			<meta property="fb:app_id" content={`${FB_APP_ID}`} />
		</Head>
	);

	const [limit, setLimit] = useState(blogsLimit);
	const [skip, setSkip] = useState(0);
	const [size, setSize] = useState(totalBlogs);
	const [loadedBlogs, setLoadedBlogs] = useState([]);

	const loadMore = () => {
		let toSkip = skip + limit;
		listBlogsWithCategoriesAndTags(toSkip, limit).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setLoadedBlogs([...loadedBlogs, ...data.blogs]);
				setSize(data.size);
				setSkip(toSkip);
			}
		});
	};

	const loadMoreButton = () => {
		return (
			size > 0 &&
<<<<<<< HEAD
			size >= 0 && (
				<button
					onClick={loadMore}
					className="btn btn-outline-primary btn-lg btn-load-more">
					Load more
=======
			size >= limit && (
				<button onClick={loadMore} className="btn btn-outline-primary btn-lg">
					Load mmore
>>>>>>> a9ba29db8db282aede6123054cd12a4d1bc5e9c3
				</button>
			)
		);
	};

	const showAllBlogs = () => {
		return blogs.map((blog, i) => {
			// ()
			return (
				<article className="list-item" key={i}>
					<Card blog={blog} />
					<hr />
				</article>
			);
		});
	};

	const showAllCategories = () => {
		return categories.map((c, i) => (
			<Link href={`/categories/${c.slug}`} key={i}>
				<a className="btn mr-1 ml-1 mt-3 category">{c.name}</a>
			</Link>
		));
	};

	const showAllTags = () => {
		return tags.map((t, i) => (
			<Link href={`/tags/${t.slug}`} key={i}>
				<a className="btn mr-1 ml-1 mt-1 tag">{t.name}</a>
			</Link>
		));
	};

	const showLoadedBlogs = () => {
		return loadedBlogs.map((blog, i) => (
			<article className="list-item" key={i}>
				<Card blog={blog} />
			</article>
		));
	};

	return (
		<React.Fragment>
			{head()}
			<Layout>
				<React.Fragment>
					<main className="app-wrapper">
						<div className="hero">
							<img
								src="../static/images/Moncorvo.png"
								alt=""
								className="hero-img"
							/>
							<header>
								<div className="hero-title">
									<h1 className="">Programming blogs and tutorials</h1>
									<h5>subtitle</h5>
								</div>
							</header>
						</div>
						<section className="home-categories-tags">
							<div>
								{showAllCategories()}
								<br />
								{showAllTags()}
							</div>
						</section>
						<section className="list-wrapper">
							<div className="list-container">
								{showAllBlogs()}
								<div className="container-fluid">{showLoadedBlogs()}</div>
							</div>

							<div className="text-center pt-5 pb-5">{loadMoreButton()}</div>
						</section>
					</main>
				</React.Fragment>
			</Layout>
		</React.Fragment>
	);
};

Blogs.getInitialProps = () => {
	let skip = 0;
<<<<<<< HEAD
	let limit = 10;
=======
	let limit = 2;
>>>>>>> a9ba29db8db282aede6123054cd12a4d1bc5e9c3
	return listBlogsWithCategoriesAndTags(skip, limit).then((data) => {
		if (data.error) {
			console.log(data.error);
		} else {
			return {
				blogs: data.blogs,
				categories: data.categories,
				tags: data.tags,
				totalBlogs: data.size,
				blogsLimit: limit,
				blogSkip: skip,
			};
		}
	});
};

export default withRouter(Blogs);
