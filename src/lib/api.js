import axios from "axios";
// import { auth } from "../../firebase/firebase.init";


const api = axios.create({
  baseURL: 'https://mission-scic11-server-template.vercel.app',
  // withCredentials:true
});


// // api.interceptors.request.use(
// //   async(config)=>{
// //     const user=auth.currentUser
// //     if (user) {
// //       const idToken=await user.getIdToken()
// //       config.headers.Authorization= `Bearer ${idToken}`
// //     }
// //     return config
// //   },(error)=>{
// //     return Promise.reject(error)
// //   }
// // )

export { api };

