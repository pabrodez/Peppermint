import React, { useState } from "react";
import { Drawer, Button, Divider, Input, Radio, Space } from "antd";

const Edit = (props) => {
  const [visible, setVisible] = useState(false);
  const [isActive, setIsActive] = useState(props.n.active);
  const [title, setTitle] = useState(props.n.title);
  const [text, setText] = useState(props.n.text);

  const onClose = async (e) => {
    e.stopPropagation();
    setVisible(false);
    await postData();
  };

  const postData = async () => {
    await fetch(`/api/v1/newsletter/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: props.n.id,
        text,
        title,
        active: isActive,
      }),
    }).then((res) => res.json());
  };

  return (
    <div>
      <Button onClick={() => setVisible(true)}>
        Edit
        <Drawer
          width={640}
          placement="right"
          onClose={onClose}
          visible={visible}
        >
          <h4>Active : {props.n.active.toString()}</h4>
          <h4>Created By : {props.n.createdBy ? props.n.createdBy.firstName : 'please reload'}</h4>
          <Divider />
          <h4>
            Title :{" "}
            <input
              type="text"
              defaultValue={props.n.title}
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              onChange={(e) => setTitle(e.target.value)}
            />
          </h4>
          <Divider />
          <h5>Detail</h5>
          <Input.TextArea
            defaultValue={props.n.text}
            rows={10}
            onChange={(e) => setText(e.target.value)}
          />
          <Divider />
          <h5>Select the button below to change visability </h5>
          <Radio.Group
            buttonStyle="solid"
            value={isActive}
            onChange={(e) => setIsActive(e.target.value)}
            style={{ textAlign: "center" }}
          >
            <Space>
              <Radio.Button value={true}>Active</Radio.Button>
              <Radio.Button value={false}>Hidden</Radio.Button>
            </Space>
          </Radio.Group>
        </Drawer>
      </Button>
    </div>
  );
};

export default Edit;