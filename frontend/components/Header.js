import { useState } from "react";
import Link from "next/link";
import Router from "next/router";
import NProgress from "nprogress";
import { APP_NAME } from "../config";
import { signout, isAuth } from "../actions/auth";
import {
	Collapse,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	NavItem,
	NavLink,
	UncontrolledDropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
} from "reactstrap";
import Search from "./blog/Search";

Router.onRouteChangeStart = (url) => NProgress.start();
Router.onRouteChangeComplete = (url) => NProgress.done();
Router.onRouteChangeError = (url) => NProgress.done();

const Header = () => {
	const [collapsed, setCollapsed] = useState(true);

	const toggleNavbar = () => {
		setCollapsed(!collapsed);
	};

	const toggleDarkMode = () => {
		var element = document.body;
		element.classList.toggle("dark-mode");
	};

	return (
		<React.Fragment>
			<div className="nav-menu header" color="light" light>
				<ul className="nav nav-tabs nav-bar">
					<li className="nav-item">
						<Link href="/">
							<NavLink className="font-weight-bold">{APP_NAME}</NavLink>
						</Link>
					</li>
					<Search />
					<div className="header-links">
						<li className="nav-item">
							<Link href="/blogs">
								<NavLink>Blogs</NavLink>
							</Link>
						</li>
						<li className="nav-item">
							<Link href="/contact">
								<NavLink>Contact</NavLink>
							</Link>
						</li>
						{!isAuth() && (
							<React.Fragment>
								<li className="nav-item">
									<Link href="/signin">
										<NavLink>Signin</NavLink>
									</Link>
								</li>
								<li className="nav-item">
									<Link href="/signup">
										<NavLink>Signup</NavLink>
									</Link>
								</li>
							</React.Fragment>
						)}

						<li className="nav-item">
							<Link href="/user/crud/blog">
								<NavLink className="nav-item">Contribute</NavLink>
							</Link>
						</li>
						{isAuth() && isAuth().role === 0 && (
							<li className="nav-item">
								<Link href="/user">
									<NavLink>{`${isAuth().name}'s Dashboard`}</NavLink>
								</Link>
							</li>
						)}

						{isAuth() && isAuth().role === 1 && (
							<li className="nav-item">
								<Link href="/admin">
									<NavLink>{`${isAuth().name}'s Dashboard`}</NavLink>
								</Link>
							</li>
						)}

						{isAuth() && (
							<li className="nav-item">
								<NavLink
									style={{ cursor: "pointer" }}
									onClick={() => signout(() => Router.replace(`/signin`))}>
									Signout
								</NavLink>
							</li>
						)}
					</div>
				</ul>
				{/* <NavbarToggler onClick={toggleNavbar} className="mr-2" />
				<Collapse isOpen={!collapsed} navbar>
					<Nav className="ml-auto" navbar>
						<Search />
						<React.Fragment>
							<NavItem>
								<Link href="/blogs">
									<NavLink>Blogs</NavLink>
								</Link>
							</NavItem>

							<NavItem>
								<Link href="/contact">
									<NavLink>Contact</NavLink>
								</Link>
							</NavItem>
						</React.Fragment>

						{!isAuth() && (
							<React.Fragment>
								<NavItem>
									<Link href="/signin">
										<NavLink>Signin</NavLink>
									</Link>
								</NavItem>
								<NavItem>
									<Link href="/signup">
										<NavLink>Signup</NavLink>
									</Link>
								</NavItem>
							</React.Fragment>
						)}

						{isAuth() && isAuth().role === 0 && (
							<NavItem>
								<Link href="/user">
									<NavLink>{`${isAuth().name}'s Dashboard`}</NavLink>
								</Link>
							</NavItem>
						)}

						{isAuth() && isAuth().role === 1 && (
							<NavItem>
								<Link href="/admin">
									<NavLink>{`${isAuth().name}'s Dashboard`}</NavLink>
								</Link>
							</NavItem>
						)}

						{isAuth() && (
							<NavItem>
								<NavLink
									style={{ cursor: "pointer" }}
									onClick={() => signout(() => Router.replace(`/signin`))}>
									Signout
								</NavLink>
							</NavItem>
						)}

						<NavItem>
							<Link href="/user/crud/blog">
								<NavLink className="btn btn-primary text-light">
									Write a blog
								</NavLink>
							</Link>
						</NavItem>
					</Nav>
				</Collapse> */}
			</div>
		</React.Fragment>
	);
};

export default Header;
