import { Link } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../hooks/ThemeContext";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { useNavigate } from "react-router"
import Swal from 'sweetalert2';

export const Navbar = () => {
	const { darkMode, toggleTheme } = useContext(ThemeContext);

	const { store, dispatch } = useGlobalReducer();
	const token = store.token;
	const navigate = useNavigate();
	const isAuth = () => store.isAuthenticated ? "🟢" : "🔴";
	return (
		token ? (
			<nav className={`navbar navbar-expand-lg ${darkMode ? "bg-dark" : "light"}`}>
				< div className="container-fluid px-5 py-1">
					<Link to="/" className="text-decoration-none">
						<span className={`navbar-brand mb-0 h1 ${darkMode ? "text-white" : "text-dark"}`}>
							Home
						</span>
					</Link>

					<button
						className="navbar-toggler"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#navbarNavAltMarkup"
						aria-controls="navbarNavAltMarkup"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<span className="navbar-toggler-icon"></span>
					</button>

					<div className="collapse navbar-collapse" id="navbarNavAltMarkup">
						<div className="ms-auto d-flex align-items-center gap-3">
							<button
								onClick={toggleTheme}
								className={`btn ${darkMode ? "text-white" : ""} `}
							>
								<i className="bi bi-brightness-high"></i>
							</button>

							<div className={`${darkMode ? "navborder-light" : "navborder-dark"}`}>
								<span
									onClick={() => {
										Swal.fire({
											title: `username: ${store.user}
											email: ${store.email}
											is authenticated: ${isAuth()}`,

											width: 600,
											padding: "3em",
											color: "red",
											background: " url('https://bajoeleary.wordpress.com/wp-content/uploads/2018/11/music-gif.gif')",
											backdrop: `rgba(0,0,123,0.4) url('https://bajoeleary.wordpress.com/wp-content/uploads/2018/11/music-gif.gif') center no-repeat`
										});
									}}
									className="badge d-flex align-items-center p-1 pe-2 ms-3 text-dark-emphasis bg-dark-subtle border border-dark-subtle rounded-pill"
								>
									<img
										className="rounded-circle me-1"
										width="24"
										height="24"
										src="https://t3.ftcdn.net/jpg/04/64/95/10/360_F_464951053_r0DHbg7kOgOkZ7GaWEMpRPJ0LC5oWMJi.jpg"
										alt=""
									/>
									nico
								</span>
							</div>


							<button
								className="btn btn-danger text-decoration-none"
								onClick={() =>
									Swal.fire({
										title: "Tan rápido te vas?",
										text: ":(",
										icon: "warning",
										showCancelButton: true,
										cancelButtonText: "No",
										confirmButtonColor: "#3085d6",
										cancelButtonColor: "#d33",
										confirmButtonText: "Sí, quiero salir"
									}).then((result) => {
										if (result.isConfirmed) {
											Swal.fire({
												title: "Nos vemos pronto!",
												text: "Adios",
												icon: "success",
												timer: 1500,
												showConfirmButton: false,
												willClose: () => {
													localStorage.removeItem("token");
													localStorage.removeItem("username");
													dispatch({ type: "logout" });
													navigate("/");
												}
											});
										}
									})
								}
							>
								Salir
							</button>





						</div>
					</div>
				</div>
			</nav >


		) : (
			<nav className={`navbar navbar-expand-lg ${darkMode ? "bg-dark" : "light"
				}`}>
				<div className="container-fluid px-5 py-1">
					<Link to="/" className="text-decoration-none">
						<span className={`navbar-brand mb-0 h1 ${darkMode ? "text-white" : "text-dark"} `}>Home</span>
					</Link>
					<button
						className="navbar-toggler"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#navbarNavAltMarkup"
						aria-controls="navbarNavAltMarkup"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="d-flex collapse navbar-collapse" id="navbarNavAltMarkup">
						<div className="ms-auto navbar-nav d-flex align-items-center gap-2">
							<button
								onClick={toggleTheme}
								className={`btn ${darkMode ? "text-white" : ""} `}
							>
								<i className="bi bi-brightness-high"></i>
							</button>
							<div className={`${darkMode ? "navborder-light" : "navborder-dark"} `}>
								<Link
									to="/Login"
									className={`btn ${darkMode ? "text-white" : ""} text-decoration-none`}
								>
									Ingresar
								</Link>
							</div>
							<Link to="/Register" className="text-decoration-none">
								<button className="btn btn-primary">Empezar</button>
							</Link>
						</div>
					</div>
				</div>
			</nav>
		)
	);

};

