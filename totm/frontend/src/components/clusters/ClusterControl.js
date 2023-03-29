import React, { Component } from "react";
import { connect } from "react-redux";
import Modal from "../layout/Modal";
import Panel from "../layout/Panel";
import SelectBar from "../layout/SelectBar";
import SearchBar from "../layout/SearchBar";
import List from "../layout/List";
import AgentToggle from "./AgentToggle";
import ClusterForm from "./ClusterForm";
import {
  addCluster,
  deleteCluster,
  updateCluster,
  selectCluster,
} from "../../actions/clusters";

export class ClusterControl extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectField: "select",
      searchField: "",
      panel: "detail",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handlePanelSwitch = this.handlePanelSwitch.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  static propTypes = {};

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handlePanelSwitch = (e) => {
    if (e.target.value == "add") {
      this.handleSelect(null);
    }
    this.setState({
      selectField: "select",
      searchField: "",
      panel: e.target.value,
    });
  };

  handleSelect = (e) => {
    if (e == null) {
      this.props.selectCluster(null);
    } else {
      e.stopPropagation();
      this.props.selectCluster(parseInt(e.target.getAttribute("value")));
      this.setState({ panel: "detail" });
    }
  };

  handleDelete = (e) => {
    e.stopPropagation();
    this.props.deleteCluster(parseInt(e.target.getAttribute("value")));
  };

  render() {
    const { selectedCluster, encounterClusters } = this.props;
    const { selectField, searchField, panel } = this.state;

    const isSelected =
      selectedCluster && Object.keys(selectedCluster).length !== 0;

    const filteredClusters =
      selectField == "all" || selectField == "select"
        ? encounterClusters.filter((cluster) => {
            return cluster.name
              .toLowerCase()
              .includes(searchField.toLowerCase());
          })
        : encounterClusters.filter((cluster) => {
            return (
              cluster.type == selectField &&
              cluster.name.toLowerCase().includes(searchField.toLowerCase())
            );
          });

    const getHeader = () => {
      const options = [
        "all",
        "faction",
        "location",
        "condition",
        "status",
        "timer",
      ];
      return (
        <div>
          <SelectBar
            options={options}
            fieldState={selectField}
            onChange={this.handleChange}
          />
          <SearchBar onChange={this.handleChange} />
        </div>
      );
    };

    const detailPanel = (
      <Panel
        key={selectedCluster.id}
        header={
          isSelected ? selectedCluster.name.toUpperCase() : "CLUSTER DETAIL"
        }
        footer={
          <button
            className="btn btn-primary"
            value={"edit"}
            disabled={
              !selectedCluster || Object.keys(selectedCluster).length === 0
            }
            onClick={this.handlePanelSwitch}
          >
            EDIT
          </button>
        }
        frameType={"borderScroll"}
        scrollHeight={"58vh"}
      >
        {isSelected ? <AgentToggle /> : <div>Select a Cluster</div>}
      </Panel>
    );

    const formPanel = (
      <Panel
        key={selectedCluster.id}
        header={
          isSelected
            ? "EDIT " + selectedCluster.name.toUpperCase()
            : panel == "edit"
            ? "EDIT CLUSTER"
            : "CREATE CLUSTER"
        }
        frameType={"scroll"}
        scrollHeight={"66vh"}
        panelSwitch={(e) => this.handlePanelSwitch(e)}
      >
        <ClusterForm />
      </Panel>
    );

    return (
      <Modal
        button={"MANAGE CLUSTERS"}
        onClick={() => this.handleSelect(null)}
        title={"CLUSTER CONTROL"}
        id={"add-cluster"}
      >
        <div className="col-4 mx-1 p-0">
          <Panel
            header={getHeader()}
            footer={
              <button
                className="btn btn-primary"
                value={"add"}
                onClick={this.handlePanelSwitch}
              >
                NEW CLUSTER
              </button>
            }
            frameType={"borderScroll"}
            scrollHeight={"52vh"}
          >
            <List
              content={filteredClusters}
              type={"cluster"}
              differentiator={"ClusterControl"}
              onClick={this.handleSelect}
              onDelete={this.handleDelete}
            />
          </Panel>
        </div>
        <div className="col mx-1 p-0">
          {panel == "detail" ? detailPanel : formPanel}
        </div>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => ({
  selectedEncounter: state.encounters.selectedEncounter,
  encounterAgents: state.encounters.encounterAgents,
  encounterClusters: state.encounters.encounterClusters,
  selectedCluster: state.clusters.selectedCluster,
});

export default connect(mapStateToProps, {
  addCluster,
  deleteCluster,
  updateCluster,
  selectCluster,
})(ClusterControl);
