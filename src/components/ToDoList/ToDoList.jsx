import React, { Component } from "react";
import styles from "./ToDoList.module.scss";
import { connect } from "react-redux";
import { actionsGetUser } from "../../actions";
import AssignedCard from "../AssignedCard";

class ToDoList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = () => {
    let id = JSON.parse(sessionStorage.getItem("user")).id;
    return this.props.dispatchGetUser(id);
  };

  handleKeyPress = e => {
    if (e.key === "Enter") {
      return e.target.blur();
    }
  };

  render() {
    return (
      <div className={styles.ToDoList}>
        {!this.props.cardsAssigned ? (
          <div className={styles.noCards}>No cards assigned</div>
        ) : (
          this.props.cardsAssigned.map((card, index) => {
            return (
              <AssignedCard
                card={card}
                key={index}
                handleKeyPress={this.handleKeyPress}
              />
            );
          })
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    cardsAssigned: state.cardsAssigned
  };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatchGetUser: userID => {
      return dispatch(actionsGetUser(userID));
    }
  };
};

export default ToDoList = connect(
  mapStateToProps,
  mapDispatchToProps
)(ToDoList);
