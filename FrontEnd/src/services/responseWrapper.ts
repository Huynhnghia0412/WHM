type ResponseWrapper<T> = {
  statusCode: number;
  isSuccess: boolean;
  errorMessages: [];
  messages: string;
  result: T;
};

export default ResponseWrapper;
