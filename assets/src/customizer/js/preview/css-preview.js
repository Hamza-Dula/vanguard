import compare from "../compare";
import maybe_deserialize from "../maybe-deserialize";

let $ = jQuery,
    domready = require('domready'),
    sprintf = require("sprintf-js").sprintf;


function isSettingActive(key) {
    if (!colibri_CONTROLS_ACTIVE_RULES[key]) {
        return true;
    }

    let rules = colibri_CONTROLS_ACTIVE_RULES[key] || [];

    for (let i = 0; i < rules.length; i++) {
        let rule = rules[i],
            setting = wp.customize(rule.setting),
            value1 = setting ? maybe_deserialize(setting.get()) : undefined,
            value2 = rule.value,
            operator = rule.operator;

        if (setting && !compare(value1, value2, operator)) {
            return false;
        }
    }

    return true;
}

function getStyleRulesByMedia() {
    let medias = {};

    for (let key in colibri_CSS_OUTPUT_CONTROLS) {
        if (!colibri_CSS_OUTPUT_CONTROLS.hasOwnProperty(key)) {
            continue;
        }


        if (!isSettingActive(key)) {
            continue;
        }

        let rules = colibri_CSS_OUTPUT_CONTROLS[key];
        rules.forEach(function (data) {
            if (!medias[data.media]) {
                medias[data.media] = [];
            }

            let value = maybe_deserialize(wp.customize(key).get());
            if (_.isObject(data.value)) {
                value = data.value[value];
            }
            medias[data.media].push($.extend({}, data, {value: value}));
        });

    }

    return medias;
}

function getItemValue(item) {

    if(!item.value && !_.isNumber(item.value) && !_.isBoolean(item.value)){
        return  undefined;
    }

    if (_.isObject(item.value)) {

        let __value = item.value_pattern;

        __value = __value.replace(/#([\w_.]+)#/ig, function (m1, m2) {
            return _.get(item.value, m2);
        });

        return __value;
    } else {
        if (_.isBoolean(item.value)) {
            if (item.value) {
                if (item.true_value) {
                    return item.true_value;
                } else {
                    return undefined;
                }

            } else {
                if (item.false_value) {
                    return item.false_value;
                } else {
                    return undefined;
                }
            }

        }


    }

    if (!JSON.stringify(item.value).length) {
        return '';
    }


    let result;
    try {
        result = sprintf(item.value_pattern, item.value);
    } catch (e) {

    }

    return result;
}

function generateCSSOutputForMedia(media, data) {
    let selectors = {};

    let selectorsPrefix = colibri_ADDITIONAL_JS_DATA.css_selectors_prefix || "";

    data.forEach(function (item) {

        let selector = item.selector;

        if (_.isArray(selector)) {
            selector = selector.join(',');
        }

        if (!selectors[selector]) {
            selectors[selector] = {};
        }

        let value = getItemValue(item);

        if (value !== undefined) {
            selectors[selector][item.property] = value;
        }

    });


    let content = '';
    for (let selector in selectors) {

        if (!selectors.hasOwnProperty(selector)) {
            continue;
        }

        let selector_composed_rules = [],
            selector_rules = selectors[selector];

        if(Object.keys(selector_rules).length === 0){
            continue;
        }

        for (let prop in selector_rules) {
            if (!selector_rules.hasOwnProperty(prop)) {
                continue;
            }
            let value = selector_rules[prop];
            selector_composed_rules.push(`${prop}:${value}`);
        }

        let rules = selector_composed_rules.join(";");
        content += `${selectorsPrefix} ${selector}{${rules}}`;
    }

    if (media) {
        content = `${media}{${content}}`;
    }

    return content;
}

function _displayStyle() {
    let $style = $('[data-kubio-theme-style="true"]'),
        styleByMedia = getStyleRulesByMedia(),
        content = '';


    for (let media in styleByMedia) {
        if (!styleByMedia.hasOwnProperty(media)) {
            continue;
        }

        let data = styleByMedia[media];
        if (media === "__colibri__no__media__") {
            media = "";
        }

        content += generateCSSOutputForMedia(media, data);
    }

    $style.text(content);
}

let displayStyle = _.debounce(_displayStyle, 100);

domready(function () {
    let settingsInActiveRules = [];

    for (let key in colibri_CONTROLS_ACTIVE_RULES) {
        if (!colibri_CONTROLS_ACTIVE_RULES.hasOwnProperty(key)) {
            continue;
        }

        if (!colibri_CSS_OUTPUT_CONTROLS[key]) {
            continue;
        }

        for (let i = 0; i < colibri_CONTROLS_ACTIVE_RULES[key].length; i++) {
            let setting = colibri_CONTROLS_ACTIVE_RULES[key][i].setting;
            if (setting && settingsInActiveRules.indexOf(setting) === -1) {
                settingsInActiveRules.push(setting);
            }
        }

    }


    settingsInActiveRules.concat(_.keys(colibri_CSS_OUTPUT_CONTROLS)).forEach(function (control_id) {
        wp.customize(control_id, function (value) {
            value.bind(function (newValue, oldValue) {
                displayStyle();
                top.wp.customize.requestChangesetUpdate({}, {autosave: true});
            });
        });
    });
});








