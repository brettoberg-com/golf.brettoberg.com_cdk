import { Construct } from "constructs";
import { RemovalPolicy } from "aws-cdk-lib";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as cloudFront from "aws-cdk-lib/aws-cloudfront";
import * as cloudFrontOrigins from "aws-cdk-lib/aws-cloudfront-origins";
import * as iam from "aws-cdk-lib/aws-iam";
import * as s3BucketDeployment from "aws-cdk-lib/aws-s3-deployment";
import * as base from "./BaseStack";

interface WebsiteStackProps extends base.BaseStackProps {}

export class WebsiteStack extends base.BaseStack {
  private readonly _prefix = "WebsiteStack";

  constructor(scope: Construct, props: WebsiteStackProps) {
    super(scope, "WebsiteStack", props);

    const bucket = new s3.Bucket(scope, `${this._prefix}Bucket`, {
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      publicReadAccess: false,
      encryption: s3.BucketEncryption.S3_MANAGED,
      enforceSSL: true,
      versioned: true,
      removalPolicy: RemovalPolicy.RETAIN,
    });

    const oai = new cloudFront.OriginAccessIdentity(
      scope,
      `${this._prefix}OAI`
    );

    bucket.addToResourcePolicy(
      new iam.PolicyStatement({
        resources: [bucket.arnForObjects("*")],
        actions: ["s3:GetObject"],
        principals: [oai.grantPrincipal],
      })
    );

    new cloudFront.Distribution(
      scope,
      `${this._prefix}CloudFrontDistribution`,
      {
        defaultBehavior: {
          origin: new cloudFrontOrigins.S3Origin(bucket, {
            originAccessIdentity: oai,
          }),
          viewerProtocolPolicy:
            cloudFront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        },
      }
    );

    new s3BucketDeployment.BucketDeployment(scope, `${this._prefix}`, {
      sources: [], // TODO: Add source path. Currently nothing will be deployed
      destinationBucket: bucket,
      cacheControl: [
        s3BucketDeployment.CacheControl.fromString("public,max-age=3600"),
      ],
      retainOnDelete: true,
      prune: false,
    });
  }
}
