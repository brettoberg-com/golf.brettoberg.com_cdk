#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { BrettobergComCdkStack } from '../lib/brettoberg.com-cdk-stack';

const app = new cdk.App();
new BrettobergComCdkStack(app, 'BrettobergComCdkStack');
