import "./undescore-extensions";
import "./preview/css-preview";
import "./preview/js-preview";
import "./preview/selective-refresh";
import "./preview/specific-bindings";
import "./preview/kubio-onboarding";
import domReady from "domready";

class ColibriCustomizerPreviewer {
  static bindSetting(setting, callback) {
    window.wp.customize(setting, function(setting) {
      setting.bind(callback);
    });
  }
}

domReady(function() {
  wp.customize.bind("preview-ready", function() {
    wp.customize.preview.send("colibri-ready", _wpCustomizeSettings);

    wp.customize?.preview?.body
      .find(".wp-block-kubio-query-loop__inner")
      .data()
      ?.masonry?.layout();
  });

  wp.customize("blog_show_post_thumb_placeholder", function(setting) {
    setting.bind(function() {
      setTimeout(() => {
        wp.customize?.preview?.body
          .find(".wp-block-kubio-query-loop__inner")
          .data()
          ?.masonry?.layout();
      }, 100);
    });
  });
});

window.ColibriCustomizerPreviewer = ColibriCustomizerPreviewer;








