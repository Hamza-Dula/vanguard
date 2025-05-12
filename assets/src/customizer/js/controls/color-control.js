import ColibriVueControl from "../colibri-vue-control";


export default class ColorControl extends ColibriVueControl {
    name() {
        return "colibri-color";
    }
    vueData(wpControl) {
        return {
            value: this.getWpControlValue(wpControl),
            alpha: !!wpControl.params.alpha,
            canActiveChange: wpControl.params.active_change || true,
            size: wpControl.params.size || 'small'
        }
    }

    vueMethods(wpControl) {
        let control = this;
        return {
            setValue: (value) => {
                this.value = value;
                this.setWpControlValue(wpControl, value);
            },

            activeChange(value) {
                if (this.canActiveChange) {
                    this.value = value;
                    control.setWpControlValue(wpControl, value);
                }
            }
        }
    }
}







