import React, { useState, useEffect } from "react";
import { Space, Button } from "antd";
import fileDownload from "js-file-download";
import axios from "axios";
import {
  FileTwoTone,
  MinusCircleTwoTone,
  UploadOutlined,
} from "@ant-design/icons";

const File = (props) => {
  const [files, setFiles] = useState([]);

  async function getFiles() {
    const id = props.ticket._id;
    await fetch(`/api/v1/tickets/file/listFiles/${id}`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setFiles(res.files);
      });
  }

  async function deleteFile(file) {
    await fetch(`/api/v1/tickets/file/del`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        file: file._id,
        ticket: props.ticket._id,
        path: file.path,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setFiles(res.files);
      });
  }

  function download(file) {
    const url = `/api/v1/tickets/file/download`;
    let data = new FormData();
    data.append("filepath", file.path);
    axios
      .post(url, data, {
        responseType: "blob",
      })
      .then((res) => {
        fileDownload(res.data, file.filename);
      });
  }

  useEffect(() => {
    getFiles();
  }, []);

  return (
    <div>
      {files.map((file) => {
        return (
          <div className="todo-list" key={file._id}>
            <ul>
              <li>
                <Space>
                  <FileTwoTone />
                  <span>{file.filename}</span>
                  <Button
                    ghost
                    style={{ float: "right" }}
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteFile(file);
                    }}
                  >
                    <MinusCircleTwoTone twoToneColor="#FF0000	" />
                  </Button>
                  <Button
                    ghost
                    onClick={async (e) => {
                      e.stopPropagation();
                      download(file);
                    }}
                  >
                    <UploadOutlined style={{ color: "black" }} />
                  </Button>
                </Space>
              </li>
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export default File;
