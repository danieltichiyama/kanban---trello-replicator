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
    if (e.target.id) {
      let { name, id } = e.target;

      let formData = {
        color: name,
        name: this.state[name],
        board_id: this.props.board_id,
        id
      };
      console.log(formData);

      return this.props.dispatchUpdateLabel(formData);
    } else {
      let { name } = e.target;

      let formData = {
        color: name,
        name: this.state[name],
        board_id: this.props.board_id
      };
      console.log(formData);

      return this.props.dispatchCreateLabel(formData);
    }
  };

  handleLabelInput = e => {
    const { value, name } = e.target;
    return this.setState({ [name]: value });
  };

  render() {
    return (
      <div className={styles.LabelsMenu}>
        <h3>Labels</h3>
        {this.props.labels
          ? this.props.labels.map(label => {
              let color = { backgroundColor: label.color };
              return (
                <form
                  onSubmit={this.createOrUpdateLabel}
                  style={color}
                  key={label.color}
                  name={label.color}
                  id={label.id}
                >
                  <input
                    type="text"
                    name={label.color}
                    defaultValue={label.name}
                    value={this.state.name}
                    onChange={this.handleLabelInput}
                  />
                  <input type="submit" value="Edit" />
                </form>
              );
            })
          : null}

        {/* <form onSubmit={this.createLabel}>
          <input
            className={styles.AddLabel}
            name="name"
            value={this.state.list}
            placeholder="New Label"
            onChange={this.handleInput}
          />
          <input type="color" name="color" onChange={this.handleInput} />
          <input type="submit" value="Submit" />
        </form> */}
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
