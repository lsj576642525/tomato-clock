import React from "react";
import { Input } from "antd";
import { EnterOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { addTodo } from "../../redux/actions";
import axios from "../../config/axios";

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

  addTodo = async () => {
    try {
      const response = await axios.post("todos", {
        description: this.state.description,
      });
      this.props.addTodo(response.data.resource);
    } catch (error) {
      throw new Error(error);
    }
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

const mapStateToProps = (state: any, ownProps: any) => ({
  ...ownProps,
});

const mapDispatchToProps = { addTodo };

export default connect(mapStateToProps, mapDispatchToProps)(TodoInput);
