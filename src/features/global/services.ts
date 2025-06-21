import { ConsultationsPaths } from "@/src/constants/Routes";
import RequestHelpers from "@/src/lib/axios/AxiosRequestUtils";

class GlobalServices {
	async getAllSubjects(token: string) {
		return RequestHelpers.makeRequest<{ success: boolean; subjects: any }>(
			"get",
			ConsultationsPaths.GET_ALL_SUBJECTS,
			token,
			undefined
		);
	}
}

export default new GlobalServices();
