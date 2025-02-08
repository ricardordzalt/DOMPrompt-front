import { API_URL } from "../../constants/api";
import { fetchPost } from "../../utils/fetch";

export interface VerifyOtpCode {
  email: string;
  otpCode: string;
}

export const verifyOtpCode = async ({ email, otpCode }: VerifyOtpCode) => {
  const response = await fetchPost(`${API_URL}/auth/verify-otp`, {
    email,
    otpCode,
  });
  return response;
};
