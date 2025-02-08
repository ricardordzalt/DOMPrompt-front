import { useQuery } from "@tanstack/react-query";
import { checkAuth } from "../../../../api/auth/check-auth";

const useCheckAuth = () => {
  const query = useQuery({
    queryKey: ["auth"],
    queryFn: checkAuth,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: 0,
  });

  return query;
};

export { useCheckAuth };
