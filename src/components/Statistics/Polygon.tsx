import React from "react";

interface IProps {
  data: any;
  totalFinishedCount: number;
}

class Polygon extends React.Component<IProps> {
  point = () => {
    const dates = Object.keys(this.props.data).sort(
      (a, b) => Date.parse(a) - Date.parse(b)
    );
    const firstDay = dates[0];
    if (firstDay) {
      const lastDay = new Date().getTime();
      const range = lastDay - Date.parse(firstDay);
      let finishedCount = 0;
      let finishedY;
      const pointArr = dates.map((date) => {
        const x = ((Date.parse(date) - Date.parse(firstDay)) / range) * 240;
        finishedCount += this.props.data[date].length;
        const y = (1 - finishedCount / this.props.totalFinishedCount) * 60;
        finishedY = y;
        return `${x},${y}`;
      });
      return ["0,60", ...pointArr, `240,${finishedY}`, "240,60"].join(" ");
    } else {
      return "0,60 240,60 0,60";
    }
  };

  render() {
    console.log(this.props);

    return (
      <div>
        <svg>
          <polygon
            fill="rgba(215,78,78,0.1)"
            stroke="rgba(215,78,78,0.5)"
            strokeWidth="1"
            points={this.point()}
          />
        </svg>
      </div>
    );
  }
}

export default Polygon;
