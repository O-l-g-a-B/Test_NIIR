export const authHeader = () => {
  const token = localStorage.getItem("token")
    ? JSON.parse(localStorage.getItem("token"))
    : undefined;
  if (token) {
    return { Authorization: "Bearer " + token };
  } else {
    return {};
  }
};
