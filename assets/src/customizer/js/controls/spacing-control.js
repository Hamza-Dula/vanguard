import ColibriVueControl from "../colibri-vue-control";
import {t} from "../vue-components/translate";

export default class SpacingControl extends ColibriVueControl {
    name() {
        return "colibri-spacing";
    }

    vueData(wpControl) {
        return {
            value: _.extend({
                unit: 'px'
            }, this.getWpControlValue(wpControl)),
            controls: false,
            spacing_units: (wpControl.params.units || ["px", "%"]).map((unit) => {
                return {
                    unit,
                    label: unit
                }
            })
        }
    }

    vueWatch(wpControl) {

        return {
            value: {
                handler: (value, oldVal) => {
                    let old = this.getWpControlValue(wpControl);
                    if (old.unit != value.unit) {
                        for (let side in value.sides) {

                            if (value.unit == '%') {
                                value.sides[side] = value.sides[side] / 10;
                            } else {
                                value.sides[side] = value.sides[side] * 10;
                            }
                        }
                    }
                    this.setWpControlValue(wpControl, value);
                },
                deep: true
            }
        }
    }

    vueMethods(wpControl) {
        return {
            label: (side) => {
                return t(`colibri.${side}`);
            }

        }
    }
}







