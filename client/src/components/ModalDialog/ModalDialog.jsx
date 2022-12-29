import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { createWrapperAndAppendToBody } from "../../helpers/helpers";

function ModalDialog({
  content,
  open,
  onClose = () => {},
  title,
  id = "wrapper",
  actions = [],
}) {
  const [wrapperElement, setWrapperElement] = useState(null);

  useEffect(() => {
    let element = document.getElementById(id);
    let elementCreated = false;

    // if element is not found with id or id is not provided,
    // create and append to body
    if (!element) {
      elementCreated = true;
      element = createWrapperAndAppendToBody(id);
    }
    setWrapperElement(element);

    return () => {
      if (elementCreated && element.parentNode) {
        element.parentNode.removeChild(element);
      }
    };
  }, [id]);

  if (!open) {
    return null;
  }

  // wrapperElement state will be null on the very first render.
  if (wrapperElement === null) return null;

  const modalContent = (
    <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      {/* modal */}
      <div className="bg-white rounded shadow-lg w-1/3 overflow-hidden">
        {/* modal header */}
        <div className="border-b flex justify-between items-center">
          {title && <h3 className="px-4 py-2 text-center flex-1">{title}</h3>}{" "}
          <button
            className={`bg-blue-600 px-4 py-2 hover:bg-blue-700 w-10 h-full text-white block ml-auto`}
            onClick={onClose}
          >
            X
          </button>
        </div>

        {/* modal body */}
        <div className="p-3">{content}</div>

        {/* modal footer */}
        {actions.length !== 0 && (
          <div className="flex justify-end items-center w-100 border-t p-3 gap-1">
            {actions.map((action) => (
              <button
                className={`bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-white`}
                onClick={action.onClick}
                key={action.text}
              >
                {action.text}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  return ReactDOM.createPortal(modalContent, wrapperElement);
}

export default ModalDialog;
