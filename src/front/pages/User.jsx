import React, { useEffect, useState } from "react"
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { useNavigate } from "react-router"

export const User = () => {
	const backendUrl = import.meta.env.VITE_BACKEND_URL;
	const navigate = useNavigate();
	const token = localStorage.getItem("token");
	const [userEmail, setUserEmail] = useState();

	useEffect(() => {
		if (!token) {
			navigate("/login");
			return;
		}
		fetchProtected();
	}, [token, navigate]);


	const fetchProtected = async () => {
		try {
			const response = await fetch(backendUrl + "protected",
				{
					method: 'GET',
					headers: {
						'Authorization': `Bearer ${token}`,
						'Content-Type': 'application/json',
					},
				});
			if (response.status === 401) {

				localStorage.removeItem("token");

				navigate("/login");
				return;
			}
			if (!response.ok) {
				throw new Error("Error in the request");
			}
			const data = await response.json();
			setUserEmail(data.email);
		} catch (error) {
			console.error("Error in protected request", error);
		}
	}


	return (
		<div>
			<h1>Hola {userEmail}</h1>
		</div>

	);
};


