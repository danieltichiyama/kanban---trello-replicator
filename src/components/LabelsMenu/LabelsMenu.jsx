import React, { Component } from "react";
import { connect } from "react-redux";
import styles from "./LabelsMenu.module.scss";
import { actionsCreateLabel, actionsUpdateLabel } from "../../actions";

class LabelsMenu extends Component {
  constructor(props) {
    super(props);
    this.state = { labels: {} };
  }

  componentDidMount = () => {
    let stateLabels = {};

    for (let key in this.props.labels) {
      stateLabels[key] = this.props.labels[key].name;
    }
    return this.setState({ labels: { ...stateLabels } });
  };

  createOrUpdateLabel = e => {
    e.preventDefault();
    // update
    if (e.target.id) {
      let { name, id } = e.target;

      let formData = {
        color: name,
        name: this.state.labels[name],
        board_id: this.props.board_id,
        id
      };
      return this.props.dispatchUpdateLabel(formData);
    } else {
      // create
      let { name } = e.target;

      let formData = {
        color: name,
        name: this.state.labels[name],
        board_id: this.props.board_id
      };

      return this.props.dispatchCreateLabel(formData);
    }
  };

  handleLabelInput = e => {
    let { value, name } = e.target;

    return this.setState({ labels: { ...this.state.labels, [name]: value } });
  };

  handleColorInputBlur = e => {
    let { name } = e.target;
    console.log(name);

    return setTimeout(() => {
      return this.setState({ labels: { ...this.state.labels, [name]: "" } });
    }, 500);
  };

  render() {
    return (
      <div className={styles.LabelsMenu}>
        {/* Labels */}
        {Object.keys(this.state.labels).map(label => {
          let name = label;
          let value = this.state.labels[label];
          let color = { backgroundColor: name };
          let id = this.props.labels[label].id;
          return (
            <form
              onSubmit={this.createOrUpdateLabel}
              style={color}
              key={name}
              name={name}
              id={id}
              className={styles.labelForm}
              onBlur={this.handleColorInputBlur}
            >
              <input
                type="text"
                name={name}
                value={this.state.labels[label]}
                onChange={this.handleLabelInput}
                className={styles.labelFormTextInput}
              />
              <input
                type="submit"
                value={name ? "Edit" : "Save"}
                className={styles.submitButton}
              />
            </form>
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    board_id: state.id,
    labels: state.labels
  };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatchCreateLabel: formData => {
      return dispatch(actionsCreateLabel(formData));
    },
    dispatchUpdateLabel: formData => {
      return dispatch(actionsUpdateLabel(formData));
    }
  };
};

export default LabelsMenu = connect(
  mapStateToProps,
  mapDispatchToProps
)(LabelsMenu);
