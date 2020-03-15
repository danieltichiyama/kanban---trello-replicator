import React, { Component } from "react";
import { connect } from "react-redux";
import {
  actionsCreateList,
  actionsUpdateBoard,
  actionsUpdateCard,
  actionsGetBoardData,
  actionsUpdateCardStore
} from "../../actions";
import List from "../List";
import BoardMenu from "../BoardMenu";
import styles from "./Board.module.scss";
import { DragDropContext } from "react-beautiful-dnd";

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = { board: { name: "" }, list: {}, showMenu: false };
  }

  // only need this during dev
  componentDidMount = () => {
    return this.props.dispatchGetBoardData(1);
  };

  toggleMenu = e => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    this.setState({ showMenu: !this.state.showMenu });
  };

  updateBoard = e => {
    e.preventDefault();
    let formData = {
      ...this.state.board,
      id: this.props.board_id
    };
    return this.props.dispatchUpdateBoard(formData);
  };

  createList = e => {
    e.preventDefault();
    let lists = this.props.lists;
    let position;
    if (lists.length === 0) {
      position = 1;
    } else {
      position = parseInt(parseFloat(lists[lists.length - 1].position) + 1);
    }
    let formData = {
      ...this.state.list,
      board_id: this.props.board_id,
      position
    };

    this.props.dispatchCreateList(formData);
    return this.setState({ list: { name: "" } });
  };

  handleBoardInput = e => {
    const { value, name } = e.target;
    return this.setState({ board: { [name]: value } });
  };

  handleListInput = e => {
    const { value, name } = e.target;
    return this.setState({ list: { [name]: value } });
  };

  handleInputClick = e => {
    const { placeholder } = e.target;
    return this.setState({ board: { name: placeholder } });
  };

  onDragEnd = result => {
    const { destination, source } = result;
    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    let cardsInOldList;

    // if card is moved to a new list
    if (destination.droppableId !== source.droppableId) {
      cardsInOldList = this.props.cards
        .filter(card => {
          return card.list_id === parseInt(source.droppableId);
        })
        .sort((a, b) => {
          return parseFloat(a.position) - parseFloat(b.position);
        });
    }

    // creates an array of the cards in the destination list
    let cardsInList = this.props.cards
      .filter(card => {
        return card.list_id === parseInt(destination.droppableId);
      })
      .sort((a, b) => {
        return parseFloat(a.position) - parseFloat(b.position);
      });

    const newCardsInList = [...cardsInList];

    // removes the card from it's old position in the list
    if (destination.droppableId !== source.droppableId) {
      if (newCardsInList.length === 0) {
        newCardsInList.push(cardsInOldList[source.index]);
      } else {
        newCardsInList.splice(
          destination.index,
          0,
          cardsInOldList[source.index]
        );
      }
      cardsInOldList.splice(source.index, 1);
    } else {
      newCardsInList.splice(source.index, 1);
      newCardsInList.splice(destination.index, 0, cardsInList[source.index]);
    }

    let newCard = this.updateCardPosition(newCardsInList, destination.index);

    if (destination.droppableId !== source.droppableId) {
      newCard.list_id = parseInt(destination.droppableId);
    }

    let formData = Object.assign(
      {},
      { id: newCard.id, list_id: newCard.list_id, position: newCard.position }
    );

    this.props.dispatchUpdateCardStore(formData);

    return this.props.dispatchUpdateCard(formData);
  };

  updateCardPosition = (array, destinationIndex) => {
    if (destinationIndex === 0) {
      if (array.length === 1) {
        array[0].position = "1.00";
      } else {
        array[destinationIndex].position = (
          parseFloat(array[1].position) / 2
        ).toString();
      }
    } else if (destinationIndex === array.length - 1) {
      array[destinationIndex].position = (
        parseFloat(array[destinationIndex - 1].position) + 1
      ).toString();
    } else {
      array[destinationIndex].position = (
        (parseFloat(array[destinationIndex - 1].position) +
          parseFloat(array[destinationIndex + 1].position)) /
        2
      ).toString();
    }

    return array[destinationIndex];
  };

  handleKeyPress = e => {
    if (e.key === "Enter") {
      return e.target.blur();
    }
  };

  render() {
    let boardStyle;
    if (this.props.boardImage && this.props.boardImage.url.startsWith("#")) {
      boardStyle = { backgroundColor: this.props.boardImage.url };
    } else if (this.props.boardImage) {
      boardStyle = {
        backgroundImage: `url(${this.props.boardImage.url})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat"
      };
    } else {
      boardStyle = { backgroundColor: "white" };
    }

    return (
      <div className={styles.Board} style={boardStyle}>
        <div className={styles.boardHeader}>
          {/* Board Name */}
          <form onSubmit={this.updateBoard}>
            <input
              className={styles.boardName}
              type="text"
              name="name"
              value={this.state.board.name}
              placeholder={this.props.name}
              onChange={this.handleBoardInput}
              onClick={this.handleInputClick}
              onKeyPress={this.handleKeyPress}
            />
          </form>
          <button onClick={this.toggleMenu} className={styles.boardMenuButton}>
            Show Menu
          </button>
        </div>

        {this.state.showMenu ? (
          <BoardMenu toggleMenu={this.toggleMenu} />
        ) : null}

        {/* Lists */}

        <ul className={styles.Lists}>
          <DragDropContext onDragEnd={this.onDragEnd}>
            {this.props.lists
              ? this.props.lists.map(list => {
                  if (list.is_archived) {
                    return null;
                  } else {
                    return (
                      <List
                        handleKeyPress={this.handleKeyPress}
                        list={list}
                        key={list.id}
                        cards={this.props.cards
                          .filter(card => {
                            return card.list_id === list.id;
                          })
                          .sort((a, b) => {
                            return (
                              parseFloat(a.position) - parseFloat(b.position)
                            );
                          })}
                      />
                    );
                  }
                })
              : null}
          </DragDropContext>

          {/* Add List */}
          <form onSubmit={this.createList} className={styles.addListForm}>
            <input
              className={styles.addList}
              name="name"
              value={this.state.list.name}
              placeholder="+ Add List"
              onChange={this.handleListInput}
              onKeyPress={this.handleKeyPress}
            />
          </form>
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    name: state.name,
    lists: state.lists,
    labels: state.labels,
    board_id: state.id,
    cards: state.cards,
    boardImage: state.boardImage,
    labelColors: state.initLabels
  };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatchCreateList: formData => {
      return dispatch(actionsCreateList(formData));
    },
    dispatchUpdateBoard: formData => {
      return dispatch(actionsUpdateBoard(formData));
    },
    dispatchUpdateCard: formData => {
      return dispatch(actionsUpdateCard(formData));
    },
    dispatchGetBoardData: boardID => {
      return dispatch(actionsGetBoardData(boardID));
    },
    dispatchUpdateCardStore: formData => {
      return dispatch(actionsUpdateCardStore(formData));
    }
  };
};

export default Board = connect(mapStateToProps, mapDispatchToProps)(Board);
