import { Avatar, Image, Modal, Space, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import { deleteDataAPIAdmin, getDataAPIAdmin } from "../../ultils";
import { FaTrash } from "react-icons/fa";

function Inventory() {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);

  const getAllPost = async () => {
    const data = await getDataAPIAdmin("allposts");
    setPosts(data.data.post);
    setLoading(false);
    return data.data;
  };

  useEffect(() => {
    setLoading(true);
    getAllPost();
  }, []);
  //console.log("post", posts);

  const [isOpenModal, setOpenModal] = useState(false);
  const [selectId, setSelectId] = useState("");
  const handleOpenModal = (post) => {
    setOpenModal(true);
    setSelectId(post._id);
  };

  const handleOkeDelete = async () => {
    await deleteDataAPIAdmin(`allposts/${selectId}`);
    getAllPost();
    setOpenModal(false);
  };

  return (
    <Space size={20} direction="vertical">
      <Typography.Title level={4}>List ALl Posts</Typography.Title>
      <Table
        loading={loading}
        columns={[
          {
            title: "User",
            dataIndex: "user",
            key: "user",
            render: (user) => {
              return (
                <>
                  <Avatar src={user?.avatar} /> <span>{user?.username}</span>
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
            title: "Image",
            dataIndex: "images",
            key: "images",
            render: (images) =>
              images.map((img) => {
                return (
                  <Image src={img.url} width={100} style={{ padding: "5px" }} />
                );
              }),
            minWidth: "35%",
          },
          {
            title: "Like",
            dataIndex: `likes`,
            key: "likes",
            render: (likes) => likes.length,
            minWidth: "5%",
          },
          {
            title: "Comments",
            dataIndex: `comments`,
            key: "comments",
            render: (comments) => comments?.length,
            minWidth: "5%",
          },
          {
            title: "Action",
            key: "action",
            render: (_, post) => (
              <Space size="middle">
                <span
                  style={{ cursor: "pointer" }}
                  className="globalTrash"
                  onClick={() => handleOpenModal(post)}
                >
                  <FaTrash />
                </span>
              </Space>
            ),
            minWidth: "5%",
          },
        ]}
        dataSource={posts}
        pagination={{
          pageSize: 10,
        }}
      ></Table>

      <Modal
        title="Are You Want To Delete This Post?"
        style={{
          top: 20,
        }}
        open={isOpenModal}
        onOk={handleOkeDelete}
        onCancel={() => setOpenModal(false)}
      >
        <p>Delete Post</p>
      </Modal>
    </Space>
  );
}
export default Inventory;
