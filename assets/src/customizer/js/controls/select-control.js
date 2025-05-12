import ColibriVueControl from "../colibri-vue-control";

let $ = jQuery;

export default class SelectControl extends ColibriVueControl {
    name() {
        return "colibri-select";
    }

    vueData(wpControl) {
        return {
            value: this.getWpControlValue(wpControl),
            size: wpControl.params.size || "",
            options: $.map(wpControl.params.choices, (label, value) => {
                return {label, value}
            })
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







