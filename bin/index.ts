#!/usr/bin/env node

import * as cdk from "aws-cdk-lib";
import * as stacks from "../lib/Stacks/WebsiteStack";
import * as definitions from "../lib/definitions";

const app = new cdk.App();
const stages = [definitions.Stage.prod];

stages.forEach((stage) => {
  new stacks.WebsiteStack(app, {
    stage,
  });
});
