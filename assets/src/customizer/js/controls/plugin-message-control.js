import ColibriVueControl from "../colibri-vue-control";

let $ = jQuery;

function prepareCall(doneCallback) {
  if (!_.isEmpty(wp.customize.dirtyValues())) {
    let executeCallback = true;
    wp.customize.bind("save", () => {
      if (executeCallback) {
        $(window).off("beforeunload");
        setTimeout(doneCallback, 2000);
        executeCallback = false;
      }
    });
    wp.customize.previewer.save();
  } else {
    $(window).off("beforeunload");
    setTimeout(doneCallback, 500);
  }
}

function pluginNotice(message, type = "info") {
  let $infoMessage = $("[data-colibri-plugin-action-message]");
  $infoMessage.attr("class", `notice notice-large notice-${type}`);
  $infoMessage.html(message);
  $infoMessage.show();
  colibriCustomizer.showOverlay(message);
}

function installBuilder(options) {
  pluginNotice(colibriwp_plugin_status.messages.installing);

  prepareCall(() => {
    $.get(colibriwp_plugin_status.install_url).done(() => {
    	activateBuilder(options);
    });
  });
}

function activateBuilder(options) {
  pluginNotice(colibriwp_plugin_status.messages.activating);

  prepareCall(() => {
    wp.ajax
        .post(colibriwp_plugin_status.theme_prefix + "activate_plugin", {
          slug: colibriwp_plugin_status.slug,
          _wpnonce: colibriwp_plugin_status.plugin_activate_nonce,
          source: options?.source ?? null
        })
        .done((response) => {
          setTimeout(() => {
            window.location = response.redirect || window.location;
          }, 500);
        });
  });
}

export default class PluginMessageControl extends ColibriVueControl {
  ready(wpControl) {
    wpControl.container.on("click", "[data-colibri-plugin-action]", (event) => {
      let $el = $(event.currentTarget);
      let action = $el.data("colibri-plugin-action");
      let source = "customizer-sidebar-feature";
      $el.fadeOut();

      event.preventDefault();
      event.stopPropagation();
      if (action === "install") {
        installBuilder({ source });
      }

      if (action === "activate") {
        activateBuilder({ source });
      }
    });
  }

  name() {
    return "colibri-plugin-message";
  }

  vueData(wpControl) {
    return {};
  }

  vueWatch(wpControl) {
    return {};
  }

  vueMethods(wpControl) {}
}



$(document).on(
    "click",
    ".kubio-customizer-panel [data-colibri-plugin-action]",
    (event) => {
      const { builderStatusData } = window.colibri_Customizer_Data;
      let $el = $(event.currentTarget);
      let action = $el.data("colibri-plugin-action");
      const source = $el.data("source");

      event.preventDefault();
      event.stopPropagation();

      const onboardingAction = document.querySelector('input[name="kubio-onboarding-action"]:checked')?.getAttribute('value');
      if (onboardingAction) {
        if (builderStatusData.status === "not-installed") {
          installBuilder({ source });
        }

        if (builderStatusData.status === "installed") {
          activateBuilder({ source });
        }
      } else {
        $el.fadeOut();

        if (action === "install") {
          installBuilder({ source });
        }

        if (action === "activate") {
          activateBuilder({source});
        }
      }
    }
);








