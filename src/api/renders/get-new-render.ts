import { API_URL } from "../../constants/api";
import { fetchPost } from "../../utils/fetch";

export interface GetNewRender {prompt: string; currentRender: string;}

export const getNewRender = async ({prompt, currentRender}: GetNewRender) => {
  const response = await fetchPost(`${API_URL}/render/get-new-render`, {
    prompt,
    currentRender,
  });
  return response;
};
