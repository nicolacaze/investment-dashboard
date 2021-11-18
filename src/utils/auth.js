import GoTrue from "gotrue-js";

const auth = new GoTrue({
  APIUrl: "https://awesome-kirch-f7213c.netlify.app/.netlify/identity",
  audience: "",
  setCookie: false,
});

export default auth;
