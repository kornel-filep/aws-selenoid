import dotenv from 'dotenv'
import AWS from 'aws-sdk'
import { TestEnvironmentManager } from './manager/TestEnvironmentManager'
import WebDriver, { Browser } from 'selenium-webdriver'

dotenv.config()
AWS.config.update({
    credentials: {
        accessKeyId: process.env['AWS_ACCESS_KEY_ID']!,
        secretAccessKey: process.env['AWS_SECRET_ACCESS_KEY']!,
    },
    region: 'eu-north-1',
})
;(async () => {
    const testEnvironmentManager = new TestEnvironmentManager()
    const instanceData = await testEnvironmentManager.createInstanceWithDefaults()
    console.log(`Ip of instance created: ${instanceData.instanceIp}`)
    const caps = new WebDriver.Capabilities()
    caps.setBrowserName('chrome')

    const webDriver = await new WebDriver.Builder()
        .forBrowser(Browser.CHROME)
        .usingServer(`http://${instanceData.instanceIp}:4444/wd/hub`)
        .withCapabilities(caps)
        .build()

    await webDriver.get('http://google.com')

    console.log(await webDriver.getTitle())

    await webDriver.quit()

    await testEnvironmentManager.terminateInstance(instanceData.instanceId)
})()
