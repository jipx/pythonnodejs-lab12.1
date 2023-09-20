import boto3
import json

S3API = boto3.client("s3", region_name="us-east-1") 
bucket_name = "c81790a1735464l4721648t1w414728139848-s3bucket-1i2a5ied6a6ad"

policy_file = open("/home/ec2-user/environment/resources/public_policy.json", "r")


S3API.put_bucket_policy(
    Bucket = bucket_name,
    Policy = policy_file.read()
)
print ("Setting Permissions - DONE")