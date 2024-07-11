export const ErrorMessage = (message: { message: string }) => {
  return <div>{message.message}</div>;
};

export const EmptyMessage = () => {
  return <div>데이터가 없는데용?</div>;
};
