import React from "react";
import TodoInput from "./TodoInput";
import axios from "../../config/axios";
import TodoItem from "./TodoItem";
import { connect } from "react-redux";
import { initTodos } from "../../redux/actions";

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

  getTodos = async () => {
    try {
      const response = await axios.get("todos");
      const todos = response.data.resources.map((t: any) =>
        Object.assign({}, t, { editing: false })
      );
      this.props.initTodos(todos);
    } catch (e) {}
  };

  componentDidMount() {
    this.getTodos();
  }

  render() {
    return (
      <div>
        <TodoInput />
        <main>
          {this.unCompletedTodos.map((t: any) => (
            <TodoItem key={t.id} {...t} />
          ))}
          {this.completedTodos.map((t: any) => (
            <TodoItem key={t.id} {...t} />
          ))}
        </main>
      </div>
    );
  }
}

const mapStateToProps = (state: any, ownProps: any) => ({
  todos: state.todos,
  ...ownProps,
});

const mapDispatchToProps = { initTodos };

export default connect(mapStateToProps, mapDispatchToProps)(Todos);
