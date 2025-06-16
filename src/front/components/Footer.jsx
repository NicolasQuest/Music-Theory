import { ThemeContext } from "../hooks/ThemeContext";
import { useContext } from "react";
export const Footer = () => {

	const { darkMode, toggleTheme } = useContext(ThemeContext);

	return (



		<footer className={` position-fixed bottom-0 w-100  d-flex justify-content-center  py-3 ${darkMode ? "bg-dark" : "light"}`}>
			<p className="mb-0">

				website created by{' '}
				<a href="https://github.com/NicolasQuest" className={` ${darkMode ? "text-white" : "text-dark"} text-decoration-none`}>@NicolasQuest</a>.
				<p className={` ${darkMode ? "text-white" : "text-dark"}`} style={{ fontSize: "0.8rem", textAlign: "center", padding: "0.5rem 0" }}>
					&copy; {new Date().getFullYear()} Todos los derechos reservados.
				</p>

			</p>
		</footer>
	);
}