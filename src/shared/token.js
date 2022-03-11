const getToken = () => {
  const token = sessionStorage.getItem("token");

  if (token) {
    return token;
  } else {
    return null;
  }
};

const setToken = (token) => {
  if (!token) {
    return false;
  }
  sessionStorage.setItem("token", token);
};

const delToken = () => {
  const c = console.log("되어라");
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("uid");
  sessionStorage.removeItem("username");
  sessionStorage.removeItem("nickname");
  sessionStorage.removeItem("isLogin");
};

export { getToken, setToken, delToken };
