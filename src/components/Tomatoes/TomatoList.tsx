import React from "react";
import { format } from "date-fns";
import "./TomatoList.scss";

interface IProps {
  finishedTomatoes: any;
}

const TomatoItem = function (props: any) {
  return (
    <div className="TomatoItem">
      <span className="timeRange">
        {format(Date.parse(props.started_at), "HH:mm")}
        {" - "}
        {format(Date.parse(props.ended_at), "HH:mm")}
      </span>
      <span className="description">{props.description}</span>
    </div>
  );
};

class TomatoList extends React.Component<IProps> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  get dates() {
    const dates = Object.keys(this.props.finishedTomatoes);
    return dates.sort((a, b) => Date.parse(b) - Date.parse(a));
  }

  render() {
    const list = this.dates.map((d) => {
      const tomatoes = this.props.finishedTomatoes[d];
      return (
        <div key={d} className="dailyTomatoes">
          <div className="title">
            <span className="dateTime">{format(Date.parse(d), "M月dd日")}</span>
            <span className="finishedCount">完成了{tomatoes.length}个番茄</span>
          </div>
          {tomatoes.map((t: any) => (
            <TomatoItem key={t.id} {...t} />
          ))}
        </div>
      );
    });
    return (
      <div className="TomatoList" id="TomatoList">
        {list}
      </div>
    );
  }
}

export default TomatoList;
