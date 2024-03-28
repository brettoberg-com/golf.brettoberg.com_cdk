import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import * as definitions from "../definitions";

export interface BaseStackProps extends StackProps {
  stage: definitions.Stage;
}

export class BaseStack extends Stack {
  protected _stackId: string;

  constructor(scope: Construct, stackName: string, props: BaseStackProps) {
    const identifier = `golf.brettoberg.com-${stackName}-${props.stage}`;
    super(scope, identifier, props);
    this._stackId = identifier;
  }
}
