import ColibriVueControl from "../colibri-vue-control";


export default class InputControl extends ColibriVueControl {
    name() {
        return "colibri-input";
    }

    vueData(wpControl) {
        return {
            value: this.getWpControlValue(wpControl),
            input_type: wpControl.params.input_type || "text"

        }
    }

    vueWatch(wpControl) {
        return {
            value: _.debounce((value, oldVal) => {
                if (value !== oldVal) {
                    this.setWpControlValue(wpControl, value);
                }
            }, 300)
        }
    }


    vueMethods(wpControl) {
        return {
            setValue: (value) => {
                this.setWpControlValue(wpControl, value);
            },


        }
    }
}







