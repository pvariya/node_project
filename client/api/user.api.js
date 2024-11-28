const baseUrl = "http://localhost:8090";
// import Cookies from "js-cookie";
const userApi = {
  signUp: async (user) => {
    try {
      let req = await fetch(`${baseUrl}/user/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      let res = await req.json();
      if (res.token) {
        Cookies.set("isVarified", res.isVarified);
        Cookies.set("token", res.token, { expires: 1 / 24 });
        window.location.href = "/";
      } else {
        alert("user already exists");
        console.error("Token missing in the response:", res);
        window.location.href ="/pages/login.html"
      }
    } catch (error) {
      console.error("Signup Error:", error);
    }
  },

  login: async (user) => {
    try {
      let req = await fetch(`${baseUrl}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      let res = await req.json();
      Cookies.set("isVarified", res.isVarified);
      Cookies.set("token", res.token, { expires: 1 / 24 });

      window.location.href = "/";
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  },
};

export default userApi;
