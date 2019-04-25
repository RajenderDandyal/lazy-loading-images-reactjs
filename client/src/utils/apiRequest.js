import axios from "axios";
const CancelToken = axios.CancelToken;
const source = CancelToken.source();
let response;
let cancel;
let pageNumber = 0;

let users = async (pageNo) => {

  try {
    if (Number(pageNo) === Number(pageNumber)){
      source.cancel('Next request canceled')
    }
    pageNumber = pageNo

    let res = await axios.get(`https://randomuser.me/api/?page=${pageNo}&results=10&seed=abc`,
        {cancelToken: source.token})

    response = res.data
  } catch (e) {
    if (axios.isCancel(e)) {
      console.log(e.message);
    } else {
      // handle error
      console.log(e)
      response = null
    }

  }
  return response
};

/*function makeRequestCreator() {
  var call;
  return function (url) {
    if (call) {
      call.cancel();
    }
    call = axios.CancelToken.source();
    return axios.get(url, {cancelToken: call.token}).then((response) => {
      console.log(response.title)
    }).catch(function (thrown) {
      if (axios.isCancel(thrown)) {
        console.log('First request canceled', thrown.message);
      } else {
        // handle error
      }
    });
  }
}*/

export {users}