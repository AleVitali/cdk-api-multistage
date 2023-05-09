import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";

export class SharedApiGatewayStack extends cdk.Stack {
  public readonly api: cdk.aws_apigateway.RestApi;

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    this.api = new cdk.aws_apigateway.RestApi(this, "api", {
      description: "example api gateway",
      // 👇 disable default deployment
      deploy: false,
      // 👇 enable CORS
      defaultCorsPreflightOptions: {
        allowHeaders: [
          "Content-Type",
          "X-Amz-Date",
          "Authorization",
          "X-Api-Key",
        ],
        allowMethods: ["OPTIONS", "GET", "POST", "PUT", "PATCH", "DELETE"],
        allowCredentials: true,
        allowOrigins: ["http://localhost:3000"],
      },
    });

    // 👇 create an Output for the API URL
    // new cdk.CfnOutput(this, "apiUrl", { value: api.url });
  }
}
