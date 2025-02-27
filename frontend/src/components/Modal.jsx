import PropTypes from "prop-types";
import { createPortal } from "react-dom";

const Modal = ({ isActive, onClose, children }) => {
  if (!isActive) return null;

  return createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-5 rounded-md shadow-lg max-w-screen-md">
        {children} {}
        <button className="btn btn-primary mt-4" onClick={onClose}>
          Close
        </button>
      </div>
    </div>,
    document.body
  );
};

Modal.propTypes = {
  isActive: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node,
};

export default Modal;
