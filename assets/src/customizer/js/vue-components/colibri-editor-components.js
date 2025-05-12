import Vue from "vue";
import ColibriButtonGroup from "./ColibriButtonGroup";
import Tooltip from "./tooltip";
import SelectWithIcon from './SelectWithIcon';
import MediaPicker from "./media-picker";
import IconPicker from "./ColibriIcon";
import ColibriSelect from "./Select";
import ColibriText from "./ColibriText";
import ColibriSlider from "./ColibriSlider";
import ColibriSwitch from "./ColibriSwitch";

import {Button, ButtonGroup, ColorPicker, Slider} from "element-ui";

Vue.component(Button.name, Button);
Vue.component(ButtonGroup.name, ButtonGroup);

export {
    ColibriButtonGroup,
    ColorPicker as ColibriColorPicker,
    MediaPicker,
    Slider,
    IconPicker,
    ColibriSelect,
    ColibriText,
    ColibriSlider,
    ColibriSwitch,
    Tooltip,
    SelectWithIcon
}








