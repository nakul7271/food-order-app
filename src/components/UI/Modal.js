import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import Classes from "./Modal.module.css";

const Backdrop = (props) => {

  return <div onClick={props.onClose} className={Classes.backdrop}></div>;
};

const ModalOverlay = (props) => {
  return (
    <div className={Classes.modal}>
      <div>{props.children}</div>
    </div>
  );
};

const Modal = (props) => {

    const portalElement = document.getElementById("overlays");

  return (
    <Fragment>
          {ReactDOM.createPortal(<Backdrop onClose={props.onClose} />, portalElement)}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElement
      )}
    </Fragment>
  );
};

export default Modal;
