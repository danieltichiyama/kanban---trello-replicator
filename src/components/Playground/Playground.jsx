import React, { Component } from "react";
import styles from "./Playground.module.scss";
import CardMenu from "../CardMenu";
import { connect } from "react-redux";
import { actionsGetBoardData } from "../../actions";

class Playground extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = () => {
    return this.props.dispatchGetBoardData(1);
  };

  render() {
    return (
      <div className={styles.Playground}>
        <CardMenu></CardMenu>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {};
};
const mapDispatchToProps = dispatch => {
  return {
    dispatchGetBoardData: data => {
      return dispatch(actionsGetBoardData(data));
    }
  };
};

export default Playground = connect(
  mapStateToProps,
  mapDispatchToProps
)(Playground);
