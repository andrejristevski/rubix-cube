class CongfigurationProvider {

    constructor(...args) {
        this.configurationObject = this.loadConfigurations(...args);
    }

    get(key) {
        return this.configurationObject[key];
    }

    loadConfigurations(...args) {

        let configurationObject = {};
        Object.assign(configurationObject, ...args);
        return configurationObject;
    }
}


