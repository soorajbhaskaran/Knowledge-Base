import React from "react";

import PropTypes from "prop-types";

const Backdrop = ({ showModal, setShowModal, children }) => (
  <>
    {showModal && (
      <div
        className="duration-900 fixed left-0 top-0 h-screen w-screen bg-black bg-opacity-75 ease-linear "
        onClick={() => setShowModal(false)}
      >
        <div
          className="mt-50 m-auto max-w-screen-sm"
          onClick={event => event.stopPropagation()}
        >
          {children}
        </div>
      </div>
    )}
  </>
);

Backdrop.propTypes = {
  showModal: PropTypes.bool,
};

export default Backdrop;
