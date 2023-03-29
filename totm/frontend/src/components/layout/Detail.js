import React, { Fragment } from "react";
import { connect } from "react-redux";
import { v4 as uuid } from "uuid";

function Detail({ object, keys, agents }) {
  const keySets = {
    name: [{ dbField: "name", label: "Name" }],
    type: [{ dbField: "type", label: "Type" }],
    stats: [
      { dbField: "initiative", label: "Initiative" },
      { dbField: "initiative_bonus", label: "Init Bonus" },
      { dbField: "hit_points", label: "HP" },
      { dbfield: "max_hit_points", label: "Max HP" },
      { dbField: "armor_class", label: "AC" },
      { dbField: "attack_bonus", label: "Attack Bonus" },
      { dbField: "spell_save", label: "Spell Save" },
    ],
    saves: [
      { dbField: "str_save", label: "STR Save" },
      { dbField: "dex_save", label: "DEX Save" },
      { dbField: "con_save", label: "CON Save" },
      { dbField: "int_save", label: "INT Save" },
      { dbField: "wis_save", label: "WIS Save" },
      { dbField: "cha_save", label: "CHA Save" },
    ],
    passives: [
      { dbField: "passive_insight", label: "Passive Ins" },
      { dbField: "passive_investigation", label: "Passive Inv" },
      { dbField: "passive_perception", label: "Passive Per" },
    ],
    actions: [
      { dbField: "action", label: "Action" },
      { dbField: "move", label: "Move Action" },
      { dbField: "bonus", label: "Bonus Action" },
      { dbField: "reaction", label: "Reaction" },
      { dbField: "free", label: "Free Action" },
      { dbField: "exclamation", label: "Excalamation" },
    ],
    notes: [{ dbField: "notes", label: "Notes" }],
    aggro: [{ dbField: "aggro", label: "Current Aggro" }],
    timers: [
      { dbField: "timer_count", label: "Timer Count" },
      { dbField: "timer_term", label: "Timer Term" },
      { dbField: "reminder_text", label: "Reminder" },
    ],
  };

  const filteredFields = [];

  for (let i = 0; i < keys.length; i++) {
    const keySet = keys[i];
    filteredFields.push(...keySets[keySet]);
  }

  return filteredFields.map((field) => {
    if (field.dbField == "aggro" && object.aggro) {
      const aggro = agents.filter((agent) => {
        return parseInt(agent.id) == parseInt(object.aggro);
      })[0];
      return (
        <div key={uuid()} className="text-small">
          {field.label}:{" "}
          {aggro.alias ? aggro.name + " (" + aggro.alias + ")" : aggro.name}
          {}
        </div>
      );
    } else if (field.dbField == "timer_count") {
      return object.timer_count > 0 ? (
        <div key={uuid()} className="text-small">
          {field.label}: {object.timer_count}
          {}
        </div>
      ) : object.timer_count == 0 ? (
        <div key={uuid()} className="text-small">
          {field.label}: Final round
        </div>
      ) : (
        <Fragment key={uuid()}></Fragment>
      );
    } else if (object[field.dbField]) {
      return (
        <div key={uuid()} className="text-small">
          {field.label} : {object[field.dbField]}
        </div>
      );
    }
  });
}

const mapStateToProps = (state) => ({
  agents: state.agents.agents,
});

export default connect(mapStateToProps)(Detail);
