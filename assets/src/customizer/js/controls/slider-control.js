import ColibriVueControl from "../colibri-vue-control";


export default class SliderControl extends ColibriVueControl {
    name() {
        return "colibri-slider";
    }

    vueWatch(wpControl) {

    }

    vueCreated(wpControl) {
        return function () {
            this.debouncedSetValue = _.debounce(this.setValue, 500);
        }
    }

    vueData(wpControl) {
        let value = parseFloat(this.getWpControlValue(wpControl)) || 0;
        return {
            value: parseFloat(this.getWpControlValue(wpControl)) || 0,
            min: parseFloat(wpControl.params.min) || 0,
            max: parseFloat(wpControl.params.max) || 100,
            step: parseFloat(wpControl.params.step) || 1,
        }
    }

    vueMethods(wpControl) {
        let self = this;
        return {
            setValue(value) {
                value = parseFloat(value);
                this.value = value;
                self.setWpControlValue(wpControl, value);
            },
            keyUp(event) {
                if (event.target.value) {
                    this.debouncedSetValue(event.target.value);
                }
            }
        }
    }
}







