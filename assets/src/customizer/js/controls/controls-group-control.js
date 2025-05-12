import ColibriVueControl from "../colibri-vue-control";

let api = wp.customize;

export default class ControlsGroupControl extends ColibriVueControl {
    constructor() {
        super();
        this.controlsHolder = {};
        return this;
    }

    name() {
        return "colibri-controls-group";
    }

    ready(wpControl) {
        api.bind('pane-contents-reflowed', () => {
            let holder = this.controlsHolder[wpControl.params.key];
            if (!holder) {
                this.controlsHolder[wpControl.params.key] = $(" <ul data=\"controls-holder\"></ul>");
                holder = this.controlsHolder[wpControl.params.key];
            }

            _.each(wpControl.params.controls || [], (setting_id) => {
                let control = wp.customize(setting_id).findControls()[0];
                if (control) {
                    holder.append(control.container);
                }
            });
        });
    }

    vueData(wpControl) {
        let value = (this.getWpControlValue(wpControl) !== undefined) ? !!this.getWpControlValue(wpControl) : true;
        return {
            value: value,
            show_toggle: wpControl.params.show_toggle || false,
            visible: false,
        }
    }


    vueMethods(wpControl) {
        let control = this;
        return {
            getComponentType(name) {
                return `colibri-conditional-${name}`;
            },
            conditionChanged() {
                control.setWpControlValue(wpControl, this.value);
            },

            onShow() {
                let holder = jQuery(`[data-holder-id="${wpControl.params.key}"]`);
                if (control.controlsHolder[wpControl.params.key]) {
                    control.controlsHolder[wpControl.params.key].appendTo(holder);
                }

            },
            togglePopup() {
                this.visible = !this.visible;
            }
        }
    }
}








