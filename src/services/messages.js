import axios from 'axios';
const baseUrl = '/api/messages';

const create = async (newObject) => {
  const response = await axios.post(baseUrl, newObject);
  return response.data;
};

export default { create };
