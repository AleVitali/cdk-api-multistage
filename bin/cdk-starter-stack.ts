#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { CdkStarterStackStack } from "../lib/cdk-starter-stack-stack";
import { SharedApiGatewayStack } from "../lib/shared-api-gateway-stack";

const app = new cdk.App();
const apiStack = new SharedApiGatewayStack(app, "my-api-shared-gw");
new CdkStarterStackStack(app, "my-api-deployment-stack-dev", {
  stageName: "dev",
  api: apiStack.api,
});
new CdkStarterStackStack(app, "my-api-deployment-stack-prod", {
  stageName: "prod",
  api: apiStack.api,
});
app.synth();
