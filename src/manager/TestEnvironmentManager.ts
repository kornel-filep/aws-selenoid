import { EC2Wrapper } from '../aws/EC2Wrapper'
import { SelenoidInstallSteps } from '../selenoid/SelenoidInstallSteps'

type InstanceData = {
    instanceId: string
    instanceIp: string | undefined
}

export class TestEnvironmentManager {
    private readonly selenoidInstallSteps = new SelenoidInstallSteps()
    private readonly ec2Wrapper = new EC2Wrapper()

    public async createInstanceWithDefaults(params?: AWS.EC2.RunInstancesRequest): Promise<InstanceData> {
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
        const instanceId = createdInstance.Instances![0].InstanceId!
        const instanceIp = await this.ec2Wrapper.getIpOfInstance(createdInstance.Instances![0].InstanceId!)
        return { instanceId, instanceIp }
    }

    public async terminateInstance(instanceId: string) {
        await this.ec2Wrapper.terminateInstance(instanceId)
        console.log(`Terminated instance ${instanceId}`)
    }
}
