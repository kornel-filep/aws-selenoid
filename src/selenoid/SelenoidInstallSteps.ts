export class SelenoidInstallSteps {
    private _installSteps = [
        '#!/bin/bash',
        'mkdir /home/ubuntu/selenoid',
        'sudo curl -L "https://github.com/aerokube/cm/releases/download/1.8.1/cm_linux_amd64" --output /home/ubuntu/selenoid/configmanager',
        'sudo chmod +x /home/ubuntu/selenoid/configmanager',
    ]

    public getInstallSteps(browser?: string) {
        if (browser) {
            this._installSteps.push(`/home/ubuntu/selenoid/configmanager selenoid start --browsers '${browser}'`)
        }
        this._installSteps.push('/home/ubuntu/selenoid/configmanager selenoid start')
        return this._installSteps
    }
}
