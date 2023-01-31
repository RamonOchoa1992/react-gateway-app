import React from 'react';
import "./Modal.css"

const ModalMessage = ({ children, errorGateway, setErrorGateway, setToUpdating }) => {
    const handleCancel = () => {
        setErrorGateway(false)
        setToUpdating(null)
    }
    return (
        <div className={errorGateway ? "modal is-open" : "modal"} onClick={handleCancel}>
            <div className="container-modal" style={{ borderColor: "rgb(237,67,55)" }} onClick={(e) => e.stopPropagation()}>
                {errorGateway && <button onClick={handleCancel} style={{ position: "absolute", top: ".5rem", right: ".5rem", padding: ".25rem .8rem", backgroundColor: "#FFF", borderRadius: ".5rem", cursor: "pointer", fontSize: "1.2rem" }}>X</button>}
                <header style={{ borderTopLeftRadius: "1rem", borderTopRightRadius: "1rem", backgroundColor: "rgb(237,67,55)" }}>
                    <h2 style={{ textAlign: "center" }}>Ups!</h2>
                </header>
                {children}
            </div>
        </div>
    )
}

export default ModalMessage