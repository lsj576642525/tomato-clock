import React from "react";
import { Button, Input, Modal } from "antd";
import {
  CloseCircleOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import axios from "../../config/axios";
import CountDown from "./CountDown";

const { confirm } = Modal;

// import CountDown from "./CountDownHooks"; // 此场景不适用

interface IProps {
  startTomato: () => void;
  unFinishedTomatoes: any;
  updateTomato: any;
}

interface IState {
  description: string;
}

class TomatoAction extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      description: "",
    };
  }

  onKeyUp = (e: any) => {
    if (e.keyCode === 13 && this.state.description !== "") {
      this.addDescription();
    }
  };

  onFinish = () => {
    this.forceUpdate();
  };

  addDescription = () => {
    this.updateTomato({
      description: this.state.description,
      ended_at: new Date(),
    });
    this.setState({
      description: "",
    });
  };

  abortTomato = () => {
    this.updateTomato({ aborted: true });
  };

  updateTomato = async (params: any) => {
    try {
      const response = await axios.put(
        `tomatoes/${this.props.unFinishedTomatoes.id}`,
        params
      );
      this.props.updateTomato(response.data.resource);
    } catch (error) {}
  };

  showConfirm = () => {
    confirm({
      title: "您目前正在一个番茄工作时间中，要放弃这个番茄吗？",
      icon: <ExclamationCircleOutlined />,
      onOk: () => {
        this.abortTomato();
      },
      onCancel() {},
      okText: "确定放弃",
      cancelText: "取消",
    });
  };

  render() {
    let html = <div></div>;

    if (this.props.unFinishedTomatoes === undefined) {
      html = <Button onClick={() => this.props.startTomato()}>开始番茄</Button>;
    } else {
      const startedAt = Date.parse(this.props.unFinishedTomatoes.started_at);
      const duration = this.props.unFinishedTomatoes.duration;
      const timeNow = new Date().getTime();
      if (timeNow - startedAt > duration) {
        html = (
          <div>
            <Input
              value={this.state.description}
              placeholder="请输入你刚刚完成的任务"
              onChange={(e) => this.setState({ description: e.target.value })}
              onKeyUp={(e) => this.onKeyUp(e)}
            />
            <CloseCircleOutlined onClick={this.showConfirm} />
          </div>
        );
      } else if (timeNow - startedAt < duration) {
        const timer = startedAt + duration - timeNow;
        html = (
          <div>
            <CountDown timer={timer} onFinish={this.onFinish} />
            <CloseCircleOutlined onClick={this.showConfirm} />
          </div>
        ); // 倒计时
      }
    }

    return <div>{html}</div>;
  }
}

export default TomatoAction;
