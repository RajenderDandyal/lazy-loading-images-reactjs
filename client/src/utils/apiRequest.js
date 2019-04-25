import axios from "axios";

let users = async (pageNo) => {
  let response;
  try {
   let res = await axios.get(`https://randomuser.me/api/?page=${pageNo}&results=10&seed=abc`)
    response = res.data
  }catch (e) {
    console.log(e)
    response = null
  }
  return response
};

export {users}