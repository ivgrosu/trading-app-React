export const setAuthUid = (id) => {
  localStorage.setItem("uid", id);
};

export const getAuthUid = () => {
  const uid = localStorage.getItem("uid");
  return uid;
};

export const removeAuthUid = () => {
  localStorage.removeItem("uid");
};

export const uidLoader = () => {
  return getAuthUid();
};
