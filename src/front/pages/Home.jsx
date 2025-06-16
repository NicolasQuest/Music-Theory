import { useContext } from "react";
import { ThemeContext } from "../hooks/ThemeContext";

import React, { useEffect } from "react"
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import fotoH from "../assets/img/foto1.png"
import fotoH2 from "../assets/img/foto2.png"
import Harmony from "./Harmony";
import Melody from "./Melody";
import Rhythm from "./Rhythm";
import Musica from "./Musica";
import { useNavigate } from "react-router"
export const Home = () => {


	const navigate = useNavigate()
	const { darkMode } = useContext(ThemeContext);


	return (
		<div className={darkMode ? " text-white min-vh-100" : "lightBody text-dark min-vh-100"}>
			<div className="d-flex justify-content-center mt-5">
				<div className="px-4 py-5 my-5 text-center">
					<img className="d-block mx-auto mb-4" alt="fotoHero" style={darkMode ? { "height": "380px" } : { "height": "400px" }} src={darkMode ? fotoH : fotoH2} />
					<div className="col-lg-6 mx-auto">
						<p className="lead mb-4 ">Domina tu instrumento, entrena tu oído y descubre el músico que llevas dentro.
							Tutoriales paso a paso, desde principiante hasta avanzado.
							Empieza hoy y deja que la música hable por ti.</p>
						<div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
							<button onClick={() => navigate("/register")} type="button" className="btn btn-primary btn-ms px-4 gap-3">Empeza ahora!</button>

						</div>
					</div>
				</div>
			</div>
		</div>
	);
}; 