import { Route, Routes } from "react-router-dom";
import Customers from "../../Pages/Customers";
import Dashboard from "../../Pages/Dashbaord";
import Inventory from "../../Pages/Inventory";
import Orders from "../../Pages/Orders";
import Login from "../../Pages/Login/login";
import Register from "../../Pages/Register/register";
import { PrivateRoute } from "../PrivateRoute/PrivateRoute";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />}></Route>
      <Route path="/register" element={<Register />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      ></Route>
      <Route
        path="/customers"
        element={
          <PrivateRoute>
            <Customers />
          </PrivateRoute>
        }
      ></Route>
      <Route
        path="/inventory"
        element={
          <PrivateRoute>
            <Inventory />
          </PrivateRoute>
        }
      ></Route>
      <Route
        path="/orders"
        element={
          <PrivateRoute>
            <Orders />
          </PrivateRoute>
        }
      ></Route>
    </Routes>
  );
}
export default AppRoutes;
