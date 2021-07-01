# AWS-Selenoid

This is a small demo project to showcase how to use Selenoid with AWS EC2 instances.  
Selenoid can be used to provide and manage containerized browsers. It puts each browser into its own container, which can be provisioned on-demand.  
This demo combines selenoid with AWS EC2 instances, to show a solution a common problem of testing across different browsers.

Selenoid: https://github.com/aerokube/selenoid

# Setup

1. Install latest NodeJS LTS.
2. Configure AWS credentials as shown in `.env.example`.

# Run

1. `yarn watch` to start TSC in watch mode.
2. `yarn start` to execute the project after starting `yarn watch`.
