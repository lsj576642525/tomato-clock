import React from "react";
import { Dropdown, Menu } from "antd";
import {
  DownOutlined,
  LogoutOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import axios from "../../config/axios";
import Todos from "../../components/Todos/Todos";
import Tomatoes from "../../components/Tomatoes/Tomatoes";

interface IRouter {
  history: any;
}
interface IState {
  user: any;
}

class Index extends React.Component<IRouter, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      user: {},
    };
  }

  logout = () => {
    localStorage.setItem("x-token", "");
    this.props.history.push("/login");
  };

  menu = (
    <Menu>
      <Menu.Item key="1" icon={<SettingOutlined />}>
        个人设置
      </Menu.Item>
      <Menu.Item key="2" onClick={this.logout} icon={<LogoutOutlined />}>
        注销
      </Menu.Item>
    </Menu>
  );

  async componentWillMount() {
    await this.getMe();
  }

  getMe = async () => {
    try {
      const response = await axios.get("me");
      this.setState({
        user: response.data,
      });
    } catch (error) {
      console.error(error);
      if (error.response.status === 401) {
        this.props.history.push("/login");
      }
    }
  };

  render() {
    return (
      <div>
        <header>
          {/* <p>欢迎：{this.state.user && this.state.user.account}</p> */}
          <span>番茄闹钟</span>
          <Dropdown overlay={this.menu}>
            <span>
              {this.state.user && this.state.user.account} <DownOutlined />
            </span>
          </Dropdown>
        </header>
        <main>
          <Tomatoes />
          <Todos />
        </main>
      </div>
    );
  }
}

export default Index;
