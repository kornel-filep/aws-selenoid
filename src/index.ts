import dotenv from 'dotenv'
import AWS from 'aws-sdk'
dotenv.config()
AWS.config.update({ region: 'eu-north-1' })
import { SelenoidInstallSteps } from './selenoid/SelenoidInstallSteps'
import { EC2Wrapper } from './aws/EC2Wrapper'

const selenoidInstallSteps = new SelenoidInstallSteps()

AWS.config.getCredentials((err) => {
    if (err) {
        console.log(
            'Your AWS credentials might not be configured. Please configure them through environment variables using dotenv.'
        )
        console.log(err.stack)
    } else {
        console.log('AWS credentials configuration found')
    }
})

const params = {
    ImageId: process.env['AWS_AMI_ID'],
    InstanceType: 't3.micro',
    KeyName: process.env['AWS_KEY_NAME'],
    SecurityGroupIds: [process.env['AWS_SECURITY_GROUP_ID']],
    UserData: Buffer.from(selenoidInstallSteps.getInstallSteps('chrome').join('\n')).toString('base64'),
    MaxCount: 1,
    MinCount: 1,
} as AWS.EC2.RunInstancesRequest

;(async () => {
    const ec2 = new EC2Wrapper()
    const createdInstance = await ec2.createInstances(params)
    console.log(await ec2.getIpOfInstance(createdInstance.Instances![0].InstanceId!))
})()
