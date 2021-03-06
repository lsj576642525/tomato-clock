import React from "react";
import { Checkbox } from "antd";
import { DeleteFilled } from "@ant-design/icons";
import { connect } from "react-redux";
import { editTodo, updateTodo } from "../../redux/actions";
import axios from "../../config/axios";
import classNames from "classnames";
import "./TodoItem.scss";

interface IState {
  editText: string;
}

interface IProps {
  id: number;
  description: string;
  completed: boolean;
  editing: boolean;
  updateTodo: (payload: any) => any;
  editTodo: (id: number) => any;
}

class TodoItem extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      editText: this.props.description,
    };
  }

  editTodo = () => {
    this.props.editTodo(this.props.id);
  };

  updateTodo = async (params: any) => {
    if (params.completed) {
      params.completed_at = new Date();
    }
    try {
      const response = await axios.put(`todos/${this.props.id}`, params);

      this.props.updateTodo(response.data.resource);
    } catch (error) {}
  };

  onKeyUp = (e: any) => {
    if (e.keyCode === 13 && this.state.editText !== "") {
      this.updateTodo({ description: this.state.editText });
    }
  };

  render() {
    const Editing = (
      <div className="editing">
        <input
          value={this.state.editText}
          onChange={(e) => this.setState({ editText: e.target.value })}
          onKeyUp={this.onKeyUp}
        ></input>
        <div className="iconWrapper">
          <DeleteFilled onClick={() => this.updateTodo({ deleted: true })} />
        </div>
      </div>
    );
    const Text = (
      <span className="text" onClick={this.editTodo}>
        {this.props.description}
      </span>
    );
    const todoItemClass = classNames({
      TodoItem: true,
      editing: this.props.editing,
      completed: this.props.completed,
    });
    return (
      <div className={todoItemClass} id="TodoItem">
        <Checkbox
          checked={this.props.completed}
          onChange={(e: any) => {
            this.updateTodo({ completed: e.target.checked });
          }}
        />
        {this.props.editing ? Editing : Text}
      </div>
    );
  }
}

const mapStateToProps = (state: any, ownProps: any) => ({
  ...ownProps,
});

const mapDispatchToProps = { editTodo, updateTodo };

export default connect(mapStateToProps, mapDispatchToProps)(TodoItem);
