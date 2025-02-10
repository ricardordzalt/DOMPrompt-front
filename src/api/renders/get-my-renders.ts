import { API_URL } from "../../constants/api";
import { fetchGet } from "../../utils/fetch";

export const getMyRenders = async () => {
  const response = await fetchGet(`${API_URL}/render/get-my-renders`);
  return response;
};
