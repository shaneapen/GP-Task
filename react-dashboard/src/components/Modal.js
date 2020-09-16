import React from "react";

const Modal = ({ handleSave, handleClose, show, children }) => {
    const showHideClassName = show ? "modal display-block" : "modal display-none";
  
    return (
      <div className={showHideClassName}>
        <section className="modal-main">
          {children}
          <button className="close-button" onClick={handleClose}>X</button>
          <button onClick={handleSave}>Save Changes</button>
        </section>
      </div>
    );
  };

export default Modal;