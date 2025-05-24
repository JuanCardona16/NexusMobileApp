import { useProfile } from "../queries";

export const useUser = () => {
	const getProfile = useProfile();

	return {
		profile: getProfile,
	};
};
