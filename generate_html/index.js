    var 
        AWS_SDK = require("aws-sdk"),
        S3_API = new AWS_SDK.S3({apiVersion: "2006-03-01"}),
        BUCKET_NAME_STR = process.env.MY_BUCKET_STR;

    exports.handler = async (event, context, callback) => {
      await writeReport(await createHTML(event));
        var response = {
             "msg_str": "Report published to S3"
        };
        return response;
    };

    function getCSSLink(){
        var html_str = `
              html, body, section, h1, h2, h3, h4, p{
                margin: 0;
                padding: 0;
              }
              .report{
                background-color: whitesmoke;
                padding: 0;
                margin: 0;
                position: relative;
              }
              .report h1{
                color: #e7e2e2;
                font-size: 42px;
                text-align: center;
                background-color: #434343;
                border-bottom: 1px solid #b9b4b4;
                padding: 12px 24px;
              }
              .report h2{
                font-size: 24px;
              }
              .report p{
                font-size: 18px;
                padding: 12px 0px;
                font-style: italic;
              }
              .report [data-role="timestamp"]{
                font-size: 16px;
                color: #cac6c6;
                position: absolute;
                top: 32px;
                right: 24px;
              }
              .report [data-role="supplier_info"]{
                width: 90%;
                margin: 12px auto;
                color: #434343;
                border-bottom: 2px dotted #505951;
                padding-bottom: 12px;
                padding-top: 16px;
              }
              .report [data-role="bean_info"]{
                display: inline-block;
                color: #434343;
                margin-bottom: 12px;
                border-radius: 6px;
                margin-right: 12px;
                border: 1px solid #434343;
              }
              .report [data-role="bean_info"] h3{
                padding: 12px 24px;
                font-size: 20px;
              }
              .report [data-role="bean_info"] h4{
                padding: 12px 24px;
                font-size: 18px;
              }
              .report [data-role="bean_info"] span{
                padding: 12px 24px;
                font-size: 16px;
                display: block;
              }
    `;

        return html_str;
    }

    async function createHTML(event){
        var 
          item_obj_arr = event.my_json_arr,
          html_str = '',
            o = {},
            k = {};

        html_str += '<!DOCTYPE html>';
        html_str += '<html>';
        html_str +=   '<head>';
        html_str +=     '<title>Bean quantity report</title>';
        html_str +=      '<style>' + getCSSLink() + '</style>';
        html_str +=   '</head>';
        html_str +=   '<body>';
        html_str +=     '<section class="report">';
        html_str +=     '<h1>Report</h1>';
        html_str +=     '<span data-role="timestamp">';
        html_str +=       new Date().toLocaleTimeString();
        html_str +=     '</span>';
        for(var i_int = 0; i_int < item_obj_arr.length; i_int += 1){
          o = item_obj_arr[i_int];
            html_str +=     '<section data-role="supplier_info">';
            html_str +=       '<h2>';
            html_str +=         o.supplier_name_str;
            html_str +=       '</h2>';
            html_str +=       '<p>';
            html_str +=         o.supplier_address_str + " : " + o.supplier_phone_str;
            html_str +=       '</p>';
            for(var j_int = 0; j_int <  o.bean_info_obj_arr.length; j_int += 1){
                k = o.bean_info_obj_arr[j_int];
                html_str +=   '<div data-role="bean_info">';
                html_str +=     '<h3>' + k.type_str + '</h3>';
                html_str +=     '<h4>' + k.quantity_int.toString() + '</h4>';
                html_str +=     '<span>' + k.product_name_str + '</span>';
                html_str +=   '</div>';
            }
            html_str +=        '</section>'; //end supplier info
        }
        html_str +=     '</section>'; //end report
        html_str +=   '</body>';
        html_str += '</html>';
        return html_str;
    }

    async function writeReport(html_str){

      var params = {
          Bucket: BUCKET_NAME_STR,
          Key: "report.html",
            Body: html_str,
            CacheControl: "max-age=0",
            ContentType: "text/html"
        };
        await S3_API.upload(params).promise();
    }