(function($, Colibri) {
  const className = "offcanvas";

  const Component = function(element, options) {
    this.namespace = "offcanvas";
    this.defaults = {
      target: null, // selector
      push: true, // boolean
      width: "250px", // string
      direction: "left", // string: left or right
      toggleEvent: "click",
      clickOutside: true, // boolean
      animationOpen: "slideInLeft",
      animationClose: "slideOutLeft",
      callbacks: ["open", "opened", "close", "closed"],
      offcanvasOverlayId: null,
      $overlayElement: null,
      targetId: null
    };

    // Parent Constructor
    Colibri.apply(this, arguments);

    // Services
    this.utils = new Colibri.Utils();
    this.detect = new Colibri.Detect();

    // Initialization
    this.start();
  };

  // Functionality
  Component.prototype = {
    start() {
      if (!this.hasTarget()) {
        return;
      }
      const overlayId = this.opts.offcanvasOverlayId;
      this.opts.$overlayElement = $("#" + overlayId);

      // this.stop();

      this.buildTargetWidth();
      this.buildAnimationDirection();

      this.$close = this.getCloseLink();
      this.$element.on(
        this.opts.toggleEvent + "." + this.namespace,
        $.proxy(this.toggle, this)
      );
      this.$target.addClass("offcanvas");
      this.$target.trigger("kubio.offcanvas.ready");

      this.moveOffcanvas();

      this.addOffcanvasOverlayLogic();
    },
    stop() {
      this.closeAll();
      this.removeOffcanvasElements();
      this.$element.off("." + this.namespace);
      if (this.$close) {
        this.$close.off("." + this.namespace);
      }
      $(document).off("." + this.namespace);
    },
    removeOffcanvasElements() {
      // var targetId = this.opts.targetId;
      // var $targetElement = $('#' + targetId + '.h-offcanvas-panel');

      this.$target.remove();
      this.opts.$overlayElement.remove();

      // if ($targetElement && $targetElement.length > 0) {
      //   for (var i = 0; i < $targetElement.length; i++) {
      //     var offcanvasPanel = $targetElement[i];
      //     var offcanvasPanelParent = offcanvasPanel.parentNode;
      //     if (offcanvasPanelParent && offcanvasPanelParent.tagName === 'BODY') {
      //       offcanvasPanelParent.removeChild(offcanvasPanel);
      //     }
      //   }
      // }
      //
      // var overlayElements = this.opts.$overlayElement;
      // if (overlayElements && overlayElements.length > 0) {
      //   for (var j = 0; j < overlayElements.length; j++) {
      //     var overlayElement = overlayElements[j];
      //     var overlayElementParent = overlayElement.parentNode;
      //     if (overlayElementParent && overlayElementParent.tagName === 'BODY') {
      //       overlayElementParent.removeChild(overlayElement);
      //     }
      //   }
      // }
    },
    moveOffcanvas() {
      const offcanvasPanel = this.$target[0];
      document.querySelector("html > body").appendChild(offcanvasPanel);

      const overlayElement = this.opts.$overlayElement[0];
      document.querySelector("html > body").appendChild(overlayElement);
    },
    addOffcanvasOverlayLogic() {
      const $overlayElement = this.opts.$overlayElement;
      const $offCanvasWrapper = this.$target;

      if ($offCanvasWrapper.length) {
        $overlayElement.on("scroll touchmove mousewheel", function(e) {
          e.preventDefault();
          e.stopPropagation();
          return false;
        });

        $offCanvasWrapper.on("kubio.offcanvas.open", function() {
          $overlayElement.addClass("h-offcanvas-opened");
        });

        $offCanvasWrapper.on("kubio.offcanvas.close", function() {
          $overlayElement.removeClass("h-offcanvas-opened");
        });
      }
    },
    toggle(e) {
      if (this.isOpened()) {
        this.close(e);
      } else {
        this.open(e);
      }
    },
    buildTargetWidth() {
      this.opts.width =
        $(window).width() < parseInt(this.opts.width)
          ? "100%"
          : this.opts.width;
    },
    buildAnimationDirection() {
      if (this.opts.direction === "right") {
        this.opts.animationOpen = "slideInRight";
        this.opts.animationClose = "slideOutRight";
      }
    },
    getCloseLink() {
      return this.$target.find(".close");
    },
    open(e) {
      if (e) {
        e.preventDefault();
      }

      if (!this.isOpened()) {
        this.closeAll();
        this.callback("open");

        this.$target.addClass("offcanvas-" + this.opts.direction);
        this.$target.css(
          "width",
          Math.min(parseInt(this.opts.width), window.innerWidth - 100)
        );
        this.$target.css(
          "right",
          "-" + Math.min(parseInt(this.opts.width), window.innerWidth - 100)
        );

        //this.pushBody();

        this.$target.trigger("kubio.offcanvas.open");
        // this.$target.animation(this.opts.animationOpen, $.proxy(this.onOpened, this));
        Colibri.animate(
          this.$target,
          this.opts.animationOpen,
          $.proxy(this.onOpened, this)
        );
        this.$element.trigger("kubio.offcanvas.open");
      }
    },
    closeAll() {
      const $elms = $(document).find(".offcanvas");
      if ($elms.length !== 0) {
        $elms.each(function() {
          const $el = $(this);

          if ($el.hasClass("open")) {
            $el.css("width", "");
            Colibri.animate($el, "hide");
            $el.removeClass("open offcanvas-left offcanvas-right");
          }
        });

        $(document).off("." + this.namespace);
        $("body").css("left", "");
      }
    },
    close(e) {
      if (e) {
        const $el = $(e.target);
        const isTag =
          $el[0].tagName === "A" ||
          $el[0].tagName === "INPUT" ||
          $el[0].tagName === "BUTTON" ||
          $el.parents("button, a").length;

        if (
          isTag &&
          $el.closest(".offcanvas").length !== 0 &&
          !$el.hasClass("close") &&
          window.location.href !== e.target.href
        ) {
          return;
        }

        e.preventDefault();
      }

      if (this.isOpened()) {
        // this.utils.enableBodyScroll();
        this.callback("close");
        //this.pullBody();
        this.$target.trigger("kubio.offcanvas.close");
        // this.$target.animation(this.opts.animationClose, $.proxy(this.onClosed, this));
        Colibri.animate(
          this.$target,
          this.opts.animationClose,
          $.proxy(this.onClosed, this)
        );
      }
    },
    isOpened() {
      return this.$target.hasClass("open");
    },
    onOpened() {
      this.$target
        .find("a")
        .eq(0)
        .focus();
      this.$target.removeClass("hide");

      if (this.opts.clickOutside) {
        $(document).on(
          "click." + this.namespace + " tap." + this.namespace,
          $.proxy(this.close, this)
        );
      }
      if (!this.detect.isDesktopScreen()) {
        $("html").addClass("no-scroll");
      }

      $(document).on(
        "keyup." + this.namespace,
        $.proxy(this.handleKeyboard, this)
      );

      $(document).on(
        "keydown." + this.namespace,
        $.proxy(this.handleKeyDown, this)
      );
      this.$close.on("click." + this.namespace, $.proxy(this.close, this));

      // this.utils.disableBodyScroll();
      this.$target.addClass("open");
      this.callback("opened");
    },
    onClosed() {
      $("html").removeClass("no-scroll");

      this.$target
        .css("width", "")
        .removeClass("offcanvas-" + this.opts.direction);

      this.$close.off("." + this.namespace);
      $(document).off("." + this.namespace);

      this.$target.removeClass("open");
      this.callback("closed");

      this.$target.trigger("kubio.offcanvas.closed");
    },
    handleKeyboard(e) {
      if (e.which === 27) {
        // eslint-disable-next-line @wordpress/no-global-active-element
        if (document.activeElement) {
          if (
            // eslint-disable-next-line @wordpress/no-global-active-element
            $(document.activeElement).closest(".offcanvas").length
          ) {
            this.$element.focus();
          }
        }
        this.close();
      }
    },

    handleKeyDown(e) {
      if (e.which === 9) {
        const $links = this.$target.find("a:visible");
        const isShift = e.shiftKey;

        if ($links.last().is(e.target) && !isShift) {
          $links.first().focus();
          e.preventDefault();
          e.stopPropagation();
          return;
        }

        if ($links.first().is(e.target) && isShift) {
          $links.last().focus();
          e.preventDefault();
          e.stopPropagation();
        }
      }
    }

    /*		pullBody() {
			if (this.opts.push) {
				$('body').animate({ left: 0 }, 350, function () {
					$(this).removeClass('offcanvas-push-body');
				});
			}
		},*/
    /*		pushBody() {
			if (this.opts.push) {
				const properties =
					this.opts.direction === 'left'
						? { left: this.opts.width }
						: { left: '-' + this.opts.width };
				$('body')
					.addClass('offcanvas-push-body')
					.animate(properties, 200);
			}
		},*/
  };

  Component.inherits(Colibri);
  Colibri[className] = Component;

  Colibri.Plugin.create(className);
  Colibri.Plugin.autoload(className);
  // eslint-disable-next-line no-undef
})(jQuery, Colibri);








