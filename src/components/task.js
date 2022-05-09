import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { Button, Card, Form, Input, Modal, Popconfirm, message } from "antd";
import TextArea from "antd/lib/input/TextArea";
import {
  DeleteOutlined,
  EditOutlined,
  BorderOutlined,
  CheckSquareOutlined,
} from "@ant-design/icons";

import {
  changeComplition,
  deleteTask,
  editTask,
} from "../redux/actions/taskActions";
import webApi from "../services/index";

const Task = (props) => {
  const { id, content, complete } = props.task;
  const cardClassType = complete
    ? "cs-btn-holder cs-card-list cs-completed"
    : "draggble cs-btn-holder cs-card-list";

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFinish = (values) => {
    console.log("Success:", values);
    editTask(id, values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const deleteTask = (id) => {
    webApi
      .deleteTask(id)
      .then((res) => {
        props.deleteTask(id);
        message.success("Task Deleted");
      })
      .catch((error) => {
        console.log(error);
        message.error("Error. Please try again.");
      });
  };

  const editTask = async (id, values = undefined) => {
    const taskInfo = values
      ? {
          id,
          content: {
            title: values.title,
            description: values.description,
          },
        }
      : {
          id,
          complete: !complete,
        };
    try {
      await webApi.editTask(taskInfo);
      if (values) {
        message.success("Saved.");
        props.editTask(id, values); //update store
        setIsModalVisible(false);
      } else {
        props.changeComplition(id);
      }
    } catch (error) {
      message.error("Error! Try again.");
    }
  };

  return (
    <Fragment>
      <Card size="small" className={cardClassType}>
        <div className="cs-flex-space">
          <div className="cs-link"
            onClick={() => {
              editTask(id);
            }}
          >
            <span className="cs-text-mute cs-mr-sm">
              {complete ? <CheckSquareOutlined /> : <BorderOutlined />}
            </span>
            {content.title}
          </div>
          <div>
            <Button
              type="link"
              size="small"
              className="cs-action-btn"
              onClick={showModal}
            >
              <EditOutlined />
            </Button>
            <Popconfirm
              title="Are you sure to delete this task?"
              onConfirm={() => {
                deleteTask(id);
              }}
              okText="Yes"
              cancelText="No"
              placement="topLeft"
            >
              <Button type="link" size="small" className="cs-action-btn">
                <DeleteOutlined />
              </Button>
            </Popconfirm>
          </div>
        </div>
      </Card>

      <Modal
        title={"Edit " + content.title}
        visible={isModalVisible}
        footer={null}
        onCancel={handleCancel}
      >
        <Fragment>
          <Form
            layout="vertical"
            autoComplete="off"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            initialValues={{
              title: content.title,
              description: content.description,
            }}
          >
            <Form.Item
              name="title"
              label="Title"
              rules={[
                {
                  required: true,
                  message: "Please enter the task title.",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item name="description" label="Description">
              <TextArea />
            </Form.Item>
            <Button htmlType="submit" type="primary" className="cs-mr-sm">
              Save
            </Button>
            <Button onClick={handleCancel}>Cancel</Button>
          </Form>
        </Fragment>
      </Modal>
    </Fragment>
  );
};

const mapStateToProps = (dispatch) => {
  return {
    changeComplition: (id) => dispatch(changeComplition(id)),
    deleteTask: (id) => dispatch(deleteTask(id)),
    editTask: (id, taskContent) => dispatch(editTask(id, taskContent)),
  };
};

export default connect(null, mapStateToProps)(Task);
