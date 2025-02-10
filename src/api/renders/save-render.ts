import { API_URL } from "../../constants/api";
import { fetchPost } from "../../utils/fetch";

export interface SaveRender {
  render: string;
}

export const saveRender = async ({ render }: SaveRender) => {
  const response = await fetchPost(`${API_URL}/render/create-render`, {
    render,
  });
  return response;
};
