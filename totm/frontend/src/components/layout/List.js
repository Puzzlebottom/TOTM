import React, { Fragment } from "react";
import { connect } from "react-redux";
import Detail from "../layout/Detail";
import AgentControls from "../agents/AgentControls";

function List({
  content,
  type,
  differentiator,
  onClick,
  onDelete,
  doesCollapse,
  modal,
  collapseContent,
  doesStack,
  agents,
  encounterClusters,
}) {
  const collapseButton = (
    <div className="btn btn-sm m-0 p-0 text-center col-1 collapse-button">
      <img
        src="static/frontend/icons/caret-right-fill.svg"
        className="collapse-icon opacity-50"
      />
    </div>
  );

  const getDeleteButton = (id) => {
    return (
      <button
        type="button"
        className="btn-close delete-button"
        value={id}
        onClick={(e) => onDelete(e)}
      />
    );
  };

  const handleClick = (e) => {
    if (doesCollapse) {
      const isOpen = e.currentTarget.getAttribute("aria-expanded") == "true";
      const openIcon = "static/frontend/icons/caret-down-fill.svg";
      const closedIcon = "static/frontend/icons/caret-right-fill.svg";
      const icon = e.currentTarget.firstChild.firstChild;
      icon.setAttribute("src", isOpen ? openIcon : closedIcon);
    }
    onClick ? onClick(e) : null;
  };

  const counts = {};

  const getItems = (objects) => {
    const dbObjects = [];
    if (type == "agent") {
      objects.map((obj) =>
        dbObjects.push(...agents.filter((agent) => agent.id == obj.id))
      );
    } else if (type == "cluster") {
      objects.map((obj) =>
        dbObjects.push(
          ...encounterClusters.filter((cluster) => cluster.id == obj.id)
        )
      );
    }
    if (doesStack) {
      const unique = dbObjects.filter(
        (object, index, array) => array.indexOf(object) === index
      );
      dbObjects.forEach((object) => {
        counts[object.id] = (counts[object.id] || 0) + 1;
      });
      return unique;
    }
    return dbObjects;
  };

  return getItems(content).map((obj) => {
    const key = differentiator + obj.type + obj.id;
    const collapseKey = "collapse" + differentiator + obj.type + obj.id;

    const getCollapseContent = () => {
      return (
        <div
          className="collapse small border rounded-bottom shrink"
          id={collapseKey}
        >
          {collapseContent.includes("detail") ? (
            <Detail
              object={obj}
              keys={[
                "type",
                "stats",
                "saves",
                "passives",
                "notes",
                "aggro",
                "timers",
              ]}
            />
          ) : (
            <></>
          )}
          {collapseContent.includes("agentControl") ? (
            <div className="row m-0 p-1 align-items-center">
              <AgentControls agentId={obj.id} mini={true} />
            </div>
          ) : (
            <></>
          )}
        </div>
      );
    };

    return (
      <Fragment key={key}>
        <div
          id={"nametag-" + type + obj.id}
          className={
            "row border rounded align-items-baseline m-2 mb-1 name-tag text-start"
          }
          value={obj.id}
          data-bs-toggle={doesCollapse ? "collapse" : ""}
          data-bs-target={doesCollapse ? "#" + collapseKey : ""}
          onClick={handleClick}
        >
          {doesCollapse ? collapseButton : <></>}
          <div
            className="col-10 offset-md-2 px-1 m-0"
            value={obj.id}
            data-bs-toggle={modal ? "modal" : ""}
            data-bs-target={modal ? "#cluster-control-modal" : ""}
          >
            {obj.alias ? obj.name + " (" + obj.alias + ")" : obj.name}
          </div>
          {onDelete ? getDeleteButton(obj.id) : <></>}
          {doesStack && counts[obj.id] > 1 ? (
            <div className="col-2 col-xs-auto text-end">{counts[obj.id]}</div>
          ) : (
            <></>
          )}
        </div>
        {doesCollapse ? getCollapseContent() : <></>}
      </Fragment>
    );
  });
}

const mapStateToProps = (state) => ({
  agents: state.agents.agents,
  encounterAgents: state.encounters.encounterAgents,
  encounterClusters: state.encounters.encounterClusters,
});

export default connect(mapStateToProps)(List);
