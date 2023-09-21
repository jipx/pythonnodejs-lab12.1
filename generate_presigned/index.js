  var 
    AWS_SDK = require("aws-sdk"),
    S3_API = new AWS_SDK.S3({apiVersion: "2006-03-01"}),
    BUCKET_NAME_STR = process.env.MY_BUCKET_STR;

  exports.handler = async (event) => {
      console.log("BUCKET_NAME_STR", BUCKET_NAME_STR);
      var
          key_str = "report.html",
          expires_in_seconds_int = 60,
          params = {
              Bucket: BUCKET_NAME_STR, 
              Key: key_str,
              Expires: expires_in_seconds_int
          },
          presigned_url_str = S3_API.getSignedUrl("getObject", params),
          response = {
     
              "presigned_url_str": presigned_url_str
          };
      return response;
  };