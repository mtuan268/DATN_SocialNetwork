import axios from "axios";

export const getDataAPIAdmin = async (url) => {
  const res = await axios.get(`/api/${url}`);
  return res;
};

export const deleteDataAPIAdmin = async (url) => {
  const res = await axios.delete(`/api/${url}`);
  return res;
};

export const patchDataAPIAdmin = async (url, post) => {
  const res = await axios.patch(`/api/${url}`, post);
  return res;
};

export const postDataAPIAdmin = async (url, post, token) => {
  const res = await axios.post(`/api/${url}`, post, {
    headers: { Authorization: token },
  });
  return res;
};
