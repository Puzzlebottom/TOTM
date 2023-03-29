import React from "react";
import { connect } from "react-redux";
import { addCluster, updateCluster } from "../../actions/clusters";
import { v4 as uuid } from "uuid";

function ClusterForm({
  selectedEncounter,
  selectedCluster,
  activeAgent,
  owned,
  addCluster,
  updateCluster,
}) {
  const editMode = selectedCluster && Object.keys(selectedCluster).length > 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    const cluster = Object.fromEntries(
      Object.entries(Object.fromEntries(formData.entries())).filter(
        ([_, v]) => v != ""
      )
    );
    if (editMode) {
      const id = parseInt(selectedCluster.id);
      cluster.expiry = !cluster.expiry ? false : true;
      cluster.reminder_all_end = !cluster.reminder_all_end ? false : true;
      cluster.reminder_all_start = !cluster.reminder_all_start ? false : true;
      cluster.reminder_member_end = !cluster.reminder_member_end ? false : true;
      cluster.reminder_member_start = !cluster.reminder_member_start
        ? false
        : true;
      cluster.reminder_owner_end = !cluster.reminter_owner_end ? false : true;
      cluster.reminder_owner_start = !cluster.reminder_owner_start
        ? false
        : true;
      updateCluster(id, cluster);
    } else {
      const encounter = parseInt(selectedEncounter.id);
      cluster.encounter = encounter;
      addCluster(cluster);
    }
  };

  const basicInput = (label, field, type) => {
    return (
      <div className="input-group input-group-sm px-0">
        <span className="input-group-text">{label}</span>
        <input
          type={type}
          autoComplete="off"
          className="form-control"
          name={field}
          defaultValue={selectedCluster[field]}
        />
      </div>
    );
  };

  const selectInput = (label, field, options) => {
    return (
      <div className="input-group input-group-sm px-0">
        <span className="input-group-text">{label}</span>
        <select
          className="form-control"
          name={field}
          defaultValue={
            editMode ? selectedCluster[field] || "select" : "select"
          }
        >
          <option value="select" disabled={true}></option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    );
  };

  const checkboxInput = (label, field) => {
    return (
      <div className="col form-check form-switch text-start">
        <input
          className="form-check-input"
          type="checkbox"
          name={field}
          defaultChecked={selectedCluster[field]}
        />
        <label className="form-check-label small">{label}</label>
      </div>
    );
  };

  return (
    <form className="px-3 h-100" onSubmit={handleSubmit} key={uuid()}>
      <div className="row mb-2 p-1 border justify-content-center">
        <div className="row mb-1 px-0">
          {basicInput("Name", "name", "text")}
        </div>
        <div className="row mb-0 px-0">
          {selectInput("Type", "type", [
            "faction",
            "location",
            "condition",
            "status",
            "timer",
          ])}
        </div>
        {owned ? (
          <input type="hidden" name="owner_id" defaultValue={activeAgent.id} />
        ) : (
          <></>
        )}
      </div>

      <div className="row mb-2 p-1 border justify-content-center">
        <div className="row mb-1 px-0 justify-content-between">
          <div className="col-6 mx-0 px-0">
            {selectInput("Timer Term", "timer_term", [
              "indefinite",
              "until timer end",
              "at timer end",
            ])}
          </div>
          <div className="col-5 mx-0 px-0">
            {basicInput("Timer Count", "timer_count", "number")}
          </div>
        </div>
      </div>

      <div className="row mb-2 p-1 border justify-content-around">
        <div className="input-group input-group-sm px-0">
          <span className="input-group-text">Reminder</span>
          <textarea
            key={"reminder-input-" + selectedCluster.id}
            autoComplete="off"
            className="form-control"
            rows="2"
            name="reminder_text"
            defaultValue={selectedCluster.reminder_text}
          />
        </div>
        <div className="row row-cols-2 input-group input-group-sm">
          {checkboxInput("Start of owner turn", "reminder_owner_start")}
          {checkboxInput("End of owner turn", "reminder_owner_end")}
          {checkboxInput("Start of members' turns", "reminder_member_start")}
          {checkboxInput("End of members' turns", "reminder_member_end")}
          {checkboxInput("Start of any turn", "reminder_all_start")}
          {checkboxInput("End of any turn", "reminder_all_end")}
          {checkboxInput("Start of round", "reminder_round_start")}
          {checkboxInput("End of round", "reminder_round_end")}
        </div>
      </div>

      <div className="row mb-2 p-1 border justify-content-center">
        <div className="input-group input-group-sm">
          {checkboxInput("Remove this cluster at timer expiry?", "expiry")}
        </div>
      </div>

      <div className="d-flex flex-column align-items-center">
        <button
          type="submit"
          className="btn btn-primary col-5 mt-auto"
          data-bs-dismiss="modal"
        >
          {editMode ? "UPDATE" : "CREATE"}
        </button>
      </div>
    </form>
  );
}

const mapStateToProps = (state) => ({
  selectedEncounter: state.encounters.selectedEncounter,
  selectedCluster: state.clusters.selectedCluster,
  activeAgent: state.agents.activeAgent,
});

export default connect(mapStateToProps, { addCluster, updateCluster })(
  ClusterForm
);
