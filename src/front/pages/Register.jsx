import React, { useEffect, useState } from "react"
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { useNavigate } from "react-router"

export const Register = () => {
	const backendUrl = import.meta.env.VITE_BACKEND_URL;
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	const register = async (event) => {
		event.preventDefault()

		try {
			const response = await fetch(backendUrl + "register", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email, password }),
			});

			if (!response.ok) {
				throw new Error("There was a problem in the login request");
			}
			const data = await response.json()
			navigate("/login")
		}
		catch (err) {
			console.log("error", err)
		}
	}




	return (
		<form className="mt-5"
			onSubmit={register}>
			<div className="form-group d-flex justify-content-center ">
				<input
					type="email"
					className="form-control w-25"
					id="exampleInputEmail1"
					aria-describedby="emailHelp"
					placeholder="Enter email"
					onChange={(e) => {
						setEmail(e.target.value)
					}}
				/>
			</div>


			<div className="form-group d-flex justify-content-center mt-3">
				<input
					type="password"
					className="form-control w-25"
					id="exampleInputPassword1"
					placeholder="Password"
					onChange={(e) => {
						setPassword(e.target.value)
					}}
				/>
			</div>

			<div className="d-flex justify-content-center mt-4">
				<button type="submit" className="btn btn-primary">
					Sign in
				</button>
			</div>
		</form>

	);
}; 