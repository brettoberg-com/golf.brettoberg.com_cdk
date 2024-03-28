import { Construct } from "constructs";
import * as s3 from "aws-cdk-lib/aws-s3";
import { RemovalPolicy } from "aws-cdk-lib";
import { BaseStack, BaseStackProps } from "./BaseStack";

interface WebsiteStackProps extends BaseStackProps {}

export class WebsiteStack extends BaseStack {
  private readonly _prefix = "WebsiteStack";
  private readonly _bucket: s3.Bucket;

  constructor(scope: Construct, props: WebsiteStackProps) {
    super(scope, "WebsiteStack", props);

    this._bucket = new s3.Bucket(scope, `${this._prefix}Bucket`, {
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      encryption: s3.BucketEncryption.S3_MANAGED,
      enforceSSL: true,
      versioned: true,
      removalPolicy: RemovalPolicy.RETAIN,
    });
  }

  get bucket(): s3.Bucket {
    return this._bucket;
  }
}
