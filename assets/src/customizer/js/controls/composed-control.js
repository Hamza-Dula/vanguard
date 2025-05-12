import ColibriVueControl from "../colibri-vue-control";

export default class ComposedControl extends ColibriVueControl {
    name() {
        return "colibri-composed";
    }

    vueData(wpControl) {
        let defaultValues = {};

        _(wpControl.params.fields).forEach((field, key) => {
            defaultValues[key] = parseFloat(field['default']) ? parseFloat(field['default']) : field['default'];
        });

        return {
            value: this.getWpControlValue(wpControl) ? this.getWpControlValue(wpControl) : defaultValues,
            fields: wpControl.params.fields
        }
    }

    vueComputed(wpControl) {

        return {
            classControlType(field) {
                return 'customize-control-colibri-' + field.type;
            }
        }
    }

    vueWatch(wpControl) {
        return {
            fields: _.debounce(function (value, oldVal) {
                if (value !== oldVal) {
                    this.setValue();
                }
            }, 300)
        }
    }

    vueMethods(wpControl) {
        let control = this;
        return {
            getComponentType(name) {
                return `colibri-composed-${name}`;
            },

            setValue() {
                control.setWpControlValue(wpControl, this.value);
            },

            propChanged(value, item, prop) {
                this.value[prop] = value;
                this.setValue();
            },
        }
    }
}







