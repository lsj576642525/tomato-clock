import React from "react";
import TodoInput from "./TodoInput";
import axios from "../../config/axios";
import TodoItem from "./TodoItem";
import { connect } from "react-redux";
import { addTodo } from "../../redux/actions";

interface IState {
  todos: any[];
}

class Todos extends React.Component<any, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      todos: [],
    };
  }

  get unDeletedTodos() {
    return this.state.todos.filter((t) => !t.deleted);
  }

  get unCompletedTodos() {
    return this.unDeletedTodos.filter((t) => !t.completed);
  }

  get completedTodos() {
    return this.unDeletedTodos.filter((t) => t.completed);
  }

  addTodo = async (params: any) => {
    const { todos } = this.state;
    try {
      const response = await axios.post("todos", params);
      this.setState({ todos: [response.data.resource, ...todos] });
    } catch (e) {}
  };

  getTodos = async () => {
    try {
      const response = await axios.get("todos");
      console.log(response);
      this.setState({ todos: response.data.resources });
    } catch (e) {}
  };

  componentDidMount() {
    this.getTodos();
  }

  updateTodo = async (id: number, params: any) => {
    const { todos } = this.state;
    try {
      const response = await axios.put(`todos/${id}`, params);
      const newTodos = todos.map((t) => {
        if (id === t.id) {
          return response.data.resource;
        } else {
          return t;
        }
      });
      this.setState({ todos: newTodos });
    } catch (error) {}
  };

  toEditing = (id: number) => {
    const { todos } = this.state;
    const newTodos = todos.map((t) => {
      if (id === t.id) {
        return Object.assign({}, t, { editing: true });
      } else {
        return Object.assign({}, t, { editing: false });
      }
    });
    this.setState({ todos: newTodos });
  };

  render() {
    return (
      <div>
        <TodoInput />
        <main>
          {this.unCompletedTodos.map((t) => (
            <TodoItem
              key={t.id}
              {...t}
              update={this.updateTodo}
              toEditing={this.toEditing}
            />
          ))}
          {this.completedTodos.map((t) => (
            <TodoItem
              key={t.id}
              {...t}
              update={this.updateTodo}
              toEditing={this.toEditing}
            />
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

const mapDispatchToProps = { addTodo };

export default connect(mapStateToProps, mapDispatchToProps)(Todos);
