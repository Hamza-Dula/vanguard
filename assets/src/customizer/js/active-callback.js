/**@global jQuery , _ */
import compare from "./compare";
import maybe_deserialize from "./maybe-deserialize";

let api = wp.customize;
let reflowed = true;
let activeCallbacksBind = false;
let deactivateControl = (settingId) => {
    let control = wp.customize(settingId).findControls()[0];
    control.deactivate();
};

let activateControl = (settingId) => {
    let control = wp.customize(settingId).findControls()[0];
    control.activate();
};

let onChange = function (settingId, activeRules) {

    if (!reflowed) {
        return;
    }

    for (let i = 0; i < activeRules.length; i++) {
        let rule = activeRules[i];
        let conditionMet = compare(
            maybe_deserialize(api(rule.setting).get()),
            rule.value,
            rule.operator
        );
        // condition not met
        if (conditionMet === false) {
            deactivateControl(settingId);
            return;

        } else {

            // condition undetermined
            if (conditionMet === null) {
                return;
            }
        }
    }

    activateControl(settingId);
};


api.bind('colibri-reflowed', function () {
    reflowed = true;

    if (!activeCallbacksBind) {
        jQuery.each(api.settings.controls, function (controlID, options) {
            if (options.active_rules) {
                let rules = options.active_rules;

                for (let i = 0; i < rules.length; i++) {
                    let ac = rules[i];
                    if (_.isObject(ac)) {
                        wp.customize(ac.setting)?.bind(function () {
                            onChange(options.settings.default, rules);
                        });
                    }
                }
            }
        });
        activeCallbacksBind = true;
    }

});

api.bind('colibri-preview-start', function () {
    reflowed = false;
});








