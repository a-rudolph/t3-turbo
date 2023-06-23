import { type ApiError, type ApiResponse } from "./types";

export async function makeFetch<T>(
  ...fetchArgs: Parameters<typeof fetch>
): Promise<ApiResponse<T>> {
  const response = await fetch(...fetchArgs);
  const json = (await response.json()) as T;

  if (response.status !== 200) {
    throw {
      code: response.status,
      type: response.statusText,
      data: json as ApiError,
    };
  }

  return {
    code: response.status,
    type: response.statusText,
    data: json,
  };
}
