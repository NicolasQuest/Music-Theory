import React, { useState } from "react";

const melodyNotes = {
	Do: 261.63,
	Re: 293.66,
	Mi: 329.63,
	Fa: 349.23,
	Sol: 392.0,
	La: 440.0,
	Si: 493.88,
};

const Melody = () => {
	const [disabled, setDisabled] = useState(false);
	const [showModalMelodia, setShowModalMelodia] = useState(false);
	const [showModalFraseMelodica, setShowModalFraseMelodica] = useState(false);
	const [showModalInteractiveMelody, setShowModalInteractiveMelody] = useState(false);

	const playNote = (frequency) => {
		setDisabled(true);

		const context = new (window.AudioContext || window.webkitAudioContext)();
		const duration = 1; // segundos
		const fadeOutTime = 0.1;

		const oscillator = context.createOscillator();
		const gainNode = context.createGain();

		oscillator.type = "sine";
		oscillator.frequency.setValueAtTime(frequency, context.currentTime);

		gainNode.gain.setValueAtTime(0.2, context.currentTime);

		oscillator.connect(gainNode);
		gainNode.connect(context.destination);

		oscillator.start();

		gainNode.gain.setValueAtTime(0.2, context.currentTime + duration - fadeOutTime);
		gainNode.gain.linearRampToValueAtTime(0, context.currentTime + duration);

		oscillator.stop(context.currentTime + duration);

		setTimeout(() => setDisabled(false), duration * 1000);
	};

	return (
		<div className="container d-flex justify-content-center mt-5 p-4 gap-5">

			<div className="mb-2">
				<button
					className="btn btn-danger"
					onClick={() => setShowModalMelodia(true)}
					style={{ width: "300px", height: "80px" }}
				>
					¿Qué es la Melodía?
				</button>
			</div>

			<div className="mb-2">
				<button
					className="btn btn-danger"
					onClick={() => setShowModalFraseMelodica(true)}
					style={{ width: "300px", height: "80px" }}
				>
					¿Qué es una frase melódica?
				</button>
			</div>

			<div className="mb-2">
				<button
					className="btn btn-danger"
					onClick={() => setShowModalInteractiveMelody(true)}
					style={{ width: "300px", height: "80px" }}
				>
					Prueba melódica interactiva
				</button>
			</div>


			{showModalMelodia && (
				<div
					className="modal d-flex align-items-center justify-content-center"
					style={{
						backgroundColor: "rgba(0, 0, 0, 0.5)",
						position: "fixed",
						top: 0,
						left: 0,
						width: "100vw",
						height: "100vh",
						zIndex: 1050,
					}}
				>
					<div className="modal-dialog">
						<div className="modal-content text-start">
							<div className="modal-header">
								<h5 className="modal-title">¿Qué es la Melodía?</h5>
								<button
									type="button"
									className="btn-close"
									onClick={() => setShowModalMelodia(false)}
								></button>
							</div>
							<div className="modal-body">
								<p>
									La melodía es una sucesión organizada de notas musicales que se perciben como una unidad. Es la línea musical que se canta o toca y que suele ser la parte más memorable de una canción.
								</p>
								<p>
									Por ejemplo, la melodía de "Cumpleaños Feliz" es una secuencia de notas que todos reconocemos fácilmente. La melodía guía la canción y transmite emociones y sentimientos.
								</p>
							</div>
							<div className="modal-footer">
								<button
									className="btn btn-secondary"
									onClick={() => setShowModalMelodia(false)}
								>
									Cerrar
								</button>
							</div>
						</div>
					</div>
				</div>
			)}

			{showModalFraseMelodica && (
				<div
					className="modal d-flex align-items-center justify-content-center"
					style={{
						backgroundColor: "rgba(0, 0, 0, 0.5)",
						position: "fixed",
						top: 0,
						left: 0,
						width: "100vw",
						height: "100vh",
						zIndex: 1050,
					}}
				>
					<div className="modal-dialog">
						<div className="modal-content text-start">
							<div className="modal-header">
								<h5 className="modal-title">¿Qué es una frase melódica?</h5>
								<button
									type="button"
									className="btn-close"
									onClick={() => setShowModalFraseMelodica(false)}
								></button>
							</div>
							<div className="modal-body">
								<p>
									Una frase melódica es un fragmento musical que funciona como una idea completa dentro de una melodía, similar a una oración en un texto. Tiene un comienzo, desarrollo y final, y transmite una emoción o sentimiento específico.
								</p>
								<p>
									Por ejemplo, la primera línea de una canción suele ser una frase melódica que capta la atención del oyente y prepara el resto de la melodía.
								</p>
							</div>
							<div className="modal-footer">
								<button
									className="btn btn-secondary"
									onClick={() => setShowModalFraseMelodica(false)}
								>
									Cerrar
								</button>
							</div>
						</div>
					</div>
				</div>
			)}

			{showModalInteractiveMelody && (
				<div
					className="modal d-flex align-items-center justify-content-center"
					style={{
						backgroundColor: "rgba(0, 0, 0, 0.5)",
						position: "fixed",
						top: 0,
						left: 0,
						width: "100vw",
						height: "100vh",
						zIndex: 1050,
						overflowY: "auto",
					}}
				>
					<div className="modal-dialog modal-lg">
						<div className="modal-content text-start">
							<div className="modal-header">
								<h5 className="modal-title">Prueba melódica interactiva</h5>
								<button
									type="button"
									className="btn-close"
									onClick={() => setShowModalInteractiveMelody(false)}
								></button>
							</div>
							<div className="modal-body">
								<div className="card text-start">
									<div className="card-header">
										<h2>
											Prueba a tocar estas notas melódicas haciendo clic en los botones
										</h2>
									</div>
									<div className="card-body">
										<h5 className="card-title mb-3">
											Estas son notas de la escala de Do Mayor. Cada nota puede usarse para crear melodías:
											<br />
											Do - Re - Mi - Fa - Sol - La - Si
										</h5>
										<div className="d-flex justify-content-center pt-3 flex-wrap">
											{Object.entries(melodyNotes).map(([name, freq]) => (
												<button
													key={name}
													className="btn btn-danger m-2"
													onClick={() => playNote(freq)}
													disabled={disabled}
												>
													{name}
												</button>
											))}
										</div>
										{/* <LikeButton /> */}
									</div>
								</div>
							</div>
							<div className="modal-footer">
								<button
									className="btn btn-secondary"
									onClick={() => setShowModalInteractiveMelody(false)}
								>
									Cerrar
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default Melody;
