import React, { Fragment, Children } from "react";

export default function Modal({
  button,
  onClick,
  isDisabled,
  title,
  id,
  children,
}) {
  const handleClick = () => {
    onClick ? onClick() : null;
  };

  return (
    <Fragment>
      <button
        disabled={isDisabled == true ? true : false}
        className="btn btn-primary col-3 shadow py-1"
        data-bs-toggle="modal"
        data-bs-target={"#" + id}
        onClick={handleClick}
      >
        {button}
      </button>
      <div id={id} className="modal fade" role="dialog">
        <div
          className={
            Children.count(children) == 1
              ? "modal-dialog"
              : "modal-dialog modal-lg"
          }
        >
          <div className="modal-content">
            <div className="modal-header py-0 justify-content-center">
              <div className="fs-5 m-1">{title}</div>
            </div>
            <div className="modal-body row">{children}</div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
