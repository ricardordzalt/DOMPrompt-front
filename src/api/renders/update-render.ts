import { API_URL } from "../../constants/api";
import { fetchPost } from "../../utils/fetch";

export interface UpdateRender {
  render: string;
  renderId: string;
}

export const updateRender = async ({ render, renderId }: UpdateRender) => {
  const response = await fetchPost(`${API_URL}/render/update-render/${renderId}`, {
    render,
  });
  return response;
};
