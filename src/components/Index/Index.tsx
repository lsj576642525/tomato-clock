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
import Statistics from "../../components/Statistics/Statistics";
import { initTodos } from "../../redux/actions";
import { initTomatoes } from "../../redux/actions";
import { connect } from "react-redux";

interface IState {
  user: any;
}

class Index extends React.Component<any, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      user: {},
    };
  }

  getTodos = async () => {
    try {
      const response = await axios.get("todos");
      const todos = response.data.resources.map((t: any) =>
        Object.assign({}, t, { editing: false })
      );
      this.props.initTodos(todos);
    } catch (e) {}
  };

  getTomatoes = async () => {
    try {
      const response = await axios.get("tomatoes");
      this.props.initTomatoes(response.data.resources);
    } catch (error) {
      throw new Error(error);
    }
  };

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

  async componentDidMount() {
    await this.getMe();
    await this.getTodos();
    await this.getTomatoes();
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
        <Statistics />
      </div>
    );
  }
}

const mapStateToProps = (state: any, ownProps: any) => ({
  todos: state.todos,
  tomatoes: state.tomatoes,
  ...ownProps,
});

const mapDispatchToProps = { initTodos, initTomatoes };

export default connect(mapStateToProps, mapDispatchToProps)(Index);
