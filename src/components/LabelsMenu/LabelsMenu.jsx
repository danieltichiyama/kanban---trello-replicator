import React, { Component } from "react";
import { connect } from "react-redux";
import styles from "./LabelsMenu.module.scss";
import { actionsCreateLabel, actionsUpdateLabel } from "../../actions";

class LabelsMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      "#61be4f": { color: "#61be4f" },
      "#f2d600": { color: "#f2d600" },
      "#ff9f1a": { color: "#ff9f1a" },
      "#eb5946": { color: "#eb5946" },
      "#c377e0": { color: "#c377e0" },
      "#0079bf": { color: "#0079bf" },
      "#00c2e0": { color: "#00c2e0" },
      "#ff77cb": { color: "#ff77cb" },
      "#344562": { color: "#344562" }
    };
  }

  componentDidMount = () => {
    let state = { ...this.state };
    let { labels } = this.props;
    for (let i = 0; i < labels.length; i++) {
      state[labels[i].color] = labels[i];
    }
    return this.setState(state);
  };

  createOrUpdateLabel = e => {
    e.preventDefault();
    // update
    if (e.target.id) {
      let { name, id } = e.target;

      let formData = {
        color: name,
        name: this.state[name].name,
        board_id: this.props.board_id,
        id
      };
      return this.props.dispatchUpdateLabel(formData);
    } else {
      // create
      let { name } = e.target;

      let formData = {
        color: name,
        name: this.state[name].name,
        board_id: this.props.board_id
      };

      return this.props.dispatchCreateLabel(formData);
    }
  };

  handleLabelInput = e => {
    const { value, name } = e.target;
    let color = { ...this.state[name] };
    color.name = value;
    return this.setState({ [name]: color });
  };

  handleInputClick = e => {
    const { placeholder, name } = e.target;
    let color = { ...this.state[name] };
    if (placeholder) {
      color.name = placeholder;
      return this.setState({ [name]: color });
    } else {
      color.name = "";
      return this.setState({ [name]: color });
    }
  };

  render() {
    return (
      <div className={styles.LabelsMenu}>
        {/* Labels */}
        {Object.values(this.state).map(label => {
          let color = { backgroundColor: label.color };
          console.log(label.color);
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
                placeholder={label.name}
                value={this.state[label.color].name}
                onChange={this.handleLabelInput}
                onClick={this.handleInputClick}
              />
              <input type="submit" value="Edit" />
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
