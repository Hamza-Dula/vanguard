import ColibriVueControl from "../colibri-vue-control";
import runJs from "../js-helpers";

let $ = jQuery;
let api = wp.customize;

export default class ButtonControl extends ColibriVueControl {
    name() {
        return "colibri-button";
    }

    vueData(wpControl) {
        return {
            value: 0
        }
    }

    vueComputed(wpControl) {
        return {}
    }

    vueMethods(wpControl) {
        return {
            onClick: (value) => {
                runJs(wpControl.params.js_output);
                // this.setWpControlValue(wpControl, Date.now());
            }
        }
    }
}








