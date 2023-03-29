import React from "react";

export default function SelectBar({
  options,
  stateName,
  fieldState,
  onChange,
}) {
  return (
    <select
      className="form-control py-0 px-2 m-0 mb-2"
      name={stateName || "selectField"}
      value={fieldState}
      onChange={onChange}
    >
      <option value="select" disabled={true}>
        Select Type
      </option>
      {options.map((option) => (
        <option key={option} className="text-capitalize" value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}
