import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import {
  getEncounters,
  deleteEncounter,
  selectEncounter,
} from "../../actions/encounters";

export class EncounterDeck extends Component {
  constructor(props) {
    super(props);

    this.handleSelect = this.handleSelect.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  static propTypes = {
    encounters: PropTypes.array.isRequired,
    getEncounters: PropTypes.func.isRequired,
    deleteEncounter: PropTypes.func.isRequired,
    selectEncounter: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.getEncounters();
    this.props.selectEncounter(null);
  }

  handleSelect = (e) => {
    const id = parseInt(e.currentTarget.getAttribute("value"));
    this.props.selectEncounter(id);
  };

  handleDelete = (e) => {
    e.stopPropagation();
    e.preventDefault();
    this.props.deleteEncounter(e.currentTarget.value);
  };

  render() {
    return (
      <Fragment>
        {this.props.encounters.map((encounter) => {
          return (
            <div key={"encounter" + encounter.id} className="col-4 m-0 p-0">
              <Link
                to="/encounter"
                value={encounter.id}
                onClick={this.handleSelect}
                className="card rounded-3 shadow-sm mb-3 mx-3 p-0 text-decoration-none text-dark encounter-card"
              >
                <div className="card-header text-center">
                  <h4 className="my-0 fw-normal">{encounter.name}</h4>
                  <button
                    type="button"
                    className="btn-close delete-button"
                    value={encounter.id}
                    onClick={this.handleDelete}
                  ></button>
                </div>
                <div className="card-body">{encounter.description}</div>
              </Link>
            </div>
          );
        })}
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  encounters: state.encounters.encounters,
});

export default connect(mapStateToProps, {
  getEncounters,
  deleteEncounter,
  selectEncounter,
})(EncounterDeck);
