import "./undescore-extensions";
import "../../common/css-reload";
import Sortable from "sortablejs";

import Vue from "vue";
import WPService from "./vue-components/wp-service";
import translate from "./vue-components/translate";
import "./panels/colibri-panel";
import "./sections/colibri-section";
import "./sections/colibri-floating-section";
import "./controls";
import "./active-callback";
import "./header-presets";
import "./install-companion-popover";

translate.use(window.colibri_Customizer_Data.translations);
Vue.use(new WPService());

Vue.directive("sortable-el-accordion", {
  inserted(el, binding, vnode) {
    new Sortable(el, {
      animation: 150,
      ghostClass: "sortable-ghost",
      handle: ".el-collapse-item__header",
      group: {
        pull: false,
        put: false,
      },
      onEnd({ newIndex, oldIndex }) {
        if (!_.isFunction(binding.value)) {
          let target = binding.value.splice(oldIndex, 1)[0];
          binding.value.splice(newIndex, 0, target);
        }
        binding.value(newIndex, oldIndex);
      },
      setData(dataTransfer) {
        dataTransfer.setDragImage(document.createElement("div"), 0, 0);
      },
    });
  },
});

class ColibriCustomizer {
  constructor() {
    this._settings = window.colibri_Customizer_Data;
  }

  get settings() {
    return this._settings;
  }

  showOverlay(message) {
    let $overlay = jQuery(".colibri-customizer-overlay");

    if (!$overlay.length) {
      $overlay = jQuery(
        "" +
          '<div class="colibri-customizer-overlay">\n' +
          '        <div class="colibri-customizer-overlay-content">\n' +
          '            <span class="colibri-customizer-overlay-loader"></span>\n' +
          '            <span class="colibri-customizer-overlay-message"></span>\n' +
          "        </div>\n" +
          "    </div>"
      );

      jQuery("body").append($overlay);
    }

    $(".colibri-customizer-overlay-message").html(message);
    $overlay.fadeIn();
  }

  hideOverlay() {
    let $overlay = jQuery(".colibri-customizer-overlay");
    $overlay.fadeOut();
  }

  getActiveControls() {
    let targetWindow = null;
    if (wp.customize.previewer && wp.customize.previewer.targetWindow()) {
      targetWindow = wp.customize.previewer.targetWindow();
    }

    if (targetWindow && targetWindow._wpCustomizeSettings) {
      return targetWindow._wpCustomizeSettings.activeControls || {};
    }

    return {};
  }
}

window.colibriCustomizer = new ColibriCustomizer(window);

jQuery(($) => {
  // wp.ajax.post("colibriwp_disable_big_notice", {
  //   nonce: window.colibri_Customizer_Data.kubio_disable_big_notice_nonce
  // });

  if (window.colibriCustomizer.settings.colibri_autofocus) {
    let id = window.colibriCustomizer.settings.colibri_autofocus;
    let autofocusAliases =
      window.colibriCustomizer.settings.colibri_autofocus_aliases || {};

    id = autofocusAliases[id] || id;

    if (!id) {
      return;
    }

    wp.customize(id, function(instance) {
      let control = instance.findControls()[0];
      control.deferred.embedded.done(function() {
        wp.customize.previewer.deferred.active.done(function() {
          control.focus({}, true);
        });
      });
    });
  }

  let debouncedReflowed = _.debounce(function() {
    wp.customize.trigger("colibri-reflowed");
  }, 300);

  wp.customize.bind("pane-contents-reflowed", debouncedReflowed);

  window.addEventListener("message", (event) => {
    try {
      let message = JSON.parse(event.data);
      if (message.id === "colibri-ready") {
        wp.customize.trigger("colibri-preview-ready", message.data);
        wp.media.mixin.removeAllPlayers = () => {};
      }

      if (message.id === "url") {
        wp.customize.trigger("colibri-preview-start", message.data);
      }
    } catch (e) {}
  });
});








