import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addEncounter } from "../../actions/encounters";

export class EncounterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
    };

    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  static propTypes = {
    encounters: PropTypes.array.isRequired,
    addEncounter: PropTypes.func.isRequired,
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { name, description } = this.state;
    const encounter = { name, description };
    this.props.addEncounter(encounter);
    this.setState({ name: "", description: "" });
  };

  render() {
    const { name, description } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <div className="mb-2">
          <input
            autoComplete="off"
            autoFocus
            className="form-control"
            name="name"
            placeholder="Name your Encounter"
            type="text"
            onChange={this.onChange}
            value={name}
          />
        </div>
        <div className="mb-3">
          <textarea
            autoComplete="off"
            className="form-control"
            name="description"
            placeholder="Description"
            rows="4"
            onChange={this.onChange}
            value={description}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          data-bs-dismiss="modal"
        >
          CREATE
        </button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  encounters: state.encounters.encounters,
});

export default connect(mapStateToProps, {
  addEncounter,
})(EncounterForm);
