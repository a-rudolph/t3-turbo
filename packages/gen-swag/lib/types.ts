export type ApiResponse<T> = {
  code: number;
  type: string;
  data: T;
};

export type ApiError = {
  code: number;
  type: string;
  data: {
    code: number;
    message: string;
    type: "error";
  };
};
