import { API_URL } from "../../constants/api";
import { fetchPost } from "../../utils/fetch";

export interface RequestOtpCode {
  email: string;
  otpCode: string;
}

export const requestOtpCode = async ({ email, otpCode }: RequestOtpCode) => {
  const response = await fetchPost(`${API_URL}/render/get-new-render`, {
    email,
    otpCode,
  });
  return response;
};
