import { EC2Wrapper } from '../aws/EC2Wrapper'
import { SelenoidInstallSteps } from '../selenoid/SelenoidInstallSteps'

export class TestEnvironmentManager {
    private readonly selenoidInstallSteps = new SelenoidInstallSteps()
    private readonly ec2Wrapper = new EC2Wrapper()

    public async createInstanceWithDefaults(params?: AWS.EC2.RunInstancesRequest) {
        const finalParams = {
            ImageId: process.env['AWS_AMI_ID'],
            InstanceType: 't3.micro',
            KeyName: process.env['AWS_KEY_NAME'],
            SecurityGroupIds: [process.env['AWS_SECURITY_GROUP_ID']],
            UserData: Buffer.from(this.selenoidInstallSteps.getInstallSteps('chrome').join('\n')).toString('base64'),
            ...params,
            MaxCount: 1,
            MinCount: 1,
        } as AWS.EC2.RunInstancesRequest

        const createdInstance = await this.ec2Wrapper.createInstances(finalParams)
        return await this.ec2Wrapper.getIpOfInstance(createdInstance.Instances![0].InstanceId!)
    }
}
