export class SelenoidInstallSteps {
    private _installSteps = [
        'mkdir selenoid',
        'cd selenoid/',
        'sudo curl -L "https://github.com/aerokube/cm/releases/download/1.8.1/cm_linux_amd64" --output configmanager',
        'sudo chmod +x configmanager',
        './configmanager selenoid start',
    ]

    public get installSteps() {
        return this._installSteps
    }
}
