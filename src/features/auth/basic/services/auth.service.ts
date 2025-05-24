import { ConsultationsPaths } from "@/src/constants/Routes";
import RequestHelpers from "../../../../lib/axios/AxiosRequestUtils";
import { LoginRequestData, RegisterRequestData } from "../types";

/**
 * Clase que proporciona servicios de autenticación, como inicio de sesión y registro.
 */
class AuthenticationServices {
	/**
	 * Realiza una solicitud para iniciar sesión con las credenciales proporcionadas.
	 *
	 * @param data - Objeto que contiene los datos necesarios para el inicio de sesión.
	 * @returns Una promesa que resuelve con un objeto que indica si la operación fue exitosa y los datos asociados.
	 */
	login = async (data: LoginRequestData) => {
		return RequestHelpers.makeRequest<{ success: boolean; data: string }>(
			"post",
			ConsultationsPaths.LOGIN,
			undefined,
			data
		);
	};

	/**
	 * Realiza una solicitud para registrar un nuevo usuario con los datos proporcionados.
	 *
	 * @param data - Objeto que contiene los datos necesarios para el registro.
	 * @returns Una promesa que resuelve con un objeto que indica si la operación fue exitosa y los datos asociados.
	 */
	register = async (data: RegisterRequestData) => {
		return RequestHelpers.makeRequest<{ success: boolean; data: string }>(
			"post",
			ConsultationsPaths.REGISTER,
			undefined,
			data
		);
	};
}

export default new AuthenticationServices();
