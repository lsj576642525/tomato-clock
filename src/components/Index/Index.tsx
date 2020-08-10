import React from "react";
import { Button } from "antd";
import LogIn from "../LogIn/LogIn";
import { Interface } from "readline";

interface IRouter {
  history: any;
}

class Index extends React.Component<IRouter> {
  LogIn = () => {
    this.props.history.push("/login");
  };

  render() {
    return (
      <div>
        <Button onClick={this.LogIn}>登录</Button>
      </div>
    );
  }
}

export default Index;
