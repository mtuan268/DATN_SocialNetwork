import {
  Avatar,
  Form,
  Input,
  Modal,
  Select,
  Space,
  Table,
  Typography,
} from "antd";
import { useEffect, useState } from "react";
import {
  deleteDataAPIAdmin,
  getDataAPIAdmin,
  patchDataAPIAdmin,
} from "../../ultils";
import { FaEdit, FaTrash } from "react-icons/fa";

const { Option } = Select;
function Customers() {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState([]);

  const getUserData = async () => {
    const data = await getDataAPIAdmin("users");
    setUser(data.data.user);
    setLoading(false);
    return data.data;
  };
  useEffect(() => {
    setLoading(true);
    getUserData();
  }, []);

  const [userSelected, setUserSelected] = useState({});
  const [isOpenDeleteModal, setOpenDeleteModal] = useState(false);
  const [isOpenEditModal, setOpenEditModal] = useState(false);
  const [form] = Form.useForm();
  const handleOpenEditModal = (id) => {
    setUserSelected(id);
    setOpenEditModal(true);
  };

  const handleOpenDeleteModal = (id) => {
    setUserSelected(id);
    setOpenDeleteModal(true);
  };

  const handleDeleteUser = async () => {
    const idUser = userSelected._id;
    await deleteDataAPIAdmin(`users/${idUser}`);
    setOpenDeleteModal(false);
    getUserData();
  };
  console.log("detess", userSelected);

  const initialState = {
    fullname: "",
    mobile: "",
    address: "",
    story: "",
    website: "",
    gender: "male",
    role: "user",
  };
  const [userData, setUserData] = useState(initialState);

  useEffect(() => {
    setUserData({
      fullname: userSelected.fullname,
      mobile: userSelected.mobile,
      address: userSelected.address,
      story: userSelected.story,
      website: userSelected.website,
      gender: userSelected.gender,
      role: userSelected.role,
    });
  }, [userSelected]);
  console.log("hello", userData);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleEditUser = async () => {
    const data = await patchDataAPIAdmin(`usersAdmin`, {
      _id: userSelected._id,
      ...userData,
    });
    console.log(" dataas", data);
    setOpenDeleteModal(false);
    getUserData();
  };

  return (
    <Space size={20} direction="vertical">
      <Typography.Title level={4}>Users</Typography.Title>
      <Table
        loading={loading}
        columns={[
          {
            title: "Avatar",
            dataIndex: "avatar",
            key: "avatar",
            render: (link) => {
              return <Avatar src={link} />;
            },
          },
          {
            title: "Full Name",
            dataIndex: "fullname",
            key: "fullname",
          },
          {
            title: "Role",
            dataIndex: "role",
            key: "role",
          },
          {
            title: "Email",
            dataIndex: "email",
            key: "email",
          },
          {
            title: "Gender",
            dataIndex: "gender",
            key: "gender",
          },
          {
            title: "Mobile",
            dataIndex: "mobile",
            key: "mobile",
          },

          {
            title: "Address",
            dataIndex: "address",
            key: "address",
          },
          {
            title: "Follower",
            dataIndex: "followers",
            key: "followers",
            render: (follower) => follower.length,
          },
          {
            title: "Action",
            key: "action",
            render: (_, id) => (
              <>
                {/* <Space size="middle">
                  <span
                    style={{ cursor: "pointer" }}
                    className="globalTrash"
                    onClick={() => handleOpenEditModal(id)}
                  >
                    <FaEdit />
                  </span>
                </Space> */}
                {"  "}
                <Space size="middle">
                  <span
                    style={{ cursor: "pointer" }}
                    className="globalTrash"
                    onClick={() => handleOpenDeleteModal(id)}
                  >
                    <FaTrash />
                  </span>
                </Space>
              </>
            ),
          },
        ]}
        dataSource={user}
        pagination={{
          pageSize: 10,
        }}
      ></Table>
      <Modal
        title="Are You Want To Delete This User?"
        style={{
          top: 20,
        }}
        open={isOpenDeleteModal}
        onOk={() => handleDeleteUser()}
        onCancel={() => setOpenDeleteModal(false)}
      >
        <p>Delete user</p>
      </Modal>

      <Modal
        title="Edit User Profile"
        style={{
          top: 150,
        }}
        open={isOpenEditModal}
        onOk={handleEditUser}
        onCancel={() => setOpenEditModal(false)}
      >
        <Form
          name="basic"
          form={form}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 700 }}
          initialValues={{ remember: true }}
          //onFinish={onFinish}
          // onFinishFailed={onFinishFailed}
          autoComplete="off"
          fields={[
            {
              name: ["fullname"],
              value: userSelected.fullname,
            },
            {
              name: ["mobile"],
              value: userSelected.mobile,
            },
            {
              name: ["address"],
              value: userSelected.address,
            },
            {
              name: ["website"],
              value: userSelected.website,
            },
            {
              name: ["story"],
              value: userSelected.story,
            },
            {
              name: ["gender"],
              value: userSelected.gender,
            },
            {
              name: ["role"],
              value: userSelected.role,
            },
          ]}
        >
          <Form.Item
            label="Full Name"
            name="fullname"
            rules={[{ required: true, message: "Please input your fullname!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Mobile"
            name="mobile"
            rules={[{ required: false, message: "Please input your mobile!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Address"
            name="address"
            rules={[{ required: false, message: "Please input your address!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Website"
            name="website"
            rules={[{ required: false, message: "Please input your website!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Story"
            name="story"
            rules={[{ required: false, message: "Please input your story!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="gender"
            label="Gender"
            rules={[{ required: false, message: "Please select your gender!" }]}
          >
            <Select placeholder="select your gender">
              <Option value="male">Male</Option>
              <Option value="female">Female</Option>
              <Option value="other">Other</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="role"
            label="Role"
            rules={[{ required: true, message: "Please select your role!" }]}
          >
            <Select placeholder="select your role">
              <Option value="user">User</Option>
              <Option value="admin">admin</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </Space>
  );
}
export default Customers;
