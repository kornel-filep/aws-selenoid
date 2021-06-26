import dotenv from 'dotenv'
import AWS from 'aws-sdk'

dotenv.config()

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
