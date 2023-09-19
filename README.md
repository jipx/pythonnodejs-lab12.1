# pythonnodejs-lab12.1

## Amazon Cognito
Lab overview and objectives
In this lab, you will work as Sofía to integrate Amazon Cognito into the café website. Frank wants to be able to log in and request a coffee bean inventory report directly from the café website. Amazon Cognito provides an authentication service, which Sofía wants to use for this website enhancement. This usability enhancement will use the state machine that you built in the previous lab using AWS Step Functions.

After completing this lab, you should be able to:

Create an Amazon Cognito user pool
Create an Amazon Cognito user pool user
Configure an app client to use Amazon Cognito as an authentication service
Integrate an Amazon Cognito app client into a website
Update REST API endpoints that are built with Amazon API Gateway to call Amazon Cognito for authentication purposes
Configure an API Gateway authorizer
Scenario
Frank wants to be able to log in to the café website and request an inventory report to be sent to his email address (on his phone). He wants to be able to see the latest coffee bean inventory data quickly. In this lab, you will play the role of Sofía to implement this technical feature request.

In the previous lab, Sofía created a Step Functions state machine that, once invoked, can generate the report that Frank wants. However, the state machine can currently only be invoked by using the test feature in the Step Functions console or by running a curl command to invoke the create_report REST API endpoint.

In this lab, Sofía will use Amazon Cognito to integrate an authentication mechanism into the website. Frank will be able to log in to the website to confirm his identity before he requests the report. Then, she will connect the REST API endpoint to the café website so that he can make his report request directly from the site. The API request will include the ID token that is retrieved as part of the authentication process, and Amazon Cognito will be used to validate the token. Then, the Step Functions state machine will be invoked, which will then invoke the AWS Lambda functions that generate the report.

The following diagram shows the architecture that was created for you in AWS at the start of the lab. The highlighted section is the part that you will modify in this lab. Notice that the login action does not yet work, and the website is not connected to the create_report API endpoint.


![image](https://github.com/jipx/pythonnodejs-lab12.1/assets/4178277/1be2fc93-9dd6-4f39-aaeb-652d8f22b8d1)
By the end of this lab, you will have created the architecture shown in the following diagram. Notice that authentication is tied into the website. Frank can use his authenticated session from the café website to directly invoke report creation.
![image](https://github.com/jipx/pythonnodejs-lab12.1/assets/4178277/da30178b-7c36-4359-871b-4822d5cc56f4)

