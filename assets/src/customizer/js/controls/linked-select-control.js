import ColibriVueControl from "../colibri-vue-control";

let $ = jQuery;

export default class LinkedSelectControl extends ColibriVueControl {
    name() {
        return "colibri-linked-select";
    }

    vueData(wpControl) {

        return {
            value: this.getWpControlValue(wpControl),
            size: wpControl.params.size || "",
            options: []
        }
    }

    updateVueControlData(wpControl, linkedToValue) {
        let defaultValue = wpControl.vueControl.value;
        let hasDefaultValue = false;
        let choices = $.map(wpControl.params.choices[linkedToValue] || [], (label, value) => {
            if (value === defaultValue) {
                hasDefaultValue = true;
            }
            return {label, value};
        });

        wpControl.vueControl.updateData(choices);

        if (!hasDefaultValue && choices.length) {
            wpControl.vueControl.value = choices[0]['value'];
            wpControl.vueControl.setValue(choices[0]['value']);
        }

        if (linkedToValue === wpControl.params.hide_on || !wpControl.params.choices[linkedToValue] || !choices.length) {
            wpControl.deactivate();
        } else {
            wpControl.activate();
        }
    }

    ready(wpControl, control) {

        let linkedToSetting = window.wp.customize(wpControl.params.linked_to);
        linkedToSetting.bind((newValue) => {
            this.updateVueControlData(wpControl, newValue);
        });

        this.updateVueControlData(wpControl, linkedToSetting.get());
    }

    vueMethods(wpControl) {
        return {
            setValue: (value) => {
                this.setWpControlValue(wpControl, value);
            },
            updateData(value) {
                this.$set(this, "options", value);
            }
        }
    }
}







