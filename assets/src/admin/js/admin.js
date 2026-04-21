(function($) {
  let $notice_container = $(".vanguard-admin-big-notice--container");
  let selectedFrontPage = 0;

  if (!window.vanguard_admin) {
    return;
  }

  const { builderStatusData, getStartedData } = window.vanguard_admin;

  $notice_container.on("click", ".predefined-front-pages li", event => {
    let $item = $(event.currentTarget);
    $item.addClass("selected");
    $item.siblings().removeClass("selected");
  });

  function disableNotice() {
    wp.ajax.post("colibriwp_disable_big_notice", {
      nonce: builderStatusData.kubio_disable_big_notice_nonce
    });
  }

  function toggleProcessing(value) {
    $(window).on("beforeunload.vanguard-admin-big-notice", () => {
      return true;
    });
    if (value) {
      $(".vanguard-admin-big-notice").addClass("processing");
      $(".vanguard-admin-big-notice .action-buttons").fadeOut();
    } else {
      $(".vanguard-admin-big-notice").removeClass("processing");
    }
  }

  function showOverlay(message) {
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

  function hideOverlay() {
    let $overlay = jQuery(".colibri-customizer-overlay");
    $overlay.fadeOut();
  }

  function pluginNotice(message) {
    $notice_container.find(".plugin-notice .message").html(message);
    $notice_container.find(".plugin-notice").fadeIn();
    showOverlay(message);
  }

  function installBuilder(callback) {
    pluginNotice(builderStatusData.messages.installing);
    $.get(builderStatusData.install_url)
      .done(() => {
        toggleProcessing(true);
        activateBuilder(callback);
      })
      .always(() => {
        $(window).off("beforeunload.vanguard-admin-big-notice");
      });
  }

  function activateBuilder(callback) {
    pluginNotice(builderStatusData.messages.activating);

    wp.ajax
      .post(getStartedData.theme_prefix + "activate_plugin", {
        slug: builderStatusData.slug,
        _wpnonce: builderStatusData.plugin_activate_nonce
      })
      .done(response => {
        setTimeout(() => {
          $(window).off("beforeunload.vanguard-admin-big-notice");
          window.location = response.redirect || window.location;
        }, 500);
      });
  }

  function processBuilderInstalationStepts(
    callback,
    { AI = false, source = "notice" } = {}
  ) {
    pluginNotice(builderStatusData.messages.preparing);
    wp.ajax
      .post(getStartedData.theme_prefix + "front_set_predesign", {
        index: selectedFrontPage,
        AI: AI ? "yes" : "no",
        nonce: builderStatusData.kubio_front_set_predesign_nonce,
        source
      })
      .done(() => {
        if (builderStatusData.status === "not-installed") {
          toggleProcessing(true);
          installBuilder(callback);
        }

        if (builderStatusData.status === "installed") {
          toggleProcessing(true);
          activateBuilder(callback);
        }
      });
  }

  $notice_container.on(
    "click",
    ".start-with-predefined-design-button",
    function() {
      selectedFrontPage = $(".selected[data-index]").data("index");
      processBuilderInstalationStepts(() => {}, {
        AI: selectedFrontPage === 4
      });
    }
  );

  $notice_container.on("click", ".start-with-ai-page", function() {
    selectedFrontPage = $(".selected[data-index]").data("index");
    processBuilderInstalationStepts(() => {}, { AI: true });
  });

  $notice_container.on("click", ".view-all-demos", function() {
    selectedFrontPage = 0;
    processBuilderInstalationStepts(() => {}, {
      AI: false,
      source: "starter-sites"
    });
  });

  $notice_root = $notice_container.closest(".vanguard-admin-big-notice");
  $custom_close_button = $notice_root.find(
    ".vanguard-notice-dont-show-container"
  );
  if ($custom_close_button.length) {
    $custom_close_button.on("click", function() {
      disableNotice();
      $notice_container
        .closest(".vanguard-admin-big-notice")
        .find("button.notice-dismiss")
        .click();
    });
  } else {
    $notice_root.on("click", ".notice-dismiss", disableNotice);
  }

  var $document = $(document);

  var colibriInstallPluginSuccess = function(response) {
    var $message = $(".plugin-card-" + response.slug).find(".install-now");

    $message
      .removeClass("updating-message")
      .addClass("updated-message installed button-disabled")
      .attr(
        "aria-label",
        wp.updates.l10n.pluginInstalledLabel.replace("%s", response.pluginName)
      )
      .text(wp.updates.l10n.pluginInstalled);

    wp.a11y.speak(wp.updates.l10n.installedMsg, "polite");

    $document.trigger("wp-plugin-install-success", response);

    if (response.activateUrl) {
      // Transform the 'Install' button into an 'Activate' button.
      $message
        .removeClass("install-now installed button-disabled updated-message")
        .addClass("activate-now")
        .attr("href", response.activateUrl)
        .attr(
          "aria-label",
          wp.updates.l10n.activatePluginLabel.replace("%s", response.pluginName)
        )
        .text(wp.updates.l10n.activatePlugin);

      $message.click();
    }
  };

  var colibriInstallPlugin = function(event) {
    var $button = $(event.target);
    event.preventDefault();

    if (
      $button.hasClass("updating-message") ||
      $button.hasClass("button-disabled")
    ) {
      return;
    }

    if (
      wp.updates.shouldRequestFilesystemCredentials &&
      !wp.updates.ajaxLocked
    ) {
      wp.updates.requestFilesystemCredentials(event);

      $document.on("credential-modal-cancel", function() {
        var $message = $(".install-now.updating-message");

        $message
          .removeClass("updating-message")
          .text(wp.updates.l10n.installNow);

        wp.a11y.speak(wp.updates.l10n.updateCancel, "polite");
      });
    }

    wp.updates.installPlugin({
      slug: $button.data("slug"),
      success: colibriInstallPluginSuccess
    });
  };

  var colibriActivatePlugin = function(event) {
    var $button = $(event.target);

    event.preventDefault();

    $button
      .addClass("updating-message")
      .removeClass("active-plugin")
      .text(getStartedData.activating);

    jQuery
      .get(this.href)
      .done(function(data) {
        $button.text(getStartedData.plugin_installed_and_active);
        wp.a11y.speak(getStartedData.plugin_installed_and_active, "polite");
      })
      .fail(function(error) {
        $button.text(getStartedData.activate);
      })
      .always(function() {
        $button.removeClass("updating-message").addClass("active-plugin");
      });
  };

  // $document.on("click", ".install-now", colibriInstallPlugin);
  // $document.on("click", ".activate-now", colibriActivatePlugin);
  $(document).ready(function() {
    if (getStartedData?.install_recommended) {
      $(
        ".plugin-card-" + getStartedData.install_recommended + " a.button"
      ).trigger("click");
    }
  });

  window.vanguard_admin.showOverlay = showOverlay;
})(jQuery);








