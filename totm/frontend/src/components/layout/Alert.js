import React, { Component, Fragment } from "react";
import { ToastContainer, Zoom, toast } from "react-toastify";
import { connect } from "react-redux";
import PropTypes from "prop-types";

export class Alert extends Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    error: PropTypes.object.isRequired,
    message: PropTypes.object,
    reminder: PropTypes.object,
    inGame: PropTypes.bool.isRequired,
  };

  componentDidUpdate(prevProps) {
    const { error, message, reminder, inGame } = this.props;
    if (error != prevProps.error) {
      if (error.msg.name) toast.error(`Name: ${error.msg.name.join()}`);
      if (error.msg.username)
        toast.error(`Username: ${error.msg.username.join()}`);
      if (error.msg.password)
        toast.error(`Password: ${error.msg.password.join()}`);
      if (error.msg.description)
        toast.error(`Description: ${error.msg.description.join()}`);
      if (error.msg.non_field_errors)
        toast.error(error.msg.non_field_errors.join());
    }

    if (message != prevProps.message && !inGame) {
      if (message.addEncounter) toast.success(message.addEncounter);
      if (message.deleteEncounter) toast.success(message.deleteEncounter);
      if (message.passwordNotMatch) toast.error(message.passwordNotMatch);

      if (message.addAgent) toast.success(message.addAgent);
      if (message.importAgent)
        toast.success(message.importAgent, { toastId: "import" });
      if (message.updateAgent)
        toast.success(message.updateAgent, { toastId: "updateAgent" });
      if (message.deleteAgent) toast.success(message.deleteAgent);

      if (message.addCluster) toast.success(message.addCluster);
      if (message.updateCluster)
        toast.success(message.updateCluster, { toastId: "updateCluster" });
      if (message.deleteCluster) toast.success(message.deleteCluster);

      if (message.clusterAgent)
        toast.success(message.clusterAgent, { toastId: "clusterAgent" });
    }

    if (reminder != prevProps.reminder && inGame) {
      if (reminder.turnEndReminder)
        toast.info(reminder.turnEndReminder, {
          className: "game-reminder mx-2 mb-0 name-tag-glow",
        });
      if (reminder.turnStartReminder)
        toast.info(reminder.turnStartReminder, {
          className: "game-reminder mx-2 mb-0 name-tag-glow",
        });
    }
  }

  render() {
    const standardToast = (
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    );

    const inGameToast = (
      <ToastContainer
        style={{
          display: "flex",
          flexDirection: "row",
          width: "max-content",
        }}
        transition={Zoom}
        position="bottom-left"
        autoClose={false}
        hideProgressBar
        closeOnClick
        closeButton={false}
        icon={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
        theme="light"
      />
    );

    return (
      <Fragment>{this.props.inGame ? inGameToast : standardToast}</Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  error: state.errors,
  message: state.messages.message,
  reminder: state.messages.reminder,
  inGame: state.messages.inGame,
});

export default connect(mapStateToProps)(Alert);
