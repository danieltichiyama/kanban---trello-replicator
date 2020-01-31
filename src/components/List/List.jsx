import React, { Component } from "react";
import styles from "./List.module.scss";
import { connect } from "react-redux";
import Card from "../Card";
import { actionsCreateCard, actionsUpdateList } from "../../actions";
import { Droppable } from "react-beautiful-dnd";

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: {}
    };
  }

  updateList = e => {
    e.preventDefault();
    let formData = { ...this.state.list, id: this.props.list.id };
    return this.props.dispatchUpdateList(formData);
  };

  createCard = e => {
    e.preventDefault();
    let cards = this.props.list.cards;
    let position;
    if (!this.props.list.cards || cards.length === 0) {
      position = 1;
    } else {
      position = parseInt(parseFloat(cards[cards.length - 1].position) + 1);
    }
    let formData = {
      ...this.state,
      list_id: this.props.list.id,
      position,
      created_by: 1
    };

    if (formData.list) {
      delete formData.list;
    }

    this.props.dispatchCreateCard(formData);
    return this.setState({ name: "" });
  };

  handleCardInput = event => {
    const { value, name } = event.target;
    return this.setState({ [name]: value });
  };

  handleListInput = e => {
    const { value, name } = e.target;

    return this.setState({ list: { [name]: value } });
  };

  render() {
    return (
      <div className={styles.List}>
        <li className={styles.List} key={this.props.list.id}>
          <form onSubmit={this.updateList}>
            <input
              type="text"
              defaultValue={this.props.list.name}
              placeholder={this.props.list.name}
              onChange={this.handleListInput}
              value={this.state.list.name}
              name="name"
            />
            <input type="submit" value="Change" />
          </form>
          <ul>
            <Droppable droppableId={this.props.list.id.toString()}>
              {provided => {
                return (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    {this.props.cards
                      ? this.props.cards.map((card, index) => {
                          return (
                            <Card card={card} key={card.id} index={index} />
                          );
                        })
                      : null}
                    {provided.placeholder}
                  </div>
                );
              }}
            </Droppable>
            <li className={styles.AddCard}>
              <form onSubmit={this.createCard}>
                <input
                  type="text"
                  name="name"
                  value={this.state.name}
                  placeholder="+ Add Card"
                  onChange={this.handleCardInput}
                />
                <input type="submit" value="Add" />
              </form>
            </li>
          </ul>
        </li>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchCreateCard: formData => {
      dispatch(actionsCreateCard(formData));
    },
    dispatchUpdateList: formData => {
      dispatch(actionsUpdateList(formData));
    }
  };
};

export default List = connect(null, mapDispatchToProps)(List);
