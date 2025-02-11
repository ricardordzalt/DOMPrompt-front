import { API_URL } from "../../constants/api";
import { fetchGet } from "../../utils/fetch";

interface GetRender {
  renderId: string;
}

export const getRender = async ({ renderId }: GetRender) => {
  const response = await fetchGet(`${API_URL}/render/get-render/${renderId}`);
  return response;
};
