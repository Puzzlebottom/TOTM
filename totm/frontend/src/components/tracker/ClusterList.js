import React, { Component, Children } from "react";
import { connect } from "react-redux";
import Panel from "../layout/Panel";
import List from "../layout/List";
import AgentToggle from "../clusters/AgentToggle";
import ClusterForm from "../clusters/ClusterForm";
import SelectBar from "../layout/SelectBar";
import SearchBar from "../layout/SearchBar";
import Modal from "../layout/Modal";
import { selectCluster, deleteCluster } from "../../actions/clusters";

export class ClusterList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectField: "select",
      searchField: "",
    };

    this.onChange = this.onChange.bind(this);
    this.handleSelectCluster = this.handleSelectCluster.bind(this);
    this.handleDeleteCluster = this.handleDeleteCluster.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSelectCluster(e) {
    e.preventDefault();
    e.stopPropagation();
    this.props.selectCluster(parseInt(e.target.getAttribute("value")));
  }

  handleDeleteCluster(e) {
    e.preventDefault();
    e.stopPropagation();
    this.props.deleteCluster(parseInt(e.target.getAttribute("value")));
  }

  handleSubmit(e) {}

  render() {
    const { encounterClusters, selectedCluster } = this.props;

    const filteredClusters =
      this.state.selectField == "all" || this.state.selectField == "select"
        ? encounterClusters.filter((cluster) => {
            return cluster.name
              .toLowerCase()
              .includes(this.state.searchField.toLowerCase());
          })
        : encounterClusters.filter((cluster) => {
            return (
              cluster.type == this.state.selectField &&
              cluster.name
                .toLowerCase()
                .includes(this.state.searchField.toLowerCase())
            );
          });

    const newClusterButton = (
      <button
        className="btn btn-primary py-1"
        data-bs-toggle="modal"
        data-bs-target="#new-cluster-modal"
        onClick={() => this.props.selectCluster(null)}
      >
        NEW CLUSTER
      </button>
    );

    return (
      <Panel
        header={
          <div>
            <div className="mb-1">CLUSTERS</div>
            <SelectBar
              options={[
                "all",
                "faction",
                "location",
                "condition",
                "status",
                "timer",
              ]}
              stateName={"selectField"}
              fieldState={this.state.selectField}
              onChange={this.onChange}
            />
            <SearchBar stateName={"searchField"} onChange={this.onChange} />
          </div>
        }
        footer={newClusterButton}
        frameType={"borderScroll"}
        scrollHeight={"47vh"}
      >
        <List
          content={filteredClusters}
          type={"cluster"}
          differentiator={"ClusterList"}
          onClick={this.handleSelectCluster}
          onDelete={this.handleDeleteCluster}
          modal={true}
        />
        <div id="cluster-control-modal" className="modal fade" role="dialog">
          <div
            className={
              Children.count(this.props.children) == 1
                ? "modal-dialog"
                : "modal-dialog modal-lg"
            }
          >
            <div className="modal-content">
              <div className="modal-header py-0 justify-content-center">
                <div className="fs-5 m-1">
                  {selectedCluster ? selectedCluster.name : ""}
                </div>
              </div>
              <div className="modal-body row">
                <div className="col-4 mx-1 p-0">
                  <Panel frameType={"scroll"} scrollHeight={"80vh"}>
                    <AgentToggle />
                  </Panel>
                </div>
                <div className="col mx-1 p-0">
                  <Panel frameType={"scroll"} scrollHeight={"80vh"}>
                    <ClusterForm />
                  </Panel>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="new-cluster-modal" className="modal fade" role="dialog">
          <div className={"modal-dialog"}>
            <div className="modal-content">
              <div className="modal-header py-0 justify-content-center">
                <div className="fs-5 m-1">NEW CLUSTER</div>
              </div>
              <div className="modal-body row">
                <div className="col mx-1 p-0">
                  <Panel frameType={"none"} scrollHeight={"65vh"}>
                    <ClusterForm />
                  </Panel>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Panel>
    );
  }
}

const mapStateToProps = (state) => ({
  encounterClusters: state.encounters.encounterClusters,
  selectedCluster: state.clusters.selectedCluster,
});

export default connect(mapStateToProps, { selectCluster, deleteCluster })(
  ClusterList
);
