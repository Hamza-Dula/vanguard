(function($, Colibri) {
  const className = "dropdown-menu";

  const Component = function() {
    this.namespace = className;
    this.defaults = {
      menuSelector: ".kubio-menu",
      $menu: null,
    };

    // Parent Constructor
    Colibri.apply(this, arguments);
    // Initialization
    this.start();
  };

  Component.prototype = {
    start() {
      const $menu = this.$element.find(this.opts.menuSelector).first();
      this.opts.$menu = $menu;
      const firstPageLoadItem = $menu
        .find("> ul > li.current-menu-item")
        .get(0);

      this.stop();
      this.addListener();
      this.addFocusListener();
      this.addReverseMenuLogic();

      /** TODO @catalin table menu logic needs work because it does not work*/
      this.addTabletMenuLogic();

      this.addMenuScrollSpy($menu, firstPageLoadItem);
    },

    toggleFocus(item, enable = true) {
      while (this.opts.$menu[0] !== item) {
        if ("li" === item.tagName.toLowerCase()) {
          if (!enable) {
            $(item)
              .closest("li.menu-item-has-children")
              .children("a")
              .removeClass("hover");
            item.classList.remove("hover");
            $(item)
              .children("a")
              .removeClass("hover");
          } else {
            $(item)
              .closest("li.menu-item-has-children")
              .children("a")
              .addClass("hover");
            item.classList.add("hover");
            $(item)
              .children("a")
              .addClass("hover");
          }
        }
        item = item.parentElement;
      }
    },

    addFocusListener() {
      const lis = this.opts.$menu.find("li");
      lis.on("mouseover", (event) => {
        this.toggleFocus(event.currentTarget);
      });

      lis.on("mouseout", (event) => {
        this.toggleFocus(event.currentTarget, false);
      });

      const links = this.opts.$menu.find("li > a");
      /// keyboard focus / blur
      links.on("focus", (event) => {
        this.toggleFocus(event.currentTarget);
      });

      links.on("blur", (event) => {
        this.toggleFocus(event.currentTarget, false);
      });
    },
    stop() {
      this.removeListeners();
    },
    copyLiEventTaA(e) {
      let tagName = "";
      if (e.target && e.target.tagName) {
        tagName = e.target.tagName;
      }
      if (tagName.toLowerCase() === "a") {
        return;
      }
      const a = $(e.currentTarget).find("> a");
      a[0].click();
    },
    addListener() {
      this.opts.$menu.find("li").on("click", this.copyLiEventTaA);
    },

    removeListeners() {
      const $menu = this.opts.$menu;
      $menu.off("mouseover.navigation");
      $menu.find("li").off("click", this.copyLiEventTaA);
      this.removeTabletLogic();
    },
    removeTabletLogic() {
      const $menu = this.opts.$menu;
      $menu.off("tap.navigation");
    },
    addReverseMenuLogic() {
      const $menu = this.opts.$menu;
      const self = this;
      $menu.on("mouseover.navigation", "li", function() {
        $menu.find("li.hover").removeClass("hover");
        self.setOpenReverseClass($menu, $(this));
      });
    },
    setOpenReverseClass($menu, $item) {
      // level 0 - not in dropdown
      if (this.getItemLevel($menu, $item) > 0) {
        const $submenu = $item.children("ul");
        const subItemDoesNotFit =
          $submenu.length &&
          $item.offset().left + $item.width() + 300 > window.innerWidth;
        const parentsAreReversed =
          $submenu.length && $item.closest(".open-reverse").length;

        if (subItemDoesNotFit || parentsAreReversed) {
          $submenu.addClass("open-reverse");
        } else if ($submenu.length) {
          $submenu.removeClass("open-reverse");
        }
      }
    },
    getItemLevel($menu, $item) {
      const menuSelector = this.opts.menuSelector;
      const temp2 = $item.parentsUntil(menuSelector);
      const temp = temp2.filter("li");
      return temp.length;
    },
    addTabletMenuLogic() {
      const self = this;
      const $menu = this.opts.$menu;
      if (!this.opts.clickOnLink) {
        this.opts.clickOnLink = this.clickOnLink.bind(this);
      }
      if (!this.opts.clickOnArrow) {
        this.opts.clickOnArrow = this.clickOnArrow.bind(this);
      }

      $menu.off("tap.navigation", this.opts.clickOnArrow);
      $menu.on(
        "tap.navigation",
        "li.menu-item > a svg",
        this.opts.clickOnArrow
      );

      $menu.off("tap.navigation", this.opts.clickOnLink);
      $menu.on("tap.navigation", "li.menu-item > a", this.opts.clickOnLink);
    },
    clickOnLink(event, arrowWasClicked = false) {
      const self = this;
      const $this = $(event.target);
      const $item = $this.closest("li");
      const $link = $this.closest("a");
      const $menu = this.opts.$menu;
      const $submenu = $item.children("ul");

      if ($submenu.length) {
        if (self.isSelectedItem($item)) {
          const href = $link.attr("href");

          // do nothing if nothing
          if (href.indexOf("#") === 0) {
            const anchor = href.replace("#", "").trim();

            if (!anchor || !$("#" + anchor).length) {
              return;
            }
          }
          event.stopPropagation();
          if (arrowWasClicked) {
            event.preventDefault();
          }
          self.deselectItems($menu, $item);
        } else {
          event.stopPropagation();
          event.preventDefault();
          self.selectItem($menu, $item);
        }
      } else {
        event.stopPropagation();
        if (
          arrowWasClicked ||
          (!arrowWasClicked && self.isSelectedItem($item))
        ) {
          event.preventDefault();
        }
        self.deselectItems($menu, $item);
      }
    },
    clickOnArrow(event) {
      this.clickOnLink(event, true);
    },
    selectItem($menu, $item) {
      this.deselectItems($menu, $item);
      $item.attr("data-selected-item", true);
      this.clearMenuHovers($menu, $item);
      $item.addClass("hover");
      this.setOpenReverseClass($menu, $item);
      const self = this;
      $("body").on("tap.navigation-clear-selection", "*", function() {
        const $this = jQuery(this);
        self.clearSelectionWhenTapOutside($this, $menu);
      });

      $(window).on("scroll.navigation-clear-selection", function() {
        const $this = jQuery(this);
        self.clearSelectionWhenTapOutside($this, $menu);
      });
    },
    deselectItems($menu, $item) {
      $item.removeClass("hover");
      $menu.find("[data-selected-item]").each(function() {
        const $itemTmp = $(this);
        $itemTmp.removeAttr("data-selected-item");
        const $submenu = $menu.children("ul");

        //TODO @catalin, check if this mobile menu code is needed
        if ($menu.is(".mobile-menu")) {
          $submenu.slideDown();
        }
      });
    },
    isSelectedItem($item) {
      return $item.is("[data-selected-item]");
    },
    clearMenuHovers($menu, except) {
      const self = this;
      $menu.find("li.hover").each(function() {
        if (except && self.containsSelectedItem($(this))) {
          return;
        }
        $(this).removeClass("hover");
      });
    },
    containsSelectedItem($item) {
      return (
        $item.find("[data-selected-item]").length > 0 ||
        $item.is("[data-selected-item]")
      );
    },
    clearSelectionWhenTapOutside($this, $menu) {
      $("body").off("tap.navigation-clear-selection");
      $(window).off("scroll.navigation-clear-selection");
      if ($this.is($menu) || $.contains($menu[0], this)) {
        return;
      }
      this.clearMenuHovers($menu);
    },
    addMenuScrollSpy(startFrom, firstPageLoadItem) {
      const $menu = startFrom;

      if ($.fn.kubioScrollSpy) {
        $menu.find("a").kubioScrollSpy({
          onChange() {
            $menu
              .find(".current-menu-item, .current_page_item")
              .removeClass("current-menu-item current_page_item");
            $(this)
              .closest("li")
              .addClass("current-menu-item current_page_item");
          },
          onLeave() {
            const $fixed = $menu.closest(".h-navigation_sticky");
            $(this)
              .closest("li")
              .removeClass("current-menu-item current_page_item hover");
            if (
              !$menu.find(".current-menu-item, .current_page_item").length &&
              firstPageLoadItem
            ) {
              if (!$fixed) {
                $menu
                  .find(".current-menu-item, .current_page_item")
                  .removeClass("current-menu-item current_page_item");
              }
              $(firstPageLoadItem).addClass(
                "current-menu-item current_page_item"
              );
            }
          },
          smoothScrollAnchor: true,
          offset() {
            //offset is needed only for sticky menu
            const $fixed = $menu.closest(".h-navigation_sticky");
            if ($fixed.length) {
              return $fixed[0].getBoundingClientRect().height;
            }

            return 0;
          },
        });
      }

      $(window).trigger("smoothscroll.update");
    },
  };

  Component.inherits(Colibri);
  Colibri[className] = Component;

  Colibri.Plugin.create(className);
  Colibri.Plugin.autoload(className);
  // eslint-disable-next-line no-undef
})(jQuery, Colibri);








