import ColibriVueControl from "../colibri-vue-control";

export default class SwitchControl extends ColibriVueControl {
    name() {
        return "colibri-switch";
    }

    vueData(wpControl) {
        let initialValue = this.getWpControlValue(wpControl);
        initialValue = jQuery.isNumeric(initialValue) ? !!parseInt(initialValue) : initialValue;
        initialValue = initialValue ? true : false;
        return {
            value: initialValue
        }
    }

    vueMethods(wpControl) {
        return {
            setValue: (value) => {
                this.setWpControlValue(wpControl, value);
            }
        }
    }
}







