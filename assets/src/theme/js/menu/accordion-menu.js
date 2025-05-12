(function($, Colibri) {
  const className = "accordion-menu";

  const Component = function(element, options) {
    this.namespace = className;
    this.defaults = {
      menuSelector: ".kubio-menu",
      offCanvasWrapper: ".kubio-menu-container",
      linkSelector: ".menu-item-has-children > a, .page_item_has_children > a",
      linkLeafsSelector:
        "li:not(.menu-item-has-children):not(.page_item_has_children) > a",
      arrowSelector: "svg",
      $menu: null,
    };

    // Parent Constructor
    Colibri.apply(this, arguments);

    // Initialization
    this.initBindedFunctions();
    this.initEventListenersData();

    this.start();
  };

  Component.prototype = {
    start() {
      const $menu = this.$element.find(this.opts.menuSelector).first();
      this.opts.$menu = $menu;
      const firstPageLoadItem = $menu
        .find("> ul > li.current-menu-item")
        .get(0);

      this.opts.$menu.find("a").data("allow-propagation", true);
      this.opts.$menu.find(this.opts.arrowSelector).attr("tabIndex", 0);
      this.removeEventListeners();
      this.addEventListeners();
      this.addMenuScrollSpy($menu, firstPageLoadItem);

      const openedParent = this.opts.$menu.find(".current-menu-parent").first();
      if (openedParent.length) {
        this.openDropDown(openedParent);
      }

      this.addFocusListener();
    },
    initBindedFunctions() {
      this.debounceApplyDropdownLogic = $.debounce(
        this.applyDropdownLogic.bind(this),
        10
      );
      this.bindedLinkEventHandler = this.linkEventHandler.bind(this);
      this.bindedLinkArrowEventHandler = this.linkArrowEventHandler.bind(this);
    },
    initEventListenersData() {
      const menuNamespace = ".accordion-menu";
      const events = ["click", "tap"];
      const eventBase = events.map((event) => `${event}${menuNamespace}`);

      const linkSelectorEvent = eventBase
        .map((item) => item + ".link-selector")
        .join(" ");

      const arrowSelectorEvent = eventBase
        .concat([`keyup${menuNamespace}`])
        .map((item) => item + " svg")
        .join(" ");

      const offCanvasEvent = eventBase
        .map((item) => item + ".off-canvas")
        .join(" ");

      this._eventOptions = {
        menuNamespace,
        linkSelectorEvent,
        arrowSelectorEvent,
        offCanvasEvent,
      };
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
      const links = this.opts.$menu.find("a");

      links.on("focus", (event) => {
        this.toggleFocus(event.currentTarget);
      });

      links.on("blur", (event) => {
        this.toggleFocus(event.currentTarget, false);
      });
    },

    addEventListeners() {
      const $menu = this.opts.$menu;
      const eventOptions = this._eventOptions;
      $menu.on(
        eventOptions.arrowSelectorEvent,
        this.opts.arrowSelector,
        this.bindedLinkArrowEventHandler
      );

      if (window.wp && window.wp.customize) {
        $menu.off(eventOptions.linkSelectorEvent, this.opts.linkSelector);
      }

      $menu.on(
        eventOptions.linkSelectorEvent,
        this.opts.linkSelector,
        this.bindedLinkEventHandler
      );
      $menu.on(
        eventOptions.offCanvasEvent,
        this.opts.linkLeafsSelector,
        this.closeOffcanvasPanel
      );

      $(document).on(
        "keyup." + this.namespace,
        $.proxy(this.handleKeyboard, this)
      );
    },
    removeEventListeners() {
      const $menu = this.opts.$menu;
      const eventOptions = this._eventOptions;
      $menu.off(eventOptions.menuNamespace);
      $(document).on("keyup." + this.namespace);
    },
    stop() {
      this.removeEventListeners();
      this.removeAllSvgArrows();
    },

    handleKeyboard(e) {
      let item = e.target;

      if (item.tagName.toLowerCase() === "svg") {
        item = item.parentNode;
      }

      if ($.contains(this.opts.$menu[0], item)) {
        if ($(item).siblings("ul").length) {
          if (e.which === 37) {
            this.closeDropDown($(item).closest("li"));
          }

          if (e.which === 39) {
            this.openDropDown($(item).closest("li"));
          }
        }
      }
    },

    openDropDown(item) {
      if (!item) {
        return;
      }

      if ($(item).is("a")) {
        item = $(item).closest("li");
      } else {
        item = $(item);
      }

      item.addClass("open");

      item.children("ul").slideDown(100);
    },

    closeDropDown(item) {
      if (!item) {
        return;
      }

      if ($(item).is("a")) {
        item = $(item).closest("li");
      } else {
        item = $(item);
      }

      item.removeClass("open");
      item.children("ul").slideUp(100);
    },

    isDropDownOpen($parent) {
      return $parent.is(".open");
    },
    closeOffcanvasPanel() {
      if (window.wp && window.wp.customize) {
      }

      /*
			//some mobile menus do not work without this timeout, because the panel gets hidden before the link logic happens
			//and some browser stop the link for security reasons because it got fired from hidden elements.
			setTimeout(() => {
				$('.offscreen-overlay').trigger('click');
			}, 500);
			*/
    },
    linkEventHandler(event, isForArrow) {
      const inCustomizer = window.wp && window.wp.customize;
      if (inCustomizer) {
        event.preventDefault();
      }

      const $this = $(event.target);
      const $li = $this.closest("li");

      const hasChildren = $li.find("ul").length !== 0;

      if (!hasChildren) {
        this.closeOffcanvasPanel();
        return;
      }

      if (!isForArrow && $li.hasClass("open") && !inCustomizer) {
        this.closeOffcanvasPanel();
        return;
      }

      //when the arrows are clicked the link should not redirect you, or when the item li is not opened. also stop
      //propagation to the link event handler
      if (isForArrow || (!isForArrow && !$li.hasClass("open"))) {
        event.preventDefault();
        // do not trigger bubbling events e.g for offcanvas
        event.stopPropagation();
      }
      // event.stopPropagation();

      /**
       * For mobile devices the event handler function is called two times one for the click event and the other time for
       * tap event. Because of this we had to split the logic in things that needs to be called for every call and things
       * that needs to be called once when the tap/click events are called at the same time. We use the debounce function
       * to apply the dropdown logic only once
       */
      this.debounceApplyDropdownLogic(event, isForArrow);
    },
    linkArrowEventHandler(event) {
      if (event.type === "keyup") {
        // is pressed enter
        if (event.which === 13) {
          this.linkEventHandler(event, true);
        }
      } else {
        this.linkEventHandler(event, true);
      }
    },
    applyDropdownLogic(event, isForArrow) {
      const $this = $(event.target);
      const $li = $this.closest("li");

      const hasChildren = $li.find("ul").length !== 0;

      if (!hasChildren) {
        this.closeOffcanvasPanel();
        return;
      }

      if (isForArrow && this.isDropDownOpen($li)) {
        this.closeDropDown($li);
      } else {
        this.openDropDown($li);
      }
    },

    removeAllSvgArrows() {
      if (this.opts.$menu) {
        this.opts.$menu.find(this.opts.arrowSelector).remove();
      }
    },

    addMenuScrollSpy(startFrom, firstPageLoadItem) {
      const $menu = startFrom;
      const offset = 20;
      const component = this;
      if ($.fn.kubioScrollSpy) {
        const linkSelector = component.opts.linkSelector;
        const arrowSelector = component.opts.arrowSelector;
        $menu
          .find("a")
          .not(linkSelector)
          .not(arrowSelector)
          .kubioScrollSpy({
            onChange() {
              $menu
                .find(".current-menu-item,.current_page_item")
                .removeClass("current-menu-item current_page_item");
              $(this)
                .closest("li")
                .addClass("current-menu-item current_page_item");
            },
            onLeave() {
              $(this)
                .closest("li")
                .removeClass("current-menu-item current_page_item");
              if (
                !$menu.find(".current-menu-item, .current_page_item").length &&
                firstPageLoadItem
              ) {
                $(firstPageLoadItem).addClass(
                  "current-menu-item current_page_item"
                );
              }
            },
            clickCallback() {
              component.closeOffcanvasPanel();
            },
            smoothScrollAnchor: true,
            offset() {
              const $fixed = $menu.closest(
                '[data-kubio-component="navigation"]'
              );
              if ($fixed.length) {
                return $fixed[0].getBoundingClientRect().height + offset;
              }

              return offset;
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








