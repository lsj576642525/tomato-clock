import React from "react";
import { Checkbox, Input } from "antd";
import { EnterOutlined, DeleteFilled } from "@ant-design/icons";

interface IState {
  editText: string;
}

interface IProps {
  id: number;
  description: string;
  completed: boolean;
  editing: boolean;
  update: (id: number, params: any) => void;
  toEditing: (id: number) => void;
}

class TodoItem extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      editText: this.props.description,
    };
  }

  toEditing = () => {
    this.props.toEditing(this.props.id);
  };

  update = (params: any) => {
    this.props.update(this.props.id, params);
    console.log(this.props);
  };

  onKeyUp = (e: any) => {
    if (e.keyCode === 13 && this.state.editText !== "") {
      this.update({ description: this.state.editText });
    }
  };

  render() {
    const Editing = (
      <div className="editing">
        <Input
          value={this.state.editText}
          onChange={(e) => this.setState({ editText: e.target.value })}
          onKeyUp={this.onKeyUp}
        ></Input>
        <div className="iconWrapper">
          <EnterOutlined />
          <DeleteFilled onClick={() => this.update({ deleted: true })} />
        </div>
      </div>
    );
    const Text = <span onClick={this.toEditing}>{this.props.description}</span>;
    return (
      <div>
        <Checkbox
          checked={this.props.completed}
          onChange={(e: any) => {
            this.update({ completed: e.target.checked });
          }}
        />
        {this.props.editing ? Editing : Text}
      </div>
    );
  }
}

export default TodoItem;
