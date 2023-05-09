import { aws_apigateway, Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";

interface CdkStarterStackStackPros extends StackProps {
  api: aws_apigateway.RestApi;
  stageName: "dev" | "prod";
}

export class CdkStarterStackStack extends Stack {
  constructor(scope: Construct, id: string, props: CdkStarterStackStackPros) {
    const { api, stageName, ...stackProps } = props;
    super(scope, id, stackProps);

    const deployment = new aws_apigateway.Deployment(
      this,
      `my-api-deployment`,
      { api }
    );
    new aws_apigateway.Stage(this, `my-api-stage`, {
      stageName,
      deployment,
    });
  }
}
