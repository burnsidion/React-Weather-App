import PropTypes from "prop-types";
import { createPortal } from "react-dom";
import { CSSTransition } from "react-transition-group";
import { useRef } from "react";

const Modal = ({ isActive, onClose, children }) => {
  const nodeRef = useRef(null);

  return createPortal(
    <CSSTransition
      in={isActive}
      timeout={300}
      classNames="modal-outer"
      unmountOnExit
      nodeRef={nodeRef}
    >
      <div
        id="modal-overlay"
        ref={nodeRef}
        className="fixed inset-0 bg-black/30 flex items-center justify-center"
        onClick={(event) => {
          if (event.target.id === "modal-overlay") {
            onClose();
          }
        }}
      >
        <CSSTransition
          in={isActive}
          timeout={300}
          classNames="modal-inner"
          unmountOnExit
          nodeRef={nodeRef}
        >
          <div
            className="bg-white p-5 rounded-md shadow-lg max-w-screen-md transform transition-all"
            onClick={(e) => e.stopPropagation()}
          >
            {children}
            <button className="btn btn-primary mt-4" onClick={onClose}>
              Close
            </button>
          </div>
        </CSSTransition>
      </div>
    </CSSTransition>,
    document.body
  );
};

Modal.propTypes = {
  isActive: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node,
};

export default Modal;
