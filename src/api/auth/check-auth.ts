import { API_URL } from "../../constants/api";
import { fetchGet } from "../../utils/fetch";

export const checkAuth = async () => {
  const response = await fetchGet(`${API_URL}/auth/check-auth`);
  return response;
};
