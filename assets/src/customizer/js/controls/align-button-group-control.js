import ButtonGroupControl from "./button-group-control";

let api = wp.customize;

export default class AlignButtonGroupControl extends ButtonGroupControl {

    name() {
        return "colibri-align-button-group";
    }

    vueData(wpControl) {
        let values = {};
        $.map(wpControl.params.choices, (label, value) => {
            values[label] = value;
        });
        this.value = this.getWpControlValue(wpControl);
        return {
            rawHtml: '',
            value: this.getWpControlValue(wpControl),
            size: wpControl.params.button_size || 'small',
            values: values,
            classes: (value) => {
                let classes = ['h-col'];

                if (this.value === value) {
                    classes.push('is-selected');
                }
                if (this.grayDisable) {
                    classes.push('use-gray-disable');
                } else {
                    classes.push('use-opacity-disable');
                }

                return classes;
            }
        }
    }

    vueMethods(wpControl) {
        var self = this;
        return {
            handleButtonClicked: function (value) {
                this.value = value;
                self.value = value;
                self.setWpControlValue(wpControl, value);
            },
            buttonIsSelected: function (buttonValue) {
                return this.value === buttonValue;
            },
            noneClicked: function (value) {
                this.value = wpControl.params.none_value;
                self.value = value;
                self.setWpControlValue(wpControl, wpControl.params.none_value);
            }
        }
    }
}








