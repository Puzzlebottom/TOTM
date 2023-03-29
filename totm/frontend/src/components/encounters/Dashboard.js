import React, { Fragment } from "react";
import EncounterDeck from "./EncounterDeck";
import Modal from "../layout/Modal";
import EncounterForm from "./encounterForm";

export default function Dashboard() {
  return (
    <Fragment>
      <div className="row mb-3 text-center">
        <h3>ENCOUNTERS</h3>
      </div>
      <div className="row row-cols-3">
        <EncounterDeck />
      </div>
      <div className="row text-center">
        <div className="justify-content-center">
          <Modal
            button={"CREATE"}
            title={"CREATE ENCOUNTER"}
            id={"add-encounter"}
          >
            <EncounterForm />
          </Modal>
        </div>
      </div>
    </Fragment>
  );
}
