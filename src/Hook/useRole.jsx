import { useContext, useEffect, useState } from "react";
// import { api } from "../lib/api";
import { AuthContext } from "../providers/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";

export default function useRole() {
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(true);
  const {user} = useContext(AuthContext);
  // console.log(user);
  
  
 const axiosSecure = useAxiosSecure();
  useEffect(() => {
    if (user?.email) {
      axiosSecure.get(`/get-user-role?email=${user?.email}`).then((res) => {
      console.log({res})
      setRole(res?.data?.role);
      setLoading(false);
    });
    }
  },[user?.email]);
  return { role, loading };
}