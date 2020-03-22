import React, { Component } from "react";
import { connect } from "react-redux";
import { actionsToggleModal } from "../../actions";
import styles from "./Modals.module.scss";

class Modals extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: ""
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.showModal !== this.props.showModal) {
      return this.setState({ modal: this.props.showModal });
    }
  }

  toggleModal = () => {
    return this.props.dispatchToggleModal();
  };

  render() {
    switch (this.state.modal) {
      case "profile":
        return (
          <div className={styles.Modals} onClick={this.toggleModal}>
            Profile
          </div>
        );

      case "editCard":
        return (
          <div className={styles.Modals} onClick={this.toggleModal}>
            Edit Card
          </div>
        );

      case "addBoard":
        return (
          <div className={styles.Modals} onClick={this.toggleModal}>
            AddBoard
          </div>
        );

      default:
        return <div className={styles.Modals} onClick={this.toggleModal}></div>;
    }
  }
}

const mapStateToProps = state => {
  return {
    showModal: state.showModal
  };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatchToggleModal: () => {
      return dispatch(actionsToggleModal());
    }
  };
};

export default Modals = connect(mapStateToProps, mapDispatchToProps)(Modals);
