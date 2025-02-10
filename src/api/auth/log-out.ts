import { API_URL } from "../../constants/api";
import { fetchGet } from "../../utils/fetch";

export const logOut = async () => {
  const response = await fetchGet(`${API_URL}/auth/log-out`);
  return response;
};
 