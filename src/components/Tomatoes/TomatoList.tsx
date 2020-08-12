import React from "react";
import { format } from "date-fns";

interface IProps {
  finishedTomatoes: any;
}

const TomatoItem = function (props: any) {
  return (
    <div className="TomatoItem">
      <span>
        {format(Date.parse(props.started_at), "HH:mm")}
        {" - "}
        {format(Date.parse(props.ended_at), "HH:mm")}
      </span>
      <span>{props.description}</span>
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
        <div key={d}>
          <div className="title">
            <span>{format(Date.parse(d), "M月dd日")}</span>
            <span>完成了{tomatoes.length}个番茄</span>
            {tomatoes.map((t: any) => (
              <TomatoItem key={t.id} {...t} />
            ))}
          </div>
        </div>
      );
    });
    return <div>{list}</div>;
  }
}

export default TomatoList;
