import { ConsultationsPaths } from "@/src/constants/Routes";
import RequestHelpers from "@/src/lib/axios/AxiosRequestUtils";

/**
 * Clase que proporciona servicios del usuairo, como obtener su informacion, etc.
 */
class UserServices {
	/**
	 * Realiza una solicitud para obtener la informacion del usuario logueado
	 *
	 * @param token - Identificador de acceso
	 * @returns Una promesa que resuelve con un objeto que indica si la operación fue exitosa y los datos asociados.
	 */
	getUserProfile = async (token: string) => {
		return RequestHelpers.makeRequest<{ success: boolean; data: any }>(
			"get",
			ConsultationsPaths.GET_USER_PROFILE,
			token,
			undefined
		);
	};
}

export default new UserServices();
