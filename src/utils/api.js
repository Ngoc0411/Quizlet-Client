//const mocks = {
//  auth: { POST: { token: "This-is-a-mocked-token" } },
//  "user/me": { GET: { username: "ngoc", password: "dsdasd" } }
//};

import { mapState } from "vuex";

function ThongtinState(url, data, method) {
  if (url == "auth" && method == "POST") {
    return { token: "This-is-a-mocked-token" };
  } else if (url == "user/me" && method == "GET") {
    if(data == {}) {
      mapState({ data: state => state.user.profile });
    }
    return data;
  }
}

const apiCall = ({ url, data, method }) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        //resolve(mocks[url][method || "GET"]);
        resolve(ThongtinState(url, data || {}, method || "GET"));
        console.log(`Mocked '${url}' - ${method || "GET"}`);
        console.log(
          "response: ",
          ThongtinState(url, data || {}, method || "GET")
        );
      } catch (err) {
        reject(new Error(err));
      }
    }, 1000);
  });

export default apiCall;
