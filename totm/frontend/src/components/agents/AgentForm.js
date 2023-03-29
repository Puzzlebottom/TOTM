import React from "react";
import { connect } from "react-redux";
import { addAgent, updateAgent } from "../../actions/agents";
import { v4 as uuid } from "uuid";

function AgentForm({ selectedAgent, activeLink, addAgent, updateAgent }) {
  const editMode = selectedAgent && Object.keys(selectedAgent).length > 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const agent = Object.fromEntries(
      Object.entries(Object.fromEntries(formData.entries())).filter(
        ([_, v]) => v != ""
      )
    );

    if (editMode) {
      const id = parseInt(selectedAgent.id);
      updateAgent(id, agent);
    } else {
      addAgent(agent);
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
          defaultValue={selectedAgent[field]}
        />
      </div>
    );
  };

  return (
    <form className="px-3 h-100" onSubmit={handleSubmit} key={uuid()}>
      <div className="row mb-2 p-1 border justify-content-center">
        <div className="row mb-1 px-0">
          {basicInput("Name", "name", "text")}
        </div>
        {editMode ? (
          <div className="row mb-0 px-0">
            <div className="input-group input-group-sm px-0">
              <span className="input-group-text">Type</span>
              <select
                className="form-control"
                name="type"
                defaultValue={
                  editMode ? selectedAgent.type || "select" : activeLink
                }
              >
                <option value="select" disabled={true}>
                  Select Type
                </option>
                <option value="character">Character</option>
                <option value="npc">NPC</option>
                <option value="monster">Monster</option>
                <option value="event">Event</option>
              </select>
            </div>
          </div>
        ) : (
          <input type="hidden" name="type" defaultValue={activeLink} />
        )}
      </div>

      <div className="row mb-2 p-1 border justify-content-center">
        <div className="row mb-1 px-0 justify-content-between">
          <div className="col-3 mx-0 px-0">
            {basicInput("AC", "armor_class", "number")}
          </div>
          <div className="col-4 mx-0 px-0">
            {basicInput("HP", "hit_points", "number")}
          </div>
          <div className="col-3 mx-0 px-0">
            {basicInput("Max HP", "max_hit_points", "number")}
          </div>
        </div>

        <div className="row mb-0 px-0 justify-content-between">
          <div className="col-4 mx-0 px-0">
            {basicInput("Attack Bonus", "attack_bonus", "number")}
          </div>
          <div className="col mx-0 px-2">
            {basicInput("Spell Save", "spell_save", "number")}
          </div>
          <div className="col-4 mx-0 px-0">
            {basicInput("Initiative Bonus", "initiative_bonus", "number")}
          </div>
        </div>
      </div>

      <div className="row mb-2 p-1 border justify-content-center">
        <div className="row mb-1 px-0 justify-content-center small">SAVES</div>

        <div className="row mb-1 px-0 justify-content-between">
          <div className="col-3 mx-0 px-0">
            {basicInput("STR", "str_save", "number")}
          </div>
          <div className="col-3 mx-0 px-0">
            {basicInput("CON", "con_save", "number")}
          </div>
          <div className="col-3 mx-0 px-0">
            {basicInput("DEX", "dex_save", "number")}
          </div>
        </div>

        <div className="row mb-0 px-0 justify-content-between">
          <div className="col-3 mx-0 px-0">
            {basicInput("INT", "int_save", "number")}
          </div>
          <div className="col-3 mx-0 px-0">
            {basicInput("WIS", "wis_save", "number")}
          </div>
          <div className="col-3 mx-0 px-0">
            {basicInput("CHA", "cha_save", "number")}
          </div>
        </div>
      </div>

      <div className="row mb-2 p-1 border justify-content-center">
        <div className="row mb-1 px-0 justify-content-center small">
          PASSIVES
        </div>

        <div className="row mb-0 px-0 justify-content-between">
          <div className="col-3 mx-0 px-0">
            {basicInput("Insight", "passive_insight", "number")}
          </div>
          <div className="col-4 mx-0 px-0">
            {basicInput("Investigation", "passive_investigation", "number")}
          </div>
          <div className="col-4 mx-0 px-0">
            {basicInput("Perception", "passive_perception", "number")}
          </div>
        </div>
      </div>

      <div className="row mb-2 p-1 border justify-content-center">
        <div className="input-group input-group-sm px-0">
          <span className="input-group-text">Notes</span>
          <textarea
            key={"notes-input-" + selectedAgent.id}
            autoComplete="off"
            className="form-control"
            rows="4"
            name="notes"
            defaultValue={selectedAgent.notes}
          />
        </div>
      </div>

      <div className="h-25 d-flex align-items-end justify-content-center">
        <button
          type="submit"
          className="btn btn-primary col-5"
          data-bs-dismiss="modal"
        >
          {editMode ? "UPDATE" : "CREATE"}
        </button>
      </div>
    </form>
  );
}

const mapStateToProps = (state) => ({
  activeLink: state.navlinks.activeLink,
  selectedAgent: state.agents.selectedAgent,
});

export default connect(mapStateToProps, {
  addAgent,
  updateAgent,
})(AgentForm);
