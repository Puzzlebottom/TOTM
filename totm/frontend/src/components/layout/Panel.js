import React, { Component } from "react";
import PropTypes from "prop-types";

export class Panel extends Component {
  constructor(props) {
    super(props);
  }

  static propTyes = {
    header: PropTypes.element,
    footer: PropTypes.element,
    frameType: PropTypes.string,
    scrollHeight: PropTypes.string,
  };

  render() {
    const { header, footer, frameType, scrollHeight, children } = this.props;

    const getFrame = () => {
      switch (frameType) {
        case "none":
          return <div className="p-0">{children}</div>;
        case "border":
          return <div className="p-0 border">{children}</div>;
        case "scroll":
          return (
            <div
              className="p-0"
              style={{
                overflowY: "scroll",
                height: scrollHeight,
              }}
            >
              {children}
            </div>
          );
        case "borderScroll":
          return (
            <div
              className="p-0 border"
              style={{
                overflowY: "scroll",
                height: scrollHeight,
              }}
            >
              {children}
            </div>
          );
      }
    };

    return (
      <div className="col card px-0 mx-2 shadow-sm">
        {header == undefined ? (
          <></>
        ) : (
          <div className="card-header py-2 text-center">{header}</div>
        )}
        <div className="card-body p-1 overflow-visible bg-transparent">
          {" "}
          {getFrame()}
        </div>
        {footer == undefined ? (
          <></>
        ) : (
          <div className="card-footer text-center">{footer}</div>
        )}
      </div>
    );
  }
}

export default Panel;
