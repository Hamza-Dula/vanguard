import runJs from "../js-helpers";
import domready from "domready";

domready(function() {
  /*
  Not knowing what this does


  if (window !== top) {
    setTimeout(() => {
      document.querySelector("body").style.transform = "translateZ(0)";
      window.scrollTo(0, 0);
    }, 100);
  }
  */

  let settingsInActiveRules = [];

  settingsInActiveRules
    .concat(_.keys(colibri_JS_OUTPUT_CONTROLS))
    .forEach(function(control_id) {
      wp.customize(control_id, function(value) {
        value.bind(function(newValue, oldValue) {
          runJs(colibri_JS_OUTPUT_CONTROLS[this.id], newValue, oldValue);
          top.wp.customize.requestChangesetUpdate({}, { autosave: true });
        });
      });
    });
});








