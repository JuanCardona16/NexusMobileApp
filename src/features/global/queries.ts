import { useAuthState } from "@/src/core/hooks/zustand/useAuthState";
import { useQuery } from "@tanstack/react-query";
import GlobalServices from './services';

export const useSubject = () => {
	const { token } = useAuthState();

	const query = useQuery({
		queryKey: ["user/subjects", token],
		queryFn: () => GlobalServices.getAllSubjects(token!),
		retry: 1,
		enabled: !!token 
	});

	return {
		subjects: query.data?.subjects,
	};
};