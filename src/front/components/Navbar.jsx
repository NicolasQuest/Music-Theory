import { Link } from "react-router-dom";

export const Navbar = () => {

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">Home</span>
				</Link>

				<Link to="/Register">
					<span className="navbar-brand mb-0 h1">Register</span>
				</Link>

				<Link to="/Login">
					<span className="navbar-brand mb-0 h1">Login</span>
				</Link>
			</div>
		</nav>
	);
};