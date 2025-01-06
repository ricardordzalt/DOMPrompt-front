import { API_URL } from "../../constants/api";
import { fetchPost } from "../../utils/fetch";

export interface GetNewHtml {prompt: string; currentHTML: string;}

export const getNewHtml = async ({prompt, currentHTML}: GetNewHtml) => {
  const response = await fetchPost(`${API_URL}/get-new-html`, {
    prompt,
    currentHTML,
  });
  return response;
};
