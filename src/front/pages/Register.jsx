import React, { useEffect, useState } from "react"
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { useNavigate } from "react-router"
import { useContext } from "react";
import { ThemeContext } from "../hooks/ThemeContext";
import Swal from 'sweetalert2';

export const Register = () => {
	const backendUrl = import.meta.env.VITE_BACKEND_URL;
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [username, setUsername] = useState("");
	const navigate = useNavigate();

	const { darkMode, toggleTheme } = useContext(ThemeContext);

	const register = async (event) => {
		event.preventDefault()

		try {
			const response = await fetch(backendUrl + "register", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email, password, username }),
			});

			if (!response.ok) {
				throw new Error("There was a problem in the login request");
			}
			const data = await response.json()
			Swal.fire({
				title: "Usuario creado correctamente",
				icon: "success",
				draggable: true
			});
			navigate("/login")
		}
		catch (err) {
			console.log("error", err)
		}
	}

	useEffect(() => {
		document.body.classList.remove("dark-theme", "light-theme");
		document.body.classList.add(darkMode ? "dark-theme" : "light-theme");
	}, [darkMode]);


	return (
		<form className="mt-5" onSubmit={register}>
			<div className="d-flex justify-content-center">
				<div className={`card shadow p-4 w-25 ${darkMode ? "bg-dark text-white" : "bg-light text-dark"}`}>
					<h3 className="text-center mb-4">Crear Cuenta</h3>

					<div className="form-group mb-3">
						<label htmlFor="exampleInputEmail1" className="form-label">
							<i className="bi bi-envelope-fill me-2"></i>Correo electrónico
						</label>
						<input
							type="email"
							className={`form-control ${darkMode ? "bg-dark text-white border-white" : "bg-light text-dark border-dark"}`}
							id="exampleInputEmail1"
							placeholder="ejemplo@correo.com"
							onChange={(e) => setEmail(e.target.value)}
							required

						/>
					</div>

					<div className="form-group mb-3">
						<label htmlFor="loginUsername" className="form-label">
							<i className="bi bi-person-fill me-2"></i>Nombre de usuario
						</label>
						<input
							type="text"
							className={`form-control ${darkMode ? "bg-dark text-white border-white" : "bg-light text-dark border-dark"}`}
							id="loginUsername"
							placeholder="Tu nombre de usuario"
							onChange={(e) => setUsername(e.target.value)}
							required

						/>
					</div>

					<div className="form-group mb-4">
						<label htmlFor="exampleInputPassword1" className="form-label">
							<i className="bi bi-lock-fill me-2"></i>Contraseña
						</label>
						<input
							type="password"
							className={`form-control ${darkMode ? "bg-dark text-white border-white" : "bg-light text-dark border-dark"}`}
							id="exampleInputPassword1"
							placeholder="********"
							onChange={(e) => setPassword(e.target.value)}
							required

						/>
					</div>

					<div className="d-grid">
						<button type="submit" className="btn btn-primary">
							<i className="bi bi-person-plus-fill me-2"></i>Registrarse
						</button>
					</div>
				</div>
			</div>

		</form>


	);
}; 