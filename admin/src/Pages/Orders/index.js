import { Avatar, Modal, Space, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import { deleteDataAPIAdmin, getDataAPIAdmin } from "../../ultils";
import { FaTrash } from "react-icons/fa";
import "../../App.css";

function Orders() {
  const [loading, setLoading] = useState(false);
  const [comments, setComments] = useState([]);
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);

  const getAllComment = async () => {
    const data = await getDataAPIAdmin("comments");
    setComments(data.data.comments);
    setLoading(false);
    return data.data;
  };

  const getAllPost = async () => {
    const data = await getDataAPIAdmin("allposts");
    setPosts(data.data.post);
    setLoading(false);
    return data.data;
  };
  const getUserData = async () => {
    const data = await getDataAPIAdmin("users");
    setUsers(data.data.user);
    setLoading(false);
    return data.data;
  };

  useEffect(() => {
    setLoading(true);
    getAllComment();
    getAllPost();
    getUserData();
  }, []);

  const [isOpenModal, setOpenModal] = useState(false);
  const [selectId, setSelectId] = useState("");
  const handleOpenModal = (id) => {
    setOpenModal(true);
    setSelectId(id._id);
  };

  const handleOkeDelete = async () => {
    await deleteDataAPIAdmin(`comments/${selectId}`);
    getAllComment();
    setOpenModal(false);
  };

  return (
    <Space size={20} direction="vertical">
      <Typography.Title level={4}>List Comments</Typography.Title>
      <Table
        loading={loading}
        columns={[
          {
            title: "User",
            dataIndex: "user",
            key: "user",
            render: (user) => {
              const temp = users?.find((users) => users._id === user);
              return (
                <>
                  <Avatar src={temp?.avatar} /> <span> {temp?.username}</span>
                </>
              );
            },
            minWidth: "15%",
          },

          {
            title: "Content",
            dataIndex: "content",
            key: "content",
            minWidth: "35%",
          },
          {
            title: "Like",
            dataIndex: "likes",
            key: "likes",
            render: (likes) => likes.length,
            minWidth: "10%",
          },
          {
            title: "Post Content",
            dataIndex: "postId",
            key: "postId",
            render: (postId) => {
              const temp = posts?.find((posts) => posts._id === postId);
              return <span>{temp?.content}</span>;
            },
            minWidth: "35%",
          },
          {
            title: "Action",
            key: "action",
            render: (_, id) => (
              <Space size="middle">
                <span
                  style={{ cursor: "pointer" }}
                  className="globalTrash"
                  onClick={() => handleOpenModal(id)}
                >
                  <FaTrash />
                </span>
              </Space>
            ),
            width: "5%",
          },
        ]}
        dataSource={comments}
        pagination={{
          pageSize: 10,
        }}
      ></Table>

      <Modal
        title="Are You Want To Delete This Comment?"
        style={{
          top: 20,
        }}
        open={isOpenModal}
        onOk={handleOkeDelete}
        onCancel={() => setOpenModal(false)}
      >
        <p>Delete Comment</p>
      </Modal>
    </Space>
  );
}
export default Orders;
