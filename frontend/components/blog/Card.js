import Link from "next/link";
import renderHTML from "react-render-html";
import moment from "moment";
import { API } from "../../config";

const Card = ({ blog }) => {
	const showBlogCategories = (blog) =>
		blog.categories.map((c, i) => (
			<Link key={i} href={`/categories/${c.slug}`}>
				<a className="btn card-overlay-tr">{c.name}</a>
			</Link>
		));

	const showBlogTags = (blog) =>
		blog.tags.map((t, i) => (
			<Link key={i} href={`/tags/${t.slug}`}>
				<a className="btn list-wrapper-tag">{t.name}</a>
			</Link>
		));

	return (
		<React.Fragment>
			<div className="list-item-card">
				<div className="list-item-wrapper">
					<Link href={`/blogs/${blog.slug}`}>
						<a>
							<img
<<<<<<< HEAD
								src={`http://localhost:8000/${blog.photos[0]}`}
=======
								src={`${API}/blog/photo/${blog.slug}`}
>>>>>>> a9ba29db8db282aede6123054cd12a4d1bc5e9c3
								alt=""
								className="list-item-picture"
							/>
							<h6>location</h6>
							<header>
								<h4 className="">{blog.title}</h4>
							</header>

							{showBlogTags(blog)}
							<p
								className="mark ml-1 pt-2 pb-2"
								style={{ visibility: "hidden" }}>
								Written by
								<Link href={`/profile/${blog.postedBy.username}`}>
									<a>{blog.postedBy.username}</a>
								</Link>{" "}
								| Published {moment(blog.updatedAt).fromNow()}
							</p>
							<div className="card-overlay">{showBlogCategories(blog)}</div>

							<section style={{ visibility: "hidden" }}>
								<div className="pb-3">{renderHTML(blog.excerpt)}</div>
							</section>
						</a>
					</Link>
				</div>

				{/* <section>
                        <p className="mark ml-1 pt-2 pb-2">
                            Written by
                            <Link href={`/profile/${blog.postedBy.username}`}>
                                <a>{blog.postedBy.username}</a>
                            </Link>{" "}
                            | Published {moment(blog.updatedAt).fromNow()}
                        </p>
                    </section>
                    <section>
                        
                        <br />
                        <br />
                    </section>

                    <div className="row">
                        <div className="col-md-4">
                            <section>
                                <img
                                    className="img img-fluid"
                                    style={{ maxHeight: "150px", width: "auto" }}
                                    src={`${API}/blog/photo/${blog.slug}`}
                                    alt={blog.title}
                                />
                            </section>
                        </div>
                        <div className="col-md-8">
                            <section>
                                <div className="pb-3">{renderHTML(blog.excerpt)}</div>
                                <Link href={`/blogs/${blog.slug}`}>
                                    <a className="btn btn-primary pt-2">Read more</a>
                                </Link>
                            </section>
                        </div>
                    </div> */}
			</div>
		</React.Fragment>
	);
};

export default Card;
