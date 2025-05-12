import Vue from 'vue';
import maybe_deserialize from "./maybe-deserialize";

let api = wp.customize;

export default class ColibriVueControl {
    constructor() {
        let control = this;
        api.controlConstructor[this.name()] = api.Control.extend({

            ready: function () {
                this.Vue = Vue;
                control.vueRegisterComponents(this.Vue);
                let vueControl = this.vueMount();
                this.vueControl = vueControl;
                control.ready(this, vueControl);
                let settingRerenderBind = _.debounce(() => {

                    if (this.skipSettingBindCheck) {
                        this.skipSettingBindCheck = false;
                        return;
                    }

                    this.rerender();

                }, 100);

                if (this.setting) {
                    this.setting.bind(settingRerenderBind);
                }

            },

            rerender() {
                this.renderContent();
                this.vueMount();
            },

            setValue(value) {
                if (_.isObject(value) || _.isArray(value)) {
                    value = encodeURIComponent(JSON.stringify(value));
                }

                this.skipSettingBindCheck = true;
                this.setting.set(value);

            },

            vueMount() {
                return new this.Vue({
                    delimiters: ['${', '}'],
                    el: this.container.find('[data-name="vue-mount-point"]')[0],
                    data: () => control.vueData(this),
                    methods: control.vueMethods(this, this.Vue),
                    computed: control.vueComputed(this),
                    watch: control.vueWatch(this),
                    created: control.vueCreated(this),
                    mounted: control.vueMounted(this),
                })
            }
        });
    }


    ready(wpControl) {
    }

    name() {
        throw new TypeError("name function should be implemented");
    }

    getWpControlValue(wpControl) {

        let value = maybe_deserialize(wpControl.setting.get());
        if (typeof value == 'object') {
            for (let key in value) {
                value[key] = parseFloat(value[key]) ? parseFloat(value[key]) : value[key];
            }

        }
        return value;
    }

    setWpControlValue(wpControl, value) {
        return wpControl.setValue(value);
    }

    vueRegisterComponents(Vue) {

    }

    registerComponent(name, data) {
        let componentExists = name in Vue.options.components;

        if (!componentExists) {
            Vue.component(name, data);
        }
    }

    vueData(wpControl) {
        throw new TypeError("vueData function should be implemented");
    }

    vueMethods(wpControl, Vue) {
        throw new TypeError("vueMethods function should be implemented");
    }

    vueComputed(wpControl) {

    }

    vueWatch(wpControl) {

    }

    vueCreated(wpControl) {

    }

    vueMounted(wpControl) {

    }


}








