import axios from "axios";

const JSON_SERVER_HOST = "https://longing-chief-roadway.glitch.me";

//READ
export const fetchData = async () => {
  const response = await axios.get(`${JSON_SERVER_HOST}/expenses`);
  return response.data;
};

//CREATE
export const addData = async (newData) => {
  const response = await axios.post(`${JSON_SERVER_HOST}/expenses`, newData);
  return response.data;
};

//Detailpage READ
export const DetailFetchData = async ({ queryKey }) => {
  const response = await axios.get(
    `${JSON_SERVER_HOST}/expenses/${queryKey[1]}`
  );
  return response.data;
};

//UPDATE
export const upadateData = async (updatedData) => {
  const response = await axios.put(
    `${JSON_SERVER_HOST}/expenses/${updatedData.id}`,
    updatedData
  );
  return response.data;
};

//DELETE
export const deleteData = async (id) => {
  const response = await axios.delete(`${JSON_SERVER_HOST}/expenses/${id}`);
  return response.data;
};
