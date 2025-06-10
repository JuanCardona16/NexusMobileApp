import ApiInstance from "@/src/config/api";

class RequestHelpers {

  /**
   * Makes an HTTP request using the specified method, path, and optional parameters.
   *
   * @template T - The expected type of the response data.
   * @param methods - The HTTP method to use for the request. Can be "get", "put", "delete", or "post".
   * @param path - The endpoint path for the request.
   * @param token - (Optional) A bearer token for authorization. If provided, it will be included in the request headers.
   * @param payload - (Optional) The request payload, typically used for "post" or "put" methods.
   * @returns A promise that resolves to the response data of type `T`.
   * @throws An error if the request fails, including the HTTP method and path in the error message.
   */
  public async makeRequest<T>(
    methods: "get" | "put" | "delete" | "post",
    path: string,
    token?: string,
    payload?: Record<string, unknown>
  ): Promise<T> {
    try {
      const headers: Record<string, string> = {}; // Encabezados vacíos por defecto

      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      const response = await ApiInstance.request({
        method: methods,
        url: path,
        headers: headers,
        data: payload,
      });
      return response.data as T;
    } catch (error) {
      console.log(error)
      throw new Error(
        `Error in ${methods.toUpperCase()} request to ${path}: ${error}`
      );
    }
  }
}

export default new RequestHelpers();