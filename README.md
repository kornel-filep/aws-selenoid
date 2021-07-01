# AWS-Selenoid

This is a small demo project to showcase how to use Selenoid with AWS EC2 instances.  
Selenoid can be used to provide and manage containerized browsers. It puts each browser into its own container, which can be provisioned on-demand.  
This demo combines selenoid with AWS EC2 instances, to show a solution a common problem of testing across different browsers.

Selenoid: https://github.com/aerokube/selenoid

# Setup

1. Install latest NodeJS LTS.
2. Configure AWS credentials as shown in `.env.example`.

# How to create a custom AMI

For this demo project to work, a proper amazon machine image is required.  
The custom AMI needs docker installed on it.  
Material to help with custom EC2 AMI creation:  
How to install docker on EC2: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/docker-basics.html  
How to create custom AMI from EC2 instance: https://docs.aws.amazon.com/toolkit-for-visual-studio/latest/user-guide/tkv-create-ami-from-instance.html

# How to configure your own security group

For this demo to work, a security group needs to be configured in the AWS console.  
Selenoid needs port `4444` open for communication.  
As a best practice opening port `20` for ssh access might also be a good idea.

# Run

1. `yarn watch` to start TSC in watch mode.
2. `yarn start` to execute the project after starting `yarn watch`.
