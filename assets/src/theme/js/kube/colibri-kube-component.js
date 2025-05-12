import {ColibriFrontend as Colibri} from "@kubio/scripts/src/base";

export default class ColibriFrontComponent {
    constructor(element, options) {
        this.$ = jQuery;
        this.namespace = this.constructor.componentName();
        this.utils = new Colibri.Utils();
        this.detect = new Colibri.Detect();
        this.init();
        Colibri.apply(this, arguments);
        this.start();

        if (window.wp && window.wp.customize) {
            this.wpCustomize(wp.customize);
        }
        return this;
    }

    static componentName() {
        throw new TypeError("name getter should be implemented");
    }

    init() {

    }

    wpCustomize(api) {

    }

    wpSettingBind(setting_id, callback) {
        window.wp.customize(setting_id, function (setting) {
            setting.bind(callback);
        });
    }

    start() {

    }

}








