import React, { useEffect, useState } from "react"
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { useNavigate } from "react-router"
import Harmony from "./Harmony";
import Melody from "./Melody";
import Rhythm from "./Rhythm";
import Musica from "./Musica";

export const User = () => {
	const backendUrl = import.meta.env.VITE_BACKEND_URL;
	const navigate = useNavigate();
	const token = localStorage.getItem("token");
	const [userEmail, setUserEmail] = useState();

	//	const [count, setCount] = useState(0);
	//	const [countD, setCountD] = useState(0);
	useEffect(() => {
		if (!token) {
			navigate("/login");
			return;
		}
		fetchProtected();
	}, [token, navigate]);


	/* 
	<div className="d-flex justify-content-center  gap-1">
						   <button
							   className="btn btn-success"
							   onClick={() =>
								   setCount((c) => {
									   const countLikes = c + 1;
									   localStorage.setItem("likes", countLikes);
									   return countLikes;
								   })
							   }
						   >
							   Likes 👍 {count}
						   </button>
						   <button
							   className="btn btn-danger"
							   onClick={() => {
								   setCountD((c) => {
									   const countDislikes = c + 1;
									   localStorage.setItem("dislikes", countDislikes);
									   return countDislikes;
								   });
							   }}
						   >
							   Dislikes 👎 {countD}
						   </button>
					   </div>*/

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
			<div
				className="d-flex justify-content-center mt-5 "
				style={{ minHeight: "90vh" }}
			>
				<div>
					<h1 className="text-center texto">
						♪ Teoría Musical Básica en 5' ♪
					</h1>
					<div className="mb-2">

					</div>

					<div className="d-flex justify-content-center mt-5">
						<Musica />
					</div>
					<Harmony />
					<Melody />
					<Rhythm />

				</div>
			</div>
		</div>
	);
};


