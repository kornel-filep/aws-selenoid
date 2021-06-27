import dotenv from 'dotenv'
import AWS from 'aws-sdk'
import { TestEnvironmentManager } from './manager/TestEnvironmentManager'

dotenv.config()
AWS.config.update({ region: 'eu-north-1' })
;(async () => {
    const testEnvironmentManager = new TestEnvironmentManager()
    const ipOfInstance = await testEnvironmentManager.createInstanceWithDefaults()
    console.log(`Ip of instance created: ${ipOfInstance}`)
})()
