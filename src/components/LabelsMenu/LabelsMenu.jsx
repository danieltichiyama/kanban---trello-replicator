import React, { Component } from "react";
import { connect } from "react-redux";
import styles from "./LabelsMenu.module.scss";
import { actionsCreateLabel } from "../../actions";

class LabelsMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  createLabel = e => {
    e.preventDefault();
    let formData = {
      ...this.state,
      board_id: this.props.board_id
    };
    this.props.dispatchCreateLabel(formData);
    return this.setState({ name: "" });
  };

  handleInput = event => {
    const { value, name } = event.target;
    return this.setState({ [name]: value });
  };

  render() {
    return (
      <div className={styles.LabelsMenu}>
        <h3>Labels</h3>
        {this.props.labels
          ? this.props.labels.map(label => {
              let color = { backgroundColor: label.color };
              return <div style={color}>{label.name}</div>;
            })
          : null}

        <form onSubmit={this.createLabel}>
          <input
            className={styles.AddLabel}
            name="name"
            value={this.state.list}
            placeholder="New Label"
            onChange={this.handleInput}
          />
          <input type="color" name="color" onChange={this.handleInput} />
          <input type="submit" value="Submit" />
        </form>
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
    }
  };
};

export default LabelsMenu = connect(
  mapStateToProps,
  mapDispatchToProps
)(LabelsMenu);
