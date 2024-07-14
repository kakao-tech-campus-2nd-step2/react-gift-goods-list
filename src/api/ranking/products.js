export default (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { targetType, rankType } = req.query;

  // API 로직 처리
  const responseData = {
    products: [
      { id: 1, name: 'Product 1', rank: 1 },
      { id: 2, name: 'Product 2', rank: 2 },
    ],
  };

  res.status(200).json(responseData);
};
