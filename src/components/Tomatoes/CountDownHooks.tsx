import React, { useState, useEffect, FunctionComponent } from "react";

interface IProps {
  timer: number;
  onFinish: () => void;
}

let timerId: NodeJS.Timeout;

const CountDownHooks: FunctionComponent<IProps> = (props) => {
  const [countDown, setCountDown] = useState(props.timer);

  const min = Math.floor(countDown / 1000 / 60);
  const second = Math.floor((countDown / 1000) % 60);
  const time = `${min < 10 ? `0${min}` : min}:${
    second < 10 ? `0${second}` : second
  }`;

  useEffect(() => {
    document.title = `${time} - 番茄闹钟`;
    timerId = setInterval(() => {
      setCountDown(countDown - 1000);
      if (countDown < 0) {
        document.title = `番茄闹钟`;
        props.onFinish();
        clearInterval(timerId);
      }
    }, 1000);

    return function cleanup() {
      clearInterval(timerId);
    };
  });

  return <div>{time}</div>;
};

export default CountDownHooks;
