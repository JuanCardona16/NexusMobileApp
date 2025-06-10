import { useAuthState } from "@/src/core/hooks/zustand/useAuthState";
import { useQuery } from "@tanstack/react-query";
import UserServices from "../services/user.services";

export const useProfile = () => {
	const { token } = useAuthState();

	const query = useQuery({
		queryKey: ["user/profile", token],
		queryFn: () => UserServices.getUserProfile(token!),
		retry: 1,
		enabled: !!token 
	});

	return {
		profile: query.data,
		isFetchingUser: query.isLoading,
		isUserFetchError: query.isError,
		userFetchError: query.error,
		isUserFetchSuccess: query.isSuccess,
	};
};
