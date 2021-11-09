/* eslint-disable */
exports.handler = (event, context, callback) => {
  const body = JSON.parse(event.body);
  console.log(body);
  return callback(null, {
    statusCode: 200,
    body: "FROM SUBMISSION FUNCTION",
  });
};
