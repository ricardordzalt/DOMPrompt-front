import { API_URL } from "../../constants/api";
import { fetchPost } from "../../utils/fetch";

export interface RequestOtpCode {
  email: string;
}

export const requestOtpCode = async ({ email }: RequestOtpCode) => {
  const response = await fetchPost(`${API_URL}/auth/request-otp`, {
    email,
  });
  return response;
};
