import ColibriVueControl from "../colibri-vue-control";

let api = wp.customize;

export default class ButtonGroupControl extends ColibriVueControl {
    name() {
        return "colibri-button-group";
    }

    vueData(wpControl) {
        return {
            value: String(this.getWpControlValue(wpControl)),
            options: $.map(wpControl.params.choices, (label, value) => {
                return {label, value}
            }),
            size: wpControl.params.button_size || 'small',
        }
    }

    vueMethods(wpControl) {
        var self = this;
        return {
            handleButtonClicked: function (value) {
                this.value = value;
                self.setWpControlValue(wpControl, value);
            },
            noneClicked: function (value) {
                this.value = wpControl.params.none_value;
                self.setWpControlValue(wpControl, wpControl.params.none_value);
            }
        }
    }
}







