/* eslint-disable */
exports.handler = async (event, context) => {
  console.log("FROM SUBMISSION FUNCTION");
  console.log(event);
  console.log(context);
  return {
    statusCode: 200,
    body: JSON.stringify(event),
  };
};
