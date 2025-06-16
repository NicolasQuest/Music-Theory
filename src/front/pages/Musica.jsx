import React, { useState, useContext } from 'react'
import { ThemeContext } from "../hooks/ThemeContext";
const Musica = () => {
    const [showModalMusica, setShowModalMusica] = useState(false);

    const { darkMode } = useContext(ThemeContext);
    return (
        <div>
            <button
                className={`btn ${darkMode ? "btn-dark " : "btn-success "}`}
                onClick={() => setShowModalMusica(true)}
                style={{ width: "300px", height: "80px" }}
            >
                ¿Qué es la Música?
            </button>
            {showModalMusica && (
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
                                <h5 className="modal-title">¿Qué es la Música?</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setShowModalMusica(false)}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <p>
                                    La música es el arte de organizar sonidos y silencios en
                                    el tiempo, con el propósito de expresar ideas, emociones o
                                    sensaciones. Se compone principalmente de tres elementos
                                    fundamentales: <strong>melodía</strong>,{" "}
                                    <strong>armonía</strong> y <strong>ritmo</strong>.
                                </p>


                            </div>
                            <div className="modal-footer">
                                <button
                                    className="btn btn-secondary"
                                    onClick={() => setShowModalMusica(false)}
                                >
                                    Cerrar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Musica
