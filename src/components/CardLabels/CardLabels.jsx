import React, { Component } from "react";
import styles from "./CardLabels.module.scss";
import { connect } from "react-redux";
import { actionsAddLabels } from "../../actions";

class CardLabels extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  addLabels = e => {
    e.preventDefault();
    let formData = {
      card_id: this.props.card.id,
      label_ids: []
    };

    for (let key in this.state) {
      if (this.state[key]) {
        formData.label_ids.push(this.state[key].id);
      }
    }

    this.props.dispatchAddLabels(formData);
    return this.props.toggleLabelsMenu();
  };

  toggleSelect = e => {
    let { name } = e.target;

    if (this.state[name]) {
      return this.setState({ [name]: false });
    } else {
      return this.setState({ [name]: this.props.labels[name] });
    }
  };

  componentDidMount = () => {
    let labels = { ...this.props.labels };
    let cardLabels = [...this.props.card.labels];

    for (let key in labels) {
      labels[key] = false;
    }

    for (let i = 0; i < cardLabels.length; i++) {
      labels[cardLabels[i].color] = cardLabels[i];
    }

    return this.setState(labels);
  };

  render() {
    return (
      <div className={styles.CardLabels}>
        {/* Close button */}
        <div className={styles.cardLabelsHeader}>
          <h5>Labels</h5>
          <button
            onClick={this.props.toggleLabelsMenu}
            className={styles.exitButton}
          />
        </div>

        {/* Label Selector */}
        <form onSubmit={this.addLabels} className={styles.cardLabelsForm}>
          {Object.values(this.props.labels).map(label => {
            if (label.hasOwnProperty("id")) {
              let color = { backgroundColor: label.color };
              return (
                <label
                  key={label.color}
                  style={color}
                  className={styles.checkboxLabel}
                  onClick={this.toggleSelect}
                  name={label.color}
                >
                  <input
                    type="checkbox"
                    name={label.color}
                    value={label.color}
                    checked={this.state[label.color]}
                    className={styles.checkboxInput}
                  />
                  <span className={styles.checkboxCustom}></span>
                  {label.name}
                </label>
              );
            }
            return null;
          })}
          <input type="submit" value="Save" className={styles.saveButton} />
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchAddLabels: formData => {
      return dispatch(actionsAddLabels(formData));
    }
  };
};

export default CardLabels = connect(null, mapDispatchToProps)(CardLabels);
