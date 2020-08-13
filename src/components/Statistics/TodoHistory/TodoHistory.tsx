import React from "react";
import { connect } from "react-redux";
import { format } from "date-fns";
import _ from "lodash";
import { Tabs } from "antd";
import TodoHistoryTodoItem from "./TodoHistoryTodoItem";
import "./TodoHistory.scss";

const { TabPane } = Tabs;

interface IProps {
  todos: any[];
}

class TodoHistory extends React.Component<IProps> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  get finishedTodos() {
    return this.props.todos.filter((t) => t.completed && !t.deleted);
  }

  get deletedTodos() {
    return this.props.todos.filter((t) => t.deleted);
  }

  get dailyFinishedTodos() {
    return _.groupBy(this.finishedTodos, (todo) => {
      return format(Date.parse(todo.updated_at), "yyyy-MM-d");
    });
  }

  get finishedDates() {
    return Object.keys(this.dailyFinishedTodos).sort(
      (a, b) => Date.parse(b) - Date.parse(a)
    );
  }

  render() {
    const finishedTodoList = this.finishedDates.map((date) => {
      return (
        <div key={date} className="dailyTodos">
          <div className="summary">
            <p className="date">{date}</p>
            <p className="finishedCount">
              完成了{this.dailyFinishedTodos[date].length}个任务
            </p>
          </div>
          <div className="todoList">
            {this.dailyFinishedTodos[date].map((todo) => (
              <TodoHistoryTodoItem
                key={todo.id}
                todo={todo}
                itemType="finished"
              />
            ))}
          </div>
        </div>
      );
    });

    const deletedTodoList = this.deletedTodos.map((todo) => {
      return (
        <TodoHistoryTodoItem key={todo.id} todo={todo} itemType="deleted" />
      );
    });

    return (
      <Tabs defaultActiveKey="1">
        <TabPane tab="已完成的任务" key="1">
          <div className="TodoHistory" id="TodoHistory">
            {finishedTodoList}
          </div>
        </TabPane>
        <TabPane tab="已删除的任务" key="2">
          <div className="TodoHistory" id="TodoHistory">
            {deletedTodoList}
          </div>
        </TabPane>
      </Tabs>
    );
  }
}

const mapStateToProps = (state: any, ownProps: any) => ({
  todos: state.todos,
  ...ownProps,
});

export default connect(mapStateToProps)(TodoHistory);
