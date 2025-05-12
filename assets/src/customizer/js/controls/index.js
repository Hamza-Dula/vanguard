import translate from "../vue-components/translate";
import Vue from "vue";
import {
    ColibriButtonGroup,
    ColibriColorPicker,
    ColibriSelect,
    ColibriSlider,
    ColibriSwitch,
    ColibriText,
    IconPicker,
    MediaPicker,
    SelectWithIcon
} from "../vue-components/colibri-editor-components";
import SwitchControl from "./switch-control";
import SelectControl from "./select-control";
import PluginMessageControl from "./plugin-message-control";
import SeparatorControl from "./separator-control";
import LinkedSelectControl from "./linked-select-control";
import SelectIconControl from "./select-icon-control";
import ButtonGroupControl from "./button-group-control";
import AlignButtonGroupControl from "./align-button-group-control";
import ButtonControl from "./button-control";
import ColorControl from "./color-control";
import GradientControl from "./gradient-control";
import RepeaterControl from "./repeater-control";
import ComposedControl from "./composed-control";
import SliderControl from "./slider-control";
import InputControl from "./input-control";
import ControlsGroupControl from "./controls-group-control";
import SpacingControl from "./spacing-control";
import IconControl from "./icon-control";
import {
    Button,
    Collapse,
    CollapseItem,
    ColorPicker,
    Input,
    InputNumber,
    Option,
    Popover,
    RadioButton,
    RadioGroup,
    Select,
    Slider,
    Switch,
    Tooltip,
} from "element-ui";

Vue.component('select-with-icon', SelectWithIcon);
Vue.component(Tooltip.name, Tooltip);
Vue.component(Popover.name, Popover);
Vue.component(Input.name, Input);
Vue.component(Collapse.name, Collapse);
Vue.component(CollapseItem.name, CollapseItem);
Vue.component(Button.name, Button);
Vue.component(Select.name, Select);
Vue.component(Option.name, Option);
Vue.component(Slider.name, Slider);
Vue.component(InputNumber.name, InputNumber);
Vue.component(RadioButton.name, RadioButton);
Vue.component(RadioGroup.name, RadioGroup);
Vue.component(Switch.name, Switch);
Vue.component(ColorPicker.name, ColorPicker);

Vue.component('colibri-group-control', ColibriButtonGroup);
Vue.component('icon-picker', IconPicker);

// repeat controls
Vue.component('colibri-repeater-image', MediaPicker);
Vue.component('colibri-repeater-icon', IconPicker);
Vue.component('colibri-repeater-input', Input);
Vue.component('colibri-repeater-select', ColibriSelect);
Vue.component('colibri-repeater-text', ColibriText);

// composed controls
Vue.component('colibri-composed-select', ColibriSelect);
Vue.component('colibri-composed-text', ColibriText);
Vue.component('colibri-composed-slider', ColibriSlider);
Vue.component('colibri-composed-switch', ColibriSwitch);
Vue.component('colibri-composed-color-picker', ColibriColorPicker);

translate.use(window.colibri_Customizer_Data.translations);


let controlFocus = wp.customize.Control.prototype.focus;

let colibriControlFocus = function (control, params, autofocus) {
    let focusContainer;
    let construct = control;
    let focusElement;
    let api = wp.customize;
    let completeCallback;
    params = params || {};

    if ((construct.extended(api.Panel) || construct.extended(api.Section)) && construct.expanded && construct.expanded()) {
        focusContainer = construct.contentContainer;
    } else {
        focusContainer = construct.container;
    }

    focusElement = focusContainer.find('.control-focus:first');
    if (0 === focusElement.length) {
        // Note that we can't use :focusable due to a jQuery UI issue. See: https://github.com/jquery/jquery-ui/pull/1583
        focusElement = focusContainer.find('input, select, textarea, button, object, a[href], [tabindex]').filter(':visible').first();
    }
    focusElement.focus();

    // animate it a bit
    if (autofocus) {
        setTimeout(() => {
            focusContainer.addClass('colibri-control-focus');

            setTimeout(() => {
                focusContainer.removeClass('colibri-control-focus');
            }, 2050);

        }, 500);
    }

    if (params.completeCallback) {
        completeCallback = params.completeCallback;
        params.completeCallback = function () {
            focus();
            completeCallback();
        };
    } else {
        params.completeCallback = function () {
        };
    }

    api.state('paneVisible').set(true);
    params.completeCallback();
};

wp.customize.Control.prototype.focus = function (params, autofocus) {

    if (this.params.colibri_tab) {
        let tab = this.params.colibri_tab;
        let section = this.section();
        let self = this;
        wp.customize.section(section).focus({
            completeCallback() {
                wp.customize.section(section).activateTabControls(tab, function () {
                    colibriControlFocus(self, params, autofocus);
                });

            }
        });

    } else {
        controlFocus.call(this, params, autofocus);
    }


};


// initialize vue controls;
new SwitchControl();
new SelectControl();
new PluginMessageControl();
new SeparatorControl();
new LinkedSelectControl();
new SelectIconControl();
new ButtonGroupControl();
new AlignButtonGroupControl();
new ColorControl();
new GradientControl();
new RepeaterControl();
new ComposedControl();
new SliderControl();
new InputControl();
new ControlsGroupControl();
new SpacingControl();
new IconControl();
new ButtonControl();









