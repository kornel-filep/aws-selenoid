import { EC2 } from 'aws-sdk'

export class EC2Wrapper {
    private static readonly EC2 = new EC2()

    public async createInstances(params: EC2.Types.RunInstancesRequest) {
        return await EC2Wrapper.EC2.runInstances(params).promise()
    }

    public async waitForInstance(waitFor: any, instanceId: string) {
        return await EC2Wrapper.EC2.waitFor(waitFor, {
            InstanceIds: [instanceId],
        }).promise()
    }

    public async getDescribedInstance(instanceId: string) {
        return await EC2Wrapper.EC2.describeInstances({
            InstanceIds: [instanceId],
        }).promise()
    }

    public async getIpOfInstance(instanceId: string) {
        await this.waitForInstance('instanceStatusOk', instanceId)
        return (await this.getDescribedInstance(instanceId)).Reservations![0].Instances![0].PublicIpAddress
    }
}
