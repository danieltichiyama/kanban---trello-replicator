import React, { Component } from "react";
import { connect } from "react-redux";
import styles from "./LabelsMenu.module.scss";
import { actionsCreateLabel, actionsUpdateLabel } from "../../actions";

class LabelsMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  createOrUpdateLabel = e => {
    e.preventDefault();
    // update
    if (e.target.id) {
      let { name, id } = e.target;

      let formData = {
        color: name,
        name: this.state[name],
        board_id: this.props.board_id,
        id
      };
      return this.props.dispatchUpdateLabel(formData);
    } else {
      // create
      let { name } = e.target;

      let formData = {
        color: name,
        name: this.state[name],
        board_id: this.props.board_id
      };

      return this.props.dispatchCreateLabel(formData);
    }
  };

  handleLabelInput = e => {
    const { value, name } = e.target;

    return this.setState({ [name]: value });
  };

  handleInputClick = e => {
    const { name, value } = e.target;
    return this.setState({ [name]: value });
  };

  render() {
    return (
      <div className={styles.LabelsMenu}>
        {/* Labels */}
        {Object.values(this.props.labels).map(label => {
          let color = { backgroundColor: label.color };
          return (
            <form
              onSubmit={this.createOrUpdateLabel}
              style={color}
              key={label.color}
              name={label.color}
              id={label.id}
              className={styles.labelForm}
            >
              <input
                type="text"
                name={label.color}
                defaultValue={label.name}
                onChange={this.handleLabelInput}
                onClick={this.handleInputClick}
                className={styles.labelFormTextInput}
              />
              <input
                type="submit"
                value={label.name ? "Edit" : "Save"}
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
