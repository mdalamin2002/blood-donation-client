import { Navigate } from "react-router";
// import useRole from "../hooks/useRole";
import { useContext } from "react";
import AdminDashboard from "../components/AdminDashboard ";
import VolunteerDashboard from "../components/VolunteerDashboard";
import useRole from "../Hook/useRole";
import { AuthContext } from "../providers/AuthProvider";
import DonorDashboard from "./DonorDashboard";
// import AdminDashboard from "./AdminDashboard";


export default function Dashboard() {
  const { role, loading } = useRole();
  const {user} = useContext(AuthContext);
  console.log(user);
  console.log(role);
 


  if (loading) {
    return <h1>Loading</h1>;
  }


  if (role === "donor") {
    return <DonorDashboard></DonorDashboard>
  }
  if (role === "volunteer") {
    return <VolunteerDashboard></VolunteerDashboard>;
  }


  if (role === "admin") {
    return <AdminDashboard />;


  }


  return <Navigate to={"/"} />;
}
