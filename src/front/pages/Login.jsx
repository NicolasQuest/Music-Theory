import React, { useEffect, useState, useContext } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { useNavigate } from "react-router";
import { ThemeContext } from "../hooks/ThemeContext";
import Swal from 'sweetalert2';

export const Login = () => {
	const backendUrl = import.meta.env.VITE_BACKEND_URL;
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();
	const { dispatch } = useGlobalReducer();
	const { darkMode } = useContext(ThemeContext);

	useEffect(() => {
		document.body.classList.remove("dark-theme", "light-theme");
		document.body.classList.add(darkMode ? "dark-theme" : "light-theme");
	}, [darkMode]);

	const login = async (event) => {
		event.preventDefault();

		try {
			const response = await fetch(backendUrl + "login", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email, password }),
			});

			if (!response.ok) {
				Swal.fire({
					icon: "error",
					title: "Oops...",
					text: "Email o contraseña incorrecta",
				});
				throw new Error("There was a problem in the login request");
			}
			const data = await response.json();
			localStorage.setItem("token", data.token);
			localStorage.setItem("user", data.username);
			localStorage.setItem("email", data.email);
			dispatch({ type: "login", payload: { token: data.token, user: data.username, email: data.email } });
			Swal.fire({
				title: `Welcome ${data.username}`,
				icon: "success",
				draggable: true
			});
			navigate("/user");
		} catch (err) {
			console.log("error", err);
		}
	};

	return (
		<form className="mt-5" onSubmit={login}>
			<div className="d-flex justify-content-center">
				<div className={`card shadow p-4 w-25 ${darkMode ? "bg-dark text-white" : "bg-light text-dark"}`}>
					<h3 className="text-center mb-4">Iniciar Sesión</h3>

					<div className="form-group mb-3">
						<label htmlFor="loginEmail" className="form-label">
							<i className="bi bi-envelope-fill me-2"></i>Correo electrónico
						</label>
						<input
							type="email"
							className={`form-control ${darkMode ? "bg-dark text-white border-white" : "bg-light text-dark border-dark"}`}
							id="loginEmail"
							placeholder="ejemplo@correo.com"
							onChange={(e) => setEmail(e.target.value)}
							required
							style={{ caretColor: darkMode ? "white" : "black" }}
						/>
					</div>

					<div className="form-group mb-4">
						<label htmlFor="loginPassword" className="form-label">
							<i className="bi bi-lock-fill me-2"></i>Contraseña
						</label>
						<input
							type="password"
							className={`form-control ${darkMode ? "bg-dark text-white border-white" : "bg-light text-dark border-dark"}`}
							id="loginPassword"
							placeholder="********"
							onChange={(e) => setPassword(e.target.value)}
							required
							style={{ caretColor: darkMode ? "white" : "black" }}
						/>
					</div>

					<div className="d-grid">
						<button
							type="submit"
							className={`btn ${darkMode ? "btn-outline-light" : "btn-success"}`}
						>
							<i className="bi bi-box-arrow-in-right me-2"></i>Entrar
						</button>
					</div>
				</div>
			</div>
		</form>
	);
};
