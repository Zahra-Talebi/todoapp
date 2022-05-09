import React, { Fragment, Component } from "react";
import ReactDragListView from "react-drag-listview";
import { connect } from "react-redux";
import { ExclamationCircleOutlined, SmileOutlined } from "@ant-design/icons";

import { sortTasks, initialList } from "../redux/actions/taskActions";
import webApi from "../services/index";

import AddTaskForm from "./addTaskForm";
import Task from "./task";
import { Button } from "antd";

class ToDoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
    };
  }

  getTasks = () => {
    webApi
      .getTasks()
      .then((res) => {
        this.props.initialList(res.data); //update store
        this.setState({
          error: null,
        });
      })
      .catch((error) => {
        this.setState({
          error,
        });
      });
  };

  componentDidMount() {
    this.getTasks();
  }

  render() {
    const todoItems =
      this.props.todos && this.props.todos.length
        ? this.props.todos.filter((task) => task.complete === false)
        : [];

    const doneItems =
      this.props.todos && this.props.todos.length
        ? this.props.todos.filter((task) => task.complete === true)
        : [];

    const onDragEnd = (fromIndex, toIndex) => {
      if (toIndex < 0) return; // Ignores if outside designated area

      const items = todoItems;
      const item = items.splice(fromIndex, 1)[0];
      items.splice(toIndex, 0, item);
      this.props.sortTasks(items.concat(doneItems));
    };

    return (
      <Fragment>
        <div className="cs-list-wrapper">
          <h3>To Do List</h3>
          <AddTaskForm />
          {this.state.error ? (
            <div className="cs-text-mute cs-text-center">
              <ExclamationCircleOutlined className="cs-icon-lg" />
              <p>Failed to fetch data.</p>
              <Button
                size="small"
                type="primary"
                onClick={() => {
                  this.getTasks();
                }}
              >
                Try again
              </Button>
            </div>
          ) : (
            <Fragment>
              <ReactDragListView
                nodeSelector=".ant-card.draggble"
                onDragEnd={onDragEnd}
              >
                {todoItems.length > 0 ? (
                  todoItems.map((task, index) => {
                    return <Task key={index} task={task} />;
                  })
                ) : (
                  <div className="cs-text-mute cs-text-center">
                    <SmileOutlined className="cs-icon-lg" />
                    <p>
                      You have nothing to do! <br /> Add a new task.
                    </p>
                  </div>
                )}
              </ReactDragListView>

              {doneItems.length > 0 &&
                doneItems.map((task, index) => {
                  return <Task key={index} task={task} />;
                })}
            </Fragment>
          )}
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    todos: state.todos,
  };
};

export default connect(mapStateToProps, { sortTasks, initialList })(ToDoList);
