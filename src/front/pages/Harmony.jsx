import React, { useState } from "react";

const chords = {
    "DO Mayor": [261.63, 329.63, 392.0],
    "RE Menor": [293.66, 349.23, 440.0],
    "MI Menor": [329.63, 392.0, 493.88],
    "FA Mayor": [349.23, 440.0, 261.63],
    "SOL Mayor": [392.0, 493.88, 293.66],
    "LA Menor": [440.0, 261.63, 329.63],
    "SI Disminuido": [493.88, 293.66, 349.23],
};

const Harmony = () => {
    const [disabled, setDisabled] = useState(false);
    const [showModalArmonia, setShowModalArmonia] = useState(false);
    const [showModalAcorde, setShowModalAcorde] = useState(false);
    const [showModalInteractive, setShowModalInteractive] = useState(false);

    const playChord = (frequencies) => {
        setDisabled(true);

        const context = new (window.AudioContext || window.webkitAudioContext)();
        const duration = 1; // seconds
        const fadeOutTime = 0.1;

        frequencies.forEach((freq) => {
            const oscillator = context.createOscillator();
            const gainNode = context.createGain();

            oscillator.type = "sine";
            oscillator.frequency.setValueAtTime(freq, context.currentTime);

            gainNode.gain.setValueAtTime(0.2, context.currentTime);

            oscillator.connect(gainNode);
            gainNode.connect(context.destination);

            oscillator.start();

            gainNode.gain.setValueAtTime(
                0.2,
                context.currentTime + duration - fadeOutTime
            );
            gainNode.gain.linearRampToValueAtTime(0, context.currentTime + duration);

            oscillator.stop(context.currentTime + duration);
        });

        setTimeout(() => setDisabled(false), duration * 1000);
    };

    return (
        <div className="container d-flex justify-content-center mt-5 p-4 gap-5">
            {/* Botones para abrir modales */}
            <div className="mb-2">
                <button className="btn btn-info text-white" onClick={() => setShowModalArmonia(true)} style={{ width: "300px", height: "80px" }}>
                    ¿Qué es la Armonía?
                </button>
            </div>

            <div className="mb-2 ">
                <button className="btn btn-info text-white" onClick={() => setShowModalAcorde(true)} style={{ width: "300px", height: "80px" }}>
                    ¿Qué es un acorde?
                </button>
            </div>

            <div className="mb-2">
                <button className="btn btn-info text-white" onClick={() => setShowModalInteractive(true)} style={{ width: "300px", height: "80px" }}>
                    Prueba armónica interactiva
                </button>
            </div>

            {/* Modal Armonía */}
            {showModalArmonia && (
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
                                <h5 className="modal-title">¿Qué es la Armonía?</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setShowModalArmonia(false)}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <p>
                                    La armonía es el arte de formar y enlazar los acordes en la música. Se refiere a la combinación simultánea de notas diferentes. Esta técnica es fundamental para enriquecer la melodía y aportar profundidad a las composiciones musicales.
                                </p>
                                <p>
                                    Por ejemplo, un acorde de Do Mayor está formado por las notas Do, Mi y Sol. Cuando se tocan juntas, producen un sonido brillante y alegre. Los acordes son los bloques de construcción de la música: apoyan a las melodías y le dan estructura a las canciones.
                                </p>
                            </div>
                            <div className="modal-footer">
                                <button
                                    className="btn btn-secondary"
                                    onClick={() => setShowModalArmonia(false)}
                                >
                                    Cerrar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal Acorde */}
            {showModalAcorde && (
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
                                <h5 className="modal-title">¿Qué es un acorde?</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setShowModalAcorde(false)}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <p>
                                    Un acorde es un grupo de notas que suenan al mismo tiempo para crear armonía. Normalmente, un acorde contiene tres o más notas diferentes que suenan bien juntas. Estas notas se eligen siguiendo una escala musical y su combinación le da a cada acorde un carácter o "color" único: alegre, triste, tenso o relajado.
                                </p>
                                <p>
                                    Por ejemplo, un acorde de Do Mayor contiene las notas Do, Mi y Sol. Tocadas al mismo tiempo, producen un sonido brillante y alegre. Los acordes son los bloques de construcción de la música: apoyan a las melodías y le dan estructura a las canciones.
                                </p>
                            </div>
                            <div className="modal-footer">
                                <button
                                    className="btn btn-secondary"
                                    onClick={() => setShowModalAcorde(false)}
                                >
                                    Cerrar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal Interactivo */}
            {showModalInteractive && (
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
                                <h5 className="modal-title">Prueba armónica interactiva</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setShowModalInteractive(false)}
                                ></button>
                            </div>
                            <div className="modal-body">
                                {/* Aquí metemos la tarjeta */}
                                <div className="card text-start">
                                    <div className="card-header">
                                        <h2>Prueba a tocar estos acordes haciendo clic en los botones</h2>
                                    </div>
                                    <div className="card-body">
                                        <h5 className="card-title mb-3">
                                            Estos son los acordes de la escala de Do Mayor. Cada acorde corresponde a un grado de la escala (usamos números romanos para representarlos):
                                            <br />
                                            I – DO Mayor (Tónica) <br />
                                            ii – RE Menor (Supertónica) <br />
                                            iii – Mi Menor (Mediante) <br />
                                            IV – FA Mayor (Subdominante) <br />
                                            V – SOL Mayor (Dominante) <br />
                                            vi – LA Mayota (Submediante) <br />
                                            vii° – SI Disminuido (Sensible)
                                        </h5>
                                        <div className="d-flex justify-content-center pt-3 flex-wrap">
                                            {Object.entries(chords).map(([name, freqs]) => (
                                                <button
                                                    key={name}
                                                    className="btn btn-info m-2"
                                                    onClick={() => playChord(freqs)}
                                                    disabled={disabled}
                                                >
                                                    {name}
                                                </button>
                                            ))}
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button
                                    className="btn btn-secondary"
                                    onClick={() => setShowModalInteractive(false)}
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



export default Harmony;
