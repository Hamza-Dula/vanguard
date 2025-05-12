(function($) {
  var $win = $(window);

  function setHeroEditButtonTop() {
    var top = "0";
    var hero = $(".wp-block-kubio-hero");
    const nav = $("#navigation");
    var overlap = nav.hasClass("h-navigation_overlap");
    if (overlap) {
      top = parseInt(hero.css("padding-top")) + parseInt(nav.height()) + 30;
    }
    var button = hero.children(".customize-partial-edit-shortcut");
    button.attr("style", "top:" + top + "px !important");
  }

  $win.on("resize.overlap", setHeroEditButtonTop);

  $(function() {
    setTimeout(setHeroEditButtonTop, 500);
  });

  if (wp.customize && wp.customize.selectiveRefresh) {
    wp.customize.selectiveRefresh.bind("partial-content-rendered", function() {
      setTimeout(setHeroEditButtonTop, 100);
    });
  }

  window.colibriUpdateHeroPenPosition = setHeroEditButtonTop;

  //update columns width based on layout
  wp.customize("front-header.hero.props.heroSection.layout", function(value) {
    const MEDIA_LAYOUTS = ["textWithMediaOnRight", "textWithMediaOnLeft"];
    let prevLayout = parent.wp
      .customize("front-header.hero.props.heroSection.layout")
      .get();

    value.bind(function(newLayout) {
      let width = 80;
      const prevWidth = parent.wp
        .customize("front-header.hero.hero_column_width")
        .get();
      let controlWidth = parent.wp
        .customize("front-header.hero.hero_column_width")
        .findControls()[0];

      if (
        MEDIA_LAYOUTS.includes(prevLayout) &&
        MEDIA_LAYOUTS.includes(newLayout)
      ) {
        // Is switching between media layouts
        width = parseInt(prevWidth);
      } else if (prevLayout === "textOnly") {
        width = 50;
      }

      prevLayout = newLayout;

      controlWidth.setValue(width);
      controlWidth.rerender();
    });
  });
})(jQuery);








