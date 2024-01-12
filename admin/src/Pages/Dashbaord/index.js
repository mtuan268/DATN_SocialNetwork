import { CommentOutlined, ShopOutlined, UserOutlined } from "@ant-design/icons";
import { Card, Space, Statistic, Table, Typography } from "antd";
import { useEffect, useState } from "react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { getDataAPIAdmin } from "../../ultils";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Dashboard() {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);

  const getAllComment = async () => {
    const data = await getDataAPIAdmin("comments");
    setComments(data.data.comments);
    return data.data;
  };

  const getAllPost = async () => {
    const data = await getDataAPIAdmin("allposts");
    setPosts(data.data.post);
    return data.data;
  };
  const getUserData = async () => {
    const data = await getDataAPIAdmin("users");
    setUsers(data.data.user);
    return data.data;
  };

  useEffect(() => {
    getAllComment();
    getAllPost();
    getUserData();
  }, []);

  return (
    <Space size={20} direction="vertical">
      <Typography.Title level={4}>Dashboard</Typography.Title>
      <Space direction="horizontal">
        <DashboardCard
          icon={
            <UserOutlined
              style={{
                color: "purple",
                backgroundColor: "rgba(0,255,255,0.25)",
                borderRadius: 20,
                fontSize: 24,
                padding: 18,
              }}
            />
          }
          title={"User"}
          value={users.length}
        />
        <DashboardCard
          icon={
            <ShopOutlined
              style={{
                color: "green",
                backgroundColor: "rgba(0,255,0,0.25)",
                borderRadius: 20,
                fontSize: 24,
                padding: 18,
              }}
            />
          }
          title={"Post"}
          value={posts.length}
        />
        <DashboardCard
          icon={
            <CommentOutlined
              style={{
                color: "blue",
                backgroundColor: "rgba(0,0,255,0.25)",
                borderRadius: 20,
                fontSize: 24,
                padding: 18,
              }}
            />
          }
          title={"Comment"}
          value={comments.length}
        />
      </Space>
      <Space>
        <RecentOrders />
        {/* <DashboardChart /> */}
        <TopLikePost />
      </Space>
    </Space>
  );
}

function DashboardCard({ title, value, icon }) {
  return (
    <Card style={{ width: "200px" }}>
      <Space direction="horizontal">
        {icon}
        <Statistic title={title} value={value} />
      </Space>
    </Card>
  );
}
function RecentOrders() {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dataSorter, setDataSorter] = useState([]);
  const getUserData = async () => {
    const data = await getDataAPIAdmin("users");
    setDataSource(data.data.user);
    const list = data.data.user
      .sort((a, b) => b.followers.length - a.followers.length)
      .splice(0, 3);
    setDataSorter(list);
    setLoading(false);
    return data.data;
  };

  useEffect(() => {
    setLoading(true);
    getUserData();
  }, []);

  return (
    <>
      <Typography.Title level={5}>Top following user</Typography.Title>
      <Table
        columns={[
          {
            title: "User",
            dataIndex: "fullname",
            key: "fullname",
          },
          {
            title: "Follower",
            dataIndex: "followers",
            key: "followers",
            render: (follower) => follower.length,
            // sortDirections: "descend",
            // sorter: (a, b) => a.followers.length > b.followers.length,
          },
        ]}
        loading={loading}
        dataSource={dataSorter}
        pagination={false}
      ></Table>
    </>
  );
}

function TopLikePost() {
  const [loading, setLoading] = useState(false);
  const [dataSorter, setDataSorter] = useState([]);
  const [posts, setPosts] = useState([]);
  const getAllPost = async () => {
    const data = await getDataAPIAdmin("allposts");
    setPosts(data.data.post);
    //todo
    const list = data.data.post
      .sort((a, b) => b.likes.length - a.likes.length)
      .splice(0, 3);
    setDataSorter(list);
    //todo
    setLoading(false);
    return data.data;
  };

  useEffect(() => {
    setLoading(true);
    getAllPost();
  }, []);

  return (
    <>
      <Typography.Title level={5}>Top Post user</Typography.Title>
      <Table
        columns={[
          {
            title: "User",
            dataIndex: "user",
            key: "user",
            render: (user) => <span>{user?.fullname}</span>,
          },
          {
            title: "Content",
            dataIndex: "content",
            key: "content",
          },
          {
            title: "Likes",
            dataIndex: "likes",
            key: "likes",
            render: (like) => like.length,
          },
        ]}
        loading={loading}
        dataSource={dataSorter}
        pagination={false}
      ></Table>
    </>
  );
}

// function DashboardChart() {
//   const [reveneuData, setReveneuData] = useState({
//     labels: [],
//     datasets: [],
//   });
//   const [userData, setUserData] = useState([]);
//   const [posts, setPosts] = useState([]);
//   const getAllPost = async () => {
//     const data = await getDataAPIAdmin("allposts");
//     setPosts(data.data.post);
//     return data.data;
//   };
//   const getUserData = async () => {
//     const data = await getDataAPIAdmin("users");
//     setUserData(data.data.user);
//     return data.data;
//   };
//   useEffect(() => {
//     getUserData();
//     getAllPost();
//   }, []);
//   useEffect(() => {
//     // getRevenue().then((res) => {
//     //   const labels = res.carts.map((cart) => {
//     //     return `User-${cart.userId}`;
//     //   });
//     //   const data = res.carts.map((cart) => {
//     //     return cart.discountedTotal;
//     //   });

//     //   const dataSource = {
//     //     labels,
//     //     datasets: [
//     //       {
//     //         label: "Hello",
//     //         data: data,
//     //         backgroundColor: "rgba(255, 0, 0, 1)",
//     //       },
//     //     ],
//     //   };

//     //   setReveneuData(dataSource);
//     // });
//     const labels = userData?.map((user) => {
//       return `${user.username}`;
//     });
//     const dataSource = {
//       labels,
//       datasets: [
//         {
//           label: "Post",
//           data: userData,
//           backgroundColor: "rgba(255, 0, 0, 1)",
//         },
//       ],
//     };
//     setReveneuData(dataSource);
//   }, [userData, posts]);

//   const options = {
//     responsive: true,
//     plugins: {
//       legend: {
//         position: "bottom",
//       },
//       title: {
//         display: true,
//         text: "Top User",
//       },
//     },
//   };

//   return (
//     <Card style={{ width: 500, height: 250 }}>
//       <Bar options={options} data={reveneuData} />
//     </Card>
//   );
// }
export default Dashboard;
