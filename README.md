# AWS-Selenoid

This is a small side project to create a library which uses AWS and Selenoid to provide test infrastructure.  
Selenoid can be used to provide and manage containerized browsers. It puts each browser into its own container, which can be provisioned on-demand.

Selenoid: https://github.com/aerokube/selenoid

# Setup

1. Install latest NodeJS LTS.
2. Configure AWS credentials as shown in `.env.example`, either through dotenv or through environment variables.

# How to create a custom AMI

For this project to work, a proper amazon machine image is required.  
The custom AMI needs docker installed on it.  
Material to help with custom EC2 AMI creation:  
How to install docker on EC2: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/docker-basics.html  
How to create custom AMI from EC2 instance: https://docs.aws.amazon.com/toolkit-for-visual-studio/latest/user-guide/tkv-create-ami-from-instance.html

# How to configure your own security group

For this project to work, a security group needs to be configured in the AWS console.  
Selenoid needs port `4444` open for communication.  
As a best practice opening port `20` for ssh access might also be a good idea.

# Run

1. `yarn watch` to start TSC in watch mode.
