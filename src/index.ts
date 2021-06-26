import dotenv from 'dotenv'
import AWS from 'aws-sdk'
import { SelenoidInstallSteps } from './selenoid/SelenoidInstallSteps'

dotenv.config()
AWS.config.update({ region: 'eu-north-1' })

const EC2 = new AWS.EC2()
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
    const instances = await EC2.runInstances(params).promise()
    const createdInstance = await EC2.waitFor('instanceStatusOk', {
        InstanceIds: [instances.Instances![0].InstanceId!],
    }).promise()
    const describedInstance = await EC2.describeInstances({
        InstanceIds: [createdInstance!.InstanceStatuses![0].InstanceId!],
    }).promise()
    console.log(describedInstance.Reservations![0].Instances![0].PublicIpAddress)
})()
