import { EC2, config } from 'aws-sdk'
import dotenv from 'dotenv'
export class EC2Wrapper {
    private readonly EC2 = new EC2()

    static init() {
        dotenv.config()
        config.update({
            credentials: {
                accessKeyId: process.env['AWS_ACCESS_KEY_ID']!,
                secretAccessKey: process.env['AWS_SECRET_ACCESS_KEY']!,
            },
            region: process.env['AWS_REGION'],
        })
    }

    public async createInstances(params: EC2.Types.RunInstancesRequest) {
        return await this.EC2.runInstances(params).promise()
    }

    public async waitForInstance(waitFor: any, instanceId: string) {
        return await this.EC2.waitFor(waitFor, {
            InstanceIds: [instanceId],
        }).promise()
    }

    public async getDescribedInstance(instanceId: string) {
        return await this.EC2.describeInstances({
            InstanceIds: [instanceId],
        }).promise()
    }

    public async getIpOfInstance(instanceId: string) {
        await this.waitForInstance('instanceStatusOk', instanceId)
        return (await this.getDescribedInstance(instanceId)).Reservations![0].Instances![0].PublicIpAddress
    }

    public async terminateInstance(instanceId: string) {
        await this.EC2.terminateInstances({ InstanceIds: [instanceId] }).promise()
    }
}

EC2Wrapper.init()
