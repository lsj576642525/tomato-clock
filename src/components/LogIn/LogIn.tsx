import React from "react";
import { Input, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import axios from "../../config/axios";
import { Link } from "react-router-dom";

interface IState {
  account: string;
  password: string;
}

class LogIn extends React.Component<any, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      account: "",
      password: "",
    };
  }

  onAccountChange = (e: any) => {
    this.setState({
      account: e.target.value,
    });
  };
  onPasswordChange = (e: any) => {
    this.setState({
      password: e.target.value,
    });
  };
  submit = async () => {
    const { account, password } = this.state;
    try {
      await axios.post("sign_in/user", {
        account,
        password,
      });
      this.props.history.push("/");
    } catch (e) {
      console.error(e);
    }
  };

  render() {
    const { account, password } = this.state;
    return (
      <div>
        <Input
          placeholder="请输入用户名"
          prefix={<UserOutlined />}
          value={account}
          onChange={this.onAccountChange}
        />
        <Input.Password
          placeholder="请输入密码"
          value={password}
          onChange={this.onPasswordChange}
        />
        <Button onClick={this.submit}>登录</Button>
        <p>
          如果你没有账号，请立即 <Link to="/signUp">注册</Link>
        </p>
      </div>
    );
  }
}

export default LogIn;
