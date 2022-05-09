import React, { Component } from "react";
import { connect } from "react-redux";
import { Input, message } from "antd";

import { addTask } from "../redux/actions/taskActions";
import webApi from "../services/index";

class AddTaskForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
    };
  }

  async addTask(title) {
    try {
      await webApi
        .addTask({
          content: {
            title,
            description: "",
          },
          complete: false,
        })
        .then((res) => {
          this.props.addTask(res.data.id, { title }); //update store
        });
      this.setState({ title: "" });
    } catch (error) {
      console.log(error);
      message.error("Error. Try again.");
    }
  }

  render() {
    return (
      <div>
        <Input
          className="cs-transparent-input"
          placeholder="+ Add a new task"
          value={this.state.title}
          onChange={(event) => this.setState({ title: event.target.value })}
          onKeyDown={(event) => {
            if (event.key === "Enter" && event.target.value !== "") {
              this.addTask(this.state.title);
            }
          }}
        />
      </div>
    );
  }
}

export default connect(null, { addTask })(AddTaskForm);
