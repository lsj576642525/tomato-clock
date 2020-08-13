import React from "react";
import { Input, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import axios from "../../config/axios";
import { Link } from "react-router-dom";
import "./SignUp.scss";

interface IState {
  account: string;
  password: string;
  password_confirmation: string;
}

class SignUp extends React.Component<any, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      account: "",
      password: "",
      password_confirmation: "",
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
  onPasswordConfirmationChange = (e: any) => {
    this.setState({
      password_confirmation: e.target.value,
    });
  };
  submit = async () => {
    const { account, password, password_confirmation } = this.state;
    try {
      await axios.post("sign_up/user", {
        account,
        password,
        password_confirmation,
      });
      this.props.history.push("/");
    } catch (e) {
      console.error(e);
    }
  };

  render() {
    const { account, password, password_confirmation } = this.state;
    return (
      <div className="SignUp" id="SignUp">
        <h1>番茄🍅闹钟注册</h1>
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
        <Input.Password
          placeholder="请确认密码"
          value={password_confirmation}
          onChange={this.onPasswordConfirmationChange}
        />
        <Button type="primary" className="signUpButton" onClick={this.submit}>
          注册
        </Button>
        <p>
          如果你有账号，请立即 <Link to="/login">登录</Link>
        </p>
      </div>
    );
  }
}

export default SignUp;
