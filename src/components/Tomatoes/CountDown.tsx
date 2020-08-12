import React from "react";

interface IProps {
  timer: number;
  onFinish: () => void;
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
    return <div>{this.countDown}</div>;
  }
}

export default CountDown;
