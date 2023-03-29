import React from "react";

export default function Icon({ icon, size, input, onClick, modal }) {
  const getIcon = (icon) => {
    const filenames = {
      pencil: "pencil",
      heart: "heart",
      shield: "shield",
      leftCaret: "caret-left-fill",
      rightCaret: "caret-right-fill",
      downCaret: "caret-down-fill",
      diagram: "diagram-3",
      plus: "plus-square",
      toggles: "toggles",
      gear: "gear",
    };
    return (
      <img
        src={"static/frontend/icons/" + filenames[icon] + ".svg"}
        className="opacity-50 no-pointer-events"
        height={size.toString()}
        width={size.toString()}
      />
    );
  };

  return (
    <div
      className="col-auto m-0 p-0 position-relative"
      data-bs-toggle={modal ? "modal" : ""}
      data-bs-target={modal ? "#agent-control-modal" : ""}
      onClick={
        onClick
          ? () => {
              onClick();
            }
          : null
      }
    >
      {input ? input : <></>}
      {getIcon(icon)}
    </div>
  );
}
