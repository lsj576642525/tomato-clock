import React from "react";
import { connect } from "react-redux";
import Polygon from "./Polygon";
import TodoHistory from "./TodoHistory/TodoHistory";
import { format } from "date-fns";
import _ from "lodash";

interface IProps {
  todos: any[];
}

class Statistics extends React.Component<IProps> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  get finishedTodos() {
    return this.props.todos.filter((t) => t.completed && !t.deleted);
  }

  get dailyTodos() {
    return _.groupBy(this.finishedTodos, (todo) => {
      return format(Date.parse(todo.updated_at), "yyyy-MM-d");
    });
  }

  render() {
    return (
      <div>
        <ul>
          <li>统计</li>
          <li>目标</li>
          <li>番茄历史</li>
          <li>
            任务历史 累计完成{this.finishedTodos.length}个任务
            <Polygon
              data={this.dailyTodos}
              totalFinishedCount={this.finishedTodos.length}
            />
          </li>
        </ul>
        <TodoHistory />
      </div>
    );
  }
}

const mapStateToProps = (state: any, ownProps: any) => ({
  todos: state.todos,
  ...ownProps,
});

export default connect(mapStateToProps)(Statistics);
