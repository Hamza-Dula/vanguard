import ColibriVueControl from "../colibri-vue-control";

export default class GradientControl extends ColibriVueControl {
    name() {
        return "colibri-gradient";
    }

    vueRegisterComponents(Vue) {

    }

    vueData(wpControl) {
        return {
            value: this.getWpControlValue(wpControl),
            selected: this.getWpControlValue(wpControl).name,
            gradients: wpControl.params.choices,
        }
    }

    vueComputed(wpControl) {
        return {}
    }

    vueMethods(wpControl) {
        let control = this;
        return {
            setValue(gradient) {

                this.value = gradient;
                // this.selected = gradient.name;

                control.setWpControlValue(wpControl, {
                    steps: gradient.steps,
                    name: gradient.name,
                    angle: gradient.angle
                });
            },

            isSelected(name) {
                return this.selected === gradient.name;
            },

            computeGradient(gradient) {

                let colors = gradient.steps
                    .map(color => `${color.color} ${color.position}%`)
                    .join(',');

                return "background-image:" + `linear-gradient(${gradient.angle}deg, ${colors});`;

            }
        }
    }

}








