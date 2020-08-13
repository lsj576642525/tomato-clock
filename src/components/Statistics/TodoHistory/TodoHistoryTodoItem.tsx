import React from "react";
import { connect } from "react-redux";
import { format } from "date-fns";
import { updateTodo } from "../../../redux/actions";
import axios from "../../../config/axios";

interface IProps {
  todo: any;
  itemType: string;
  updateTodo: (payload: any) => void;
}

class TodoHistoryTodoItem extends React.Component<IProps> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  updateTodo = async (params: any) => {
    try {
      const response = await axios.put(`todos/${this.props.todo.id}`, params);
      this.props.updateTodo(response.data.resource);
    } catch (error) {}
  };

  render() {
    let action;
    let time = Date.parse(this.props.todo.updated_at);
    let formatText = "HH:mm";
    if (this.props.itemType === "finished") {
      formatText = "HH:mm";
      time = Date.parse(this.props.todo.updated_at);
      action = (
        <div className="action">
          <span
            onClick={() =>
              this.updateTodo({
                finished: false,
              })
            }
          >
            恢复
          </span>
          <span
            onClick={() =>
              this.updateTodo({
                deleted: true,
              })
            }
          >
            删除
          </span>
        </div>
      );
    } else if (this.props.itemType === "deleted") {
      formatText = "yyyy-MM-dd HH:mm";
      time = Date.parse(this.props.todo.created_at);
      action = (
        <div className="action">
          <span
            onClick={() =>
              this.updateTodo({
                deleted: false,
              })
            }
          >
            恢复
          </span>
        </div>
      );
    }
    return (
      <div>
        <div className="text">
          <span>{format(time, formatText)}</span>
          <span>{this.props.todo.description}</span>
        </div>
        {action}
      </div>
    );
  }
}

const mapStateToProps = (state: any, ownProps: any) => ({
  todos: state.todos,
  ...ownProps,
});

const mapDispatchToProps = { updateTodo };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoHistoryTodoItem);
