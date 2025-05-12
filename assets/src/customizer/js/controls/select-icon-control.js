import ColibriVueControl from "../colibri-vue-control";

let $ = jQuery;

export default class SelectIconControl extends ColibriVueControl {
    name() {
        return "colibri-select-icon";
    }

    vueData(wpControl) {
        let choices = _.toArray(wpControl.params.choices);

        return {
            value: this.getWpControlValue(wpControl),
            size: wpControl.params.size || "",
            options: choices,
        }
    }

    vueMethods(wpControl) {
        let self = this;
        return {
            setValue(value) {
                this.value = value;
                self.setWpControlValue(wpControl, value);
            },
        }
    }
}









