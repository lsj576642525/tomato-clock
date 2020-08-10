import React from "react";
import { Input } from "antd";
import { EnterOutlined } from "@ant-design/icons";

interface IState {
  description: string;
}

class TodoInput extends React.Component<any, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      description: "",
    };
  }

  onDescriptionChange = (e: any) => {
    this.setState({
      description: e.target.value,
    });
  };

  addTodo = () => {
    this.props.addTodo({ description: this.state.description });
    this.setState({ description: "" });
  };

  onkeyUp = (e: any) => {
    if (e.keyCode === 13 && this.state.description !== "") {
      this.addTodo();
    }
  };

  render() {
    const { description } = this.state;
    const suffix = description ? (
      <EnterOutlined onClick={this.addTodo} />
    ) : (
      <span />
    );
    return (
      <div>
        <Input
          placeholder="添加新任务"
          suffix={suffix}
          value={description}
          onChange={this.onDescriptionChange}
          onKeyUp={this.onkeyUp}
        />
      </div>
    );
  }
}

export default TodoInput;
