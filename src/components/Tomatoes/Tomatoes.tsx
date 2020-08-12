import React from "react";
import TomatoAction from "./TomatoAction";
import TomatoList from "./TomatoList";
import axios from "../../config/axios";
import { connect } from "react-redux";
import { addTomato, initTomatoes, updateTomato } from "../../redux/actions";
import _ from "lodash";
import { format } from "date-fns";

interface IProps {
  addTomato: (payload: any) => any;
  initTomatoes: (payload: any) => any;
  tomatoes: any[];
  updateTomato: any;
}

class Tomatoes extends React.Component<IProps> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  get unFinishedTomatoes() {
    return this.props.tomatoes.filter(
      (t) => !t.description && !t.ended_at && !t.aborted
    )[0];
  }

  get finishedTomatoes() {
    const finishedTomatoes = this.props.tomatoes.filter(
      (t) => t.description && t.ended_at && !t.aborted
    );

    const obj = _.groupBy(finishedTomatoes, (tomato) => {
      return format(Date.parse(tomato.started_at), "yyyy-MM-d");
    });

    return obj;
  }

  getTomatoes = async () => {
    try {
      const response = await axios.get("tomatoes");
      this.props.initTomatoes(response.data.resources);
    } catch (error) {
      throw new Error(error);
    }
  };

  startTomato = async () => {
    try {
      const response = await axios.post("tomatoes", {
        duration: 1500000,
      });
      this.props.addTomato(response.data.resource);
    } catch (error) {
      throw new Error(error);
    }
  };

  componentDidMount() {
    this.getTomatoes();
  }

  render() {
    return (
      <div>
        <TomatoAction
          startTomato={this.startTomato}
          unFinishedTomatoes={this.unFinishedTomatoes}
          updateTomato={this.props.updateTomato}
        />
        <TomatoList finishedTomatoes={this.finishedTomatoes} />
      </div>
    );
  }
}

const mapStateToProps = (state: any, ownProps: any) => ({
  tomatoes: state.tomatoes,
  ...ownProps,
});

const mapDispatchToProps = { addTomato, initTomatoes, updateTomato };

export default connect(mapStateToProps, mapDispatchToProps)(Tomatoes);
