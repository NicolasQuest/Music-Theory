import React, { useState } from "react";

const rhythms = {
    "Pulso simple": [0, 500, 1000, 1500],
    "Ritmo binario": [0, 250, 500, 750, 1000, 1250],
    "Ritmo ternario": [0, 333, 666, 999, 1332],
    Contratiempo: [250, 750, 1250],
};

const Rhythm = () => {
    const [disabled, setDisabled] = useState(false);
    const [showModalRitmo, setShowModalRitmo] = useState(false);
    const [showModalCompas, setShowModalCompas] = useState(false);
    const [showModalInteractive, setShowModalInteractive] = useState(false);

    const playRhythm = (pattern) => {
        setDisabled(true);

        const context = new (window.AudioContext || window.webkitAudioContext)();
        const clickDuration = 0.05;
        const volume = 0.3;

        pattern.forEach((timeOffsetMs, index) => {
            const time = context.currentTime + timeOffsetMs / 1000;

            const oscillator = context.createOscillator();
            const gainNode = context.createGain();

            oscillator.type = "sine";
            oscillator.frequency.setValueAtTime(1000, time);

            gainNode.gain.setValueAtTime(volume, time);
            gainNode.gain.exponentialRampToValueAtTime(0.01, time + clickDuration);

            oscillator.connect(gainNode);
            gainNode.connect(context.destination);

            oscillator.start(time);
            oscillator.stop(time + clickDuration);
        });

        const totalDuration = pattern[pattern.length - 1] + 200;
        setTimeout(() => setDisabled(false), totalDuration);
    };

    return (
        <div className="container d-flex justify-content-center mt-5 p-4 gap-5">
            <div className="mb-2">
                <button
                    className="btn btn-warning text-white"
                    onClick={() => setShowModalRitmo(true)}
                    style={{ width: "300px", height: "80px" }}
                >
                    ¿Qué es el Ritmo?
                </button>
            </div>

            <div className="mb-2 ">
                <button
                    className="btn btn-warning text-white"
                    onClick={() => setShowModalCompas(true)}
                    style={{ width: "300px", height: "80px" }}
                >
                    ¿Qué es un compás?
                </button>
            </div>

            <div className="mb-2">
                <button
                    className="btn btn-warning text-white"
                    onClick={() => setShowModalInteractive(true)}
                    style={{ width: "300px", height: "80px" }}
                >
                    Prueba rítmica interactiva
                </button>
            </div>

            {showModalRitmo && (
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
                                <h5 className="modal-title">¿Qué es el Ritmo?</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setShowModalRitmo(false)}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <p>
                                    El ritmo es la organización del tiempo en la música mediante
                                    la distribución de sonidos y silencios. Es el patrón que hace
                                    que la música tenga movimiento y pulso.
                                </p>
                                <p>
                                    Los ritmos pueden ser
                                    regulares o irregulares, rápidos o lentos, y son fundamentales
                                    para darle vida a la música.
                                </p>
                            </div>
                            <div className="modal-footer">
                                <button
                                    className="btn btn-secondary"
                                    onClick={() => setShowModalRitmo(false)}
                                >
                                    Cerrar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal Compás */}
            {showModalCompas && (
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
                                <h5 className="modal-title">¿Qué es un compás?</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setShowModalCompas(false)}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <p>
                                    Un compás es una unidad de tiempo en la música que agrupa un
                                    número determinado de pulsos o tiempos. Los compases organizan
                                    el ritmo y ayudan a estructurar la música en secciones
                                    regulares.
                                </p>
                                <p>
                                    Por ejemplo, un compás de 4/4 tiene cuatro pulsos por compás y
                                    es muy común en muchos géneros musicales. Saber reconocer los
                                    compases facilita la interpretación y la creación musical.
                                </p>
                            </div>
                            <div className="modal-footer">
                                <button
                                    className="btn btn-secondary"
                                    onClick={() => setShowModalCompas(false)}
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
                                <h5 className="modal-title">Prueba rítmica interactiva</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setShowModalInteractive(false)}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <div className="card text-start">
                                    <div className="card-header">
                                        <h2>
                                            Prueba estos patrones rítmicos haciendo clic en los
                                            botones
                                        </h2>
                                    </div>
                                    <div className="card-body">
                                        <h5 className="card-title mb-3">
                                            Estos son algunos patrones rítmicos básicos. Cada botón
                                            reproduce un patrón con "clics" que representan el pulso:
                                        </h5>
                                        <div className="d-flex justify-content-center pt-3 flex-wrap">
                                            {Object.entries(rhythms).map(([name, pattern]) => (
                                                <button
                                                    key={name}
                                                    className="btn btn-warning m-2"
                                                    onClick={() => playRhythm(pattern)}
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

export default Rhythm;
