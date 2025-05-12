import ColibriVueControl from "../colibri-vue-control";
import FontAwesomeIcons from "../font-awesome";

let $ = jQuery;

export default class IconControl extends ColibriVueControl {
    name() {
        return "colibri-icon";
    }

    vueData(wpControl) {
        return {
            icons: FontAwesomeIcons,
            value: this.getWpControlValue(wpControl)
        }
    }

    vueComputed(wpControl) {
        return {}
    }

    vueMethods(wpControl) {
        return {}
    }
}







