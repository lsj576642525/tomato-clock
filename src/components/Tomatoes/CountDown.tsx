import React from "react";
import "./CountDown.scss";

interface IProps {
  timer: number;
  onFinish: () => void;
  duration: any;
}

interface IState {
  countDown: number;
}

let timerId: NodeJS.Timeout;

class CountDown extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      countDown: this.props.timer,
    };
  }

  get countDown() {
    const min = Math.floor(this.state.countDown / 1000 / 60);
    const second = Math.floor((this.state.countDown / 1000) % 60);
    return `${min < 10 ? `0${min}` : min}:${
      second < 10 ? `0${second}` : second
    }`;
  }

  componentDidMount() {
    timerId = setInterval(() => {
      //   document.title = `${this.countDown} - 番茄闹钟`;
      let time = this.state.countDown;
      this.setState({ countDown: time - 1000 });
      if (time < 1000) {
        // document.title = `番茄闹钟`;
        this.props.onFinish();
        clearInterval(timerId);
      }
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(timerId);
  }

  render() {
    const percent = 1 - this.state.countDown / this.props.duration;
    return (
      <div className="CountDown" id="CountDown">
        <span className="restTime">{this.countDown}</span>
        <div className="progress" style={{ width: `${percent * 100}%` }} />
      </div>
    );
  }
}

export default CountDown;
