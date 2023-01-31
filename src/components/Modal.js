import React from 'react';
import "./Modal.css"

const Modal = ({ children, addState, setAddState, toUpdating, setToUpdating, isDeleting }) => {
    const handleCancel = () => {
        setAddState(false)
        setToUpdating(null)
    }
    return (
        <div className={addState ? "modal is-open" : "modal"} onClick={handleCancel}>
            <div className="container-modal" onClick={(e) => e.stopPropagation()}>
                <header style={{ borderTopLeftRadius: "1rem", borderTopRightRadius: "1rem" }}>
                    <h2 style={{ textAlign: "center" }}>{isDeleting ? "Deleting GAteway" : toUpdating ? "Update Gateway" : "New Gateway"}</h2>
                </header>
                {children}
            </div>
        </div>
    )
}

export default Modal