import axios from 'axios';
const baseUrl =
  'http://localhost:5001/discord-clone-e2238/us-central1/api/messages';

const create = async (newObject) => {
  const response = await axios.post(baseUrl, newObject);
  return response.data;
};

export default { create };
