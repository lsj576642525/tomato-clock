import React from "react";
import TodoInput from "./TodoInput";
import TodoItem from "./TodoItem";
import { connect } from "react-redux";
import "./Todos.scss";

// interface IState {
//   todos: any[];
// }

class Todos extends React.Component<any> {
  constructor(props: any) {
    super(props);
    this.state = {
      todos: [],
    };
  }

  get unDeletedTodos() {
    return this.props.todos.filter((t: any) => !t.deleted);
  }

  get unCompletedTodos() {
    return this.unDeletedTodos.filter((t: any) => !t.completed);
  }

  get completedTodos() {
    return this.unDeletedTodos.filter((t: any) => t.completed);
  }

  render() {
    return (
      <div className="Todos" id="Todos">
        <TodoInput />
        <div className="todoLists">
          {this.unCompletedTodos.map((t: any) => (
            <TodoItem key={t.id} {...t} />
          ))}
          {/* {this.completedTodos.map((t: any) => (
            <TodoItem key={t.id} {...t} />
          ))} */}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: any, ownProps: any) => ({
  todos: state.todos,
  ...ownProps,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Todos);
