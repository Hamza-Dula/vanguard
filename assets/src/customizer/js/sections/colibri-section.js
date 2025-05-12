let api = wp.customize,
    sectionConstructor = api.sectionConstructor,
    containerParent = 'colibri-main-section-content',
    containerPaneParent = 'colibri-main-section-pane-parent',
    $ = jQuery;


$('form#customize-controls').append(`
<div id="colibri-customizer-main-section-content" >
    <div id="${containerParent}" class="wp-full-overlay-header"></div>
</div>
`);

sectionConstructor['colibri_section'] = api.Section.extend({
    initialize() {
        this.containerParent = `#${containerParent}`;
        this.containerPaneParent = `.${containerPaneParent}`;
        this.$containerParent = $(this.containerParent);
        api.Section.prototype.initialize.apply(this, arguments);

        api.bind('colibri_sections_collapse', () => {
            this._toggleExpanded(false, {});
        });

        if (this.params.hidden) {
            this.container.filter('li').addClass('colibri-section-hidden');
        }
    },

    active() {

        api.Section.prototype.active.apply(this, arguments);

        let tab = this.currentTab || colibriCustomizer.settings.section_default_tab;
        setTimeout(function () {
            this.activateTabControls(tab);
        }, 50);

    },

    colibri_openSectionCallback: function (args) {
        let content = this.contentContainer,
            sectionTitle = this.headContainer.find('.accordion-section-title').first(),
            backBtn = content.find('.customize-section-back');

        return $.proxy(() => {

            this._animateChangeExpanded(function () {

                sectionTitle.attr('tabindex', '-1');
                backBtn.attr('tabindex', '0');

                backBtn.focus();
                content.css('top', '');
                container.scrollTop(0);

                if (args.completeCallback) {
                    args.completeCallback();
                }
            });

            content.addClass('open');
            this.$containerParent.addClass('open');

        }, this);
    },

    colibri_animateChangeExpanded(args) {
        let content = this.contentContainer,
            sectionTitle = this.headContainer.find('.accordion-section-title').first(),
            backBtn = content.find('.customize-section-back');

        this._animateChangeExpanded(() => {
            backBtn.attr('tabindex', '-1');
            sectionTitle.attr('tabindex', '0');

            sectionTitle.focus();

            if (args.completeCallback) {
                args.completeCallback();
            }

        }, this);


        this.$containerParent.removeClass('open');
        setTimeout(() => {
            this.container.removeClass('open');
        }, 200)
    },


    onChangeExpanded(expanded, args) {
        let content = this.contentContainer,
            expand, panel,
            $root = jQuery('.wp-full-overlay');

        if (expanded) {
            $root.addClass('section-open');
            jQuery('ul.customize-pane-parent').addClass('busy');
            jQuery('#customize-info').addClass('busy');
            this.$containerParent.addClass('open');
            this.container.addClass('open');
            let currentTab = colibriCustomizer.settings.section_default_tab;
            let currentTabHasControls = false;
            //check if default tab has controls, if not select the style tab
            this.controls().forEach((control) => {
                //ignore plugin message control
                if ((control.params.colibri_tab === currentTab)
                    && (control.params.type !== 'colibri-plugin-message')) {
                    currentTabHasControls = true;

                }
            });

            if (!currentTabHasControls) currentTab = colibriCustomizer.settings.style_tab;
            this.activateTabControls(currentTab);
        } else {
            $root.removeClass('section-open');
            this.$containerParent.removeClass('open');
            setTimeout(() => {
                this.container.removeClass('open');
            }, 200)
        }

        this.container.removeClass('busy');

        api.section.each((section) => {
            if (section.params.type === 'colibri_section' && section.id !== this.id) {
                section.container.removeClass('open');
            }
        });


        if (expanded && !content.hasClass('open')) {
            if (args.unchanged) {
                expand = args.completeCallback;
            } else {
                expand = this.colibri_openSectionCallback(args);
            }

            if (this.panel()) {
                api.panel(this.panel()).expand({
                    duration: args.duration,
                    completeCallback: expand
                });
            } else {
                expand();
            }
        } else {
            if (!expanded && content.hasClass('open')) {

                if (this.panel()) {
                    panel = api.panel(this.panel());
                    if (panel.contentContainer.hasClass('skip-transition')) {
                        this._toggleExpanded(false);
                    }
                }

                this.colibri_animateChangeExpanded(args);

            } else {

                if (!args.allowMultiple) {
                    api.section.each((otherSection) => {
                        if (otherSection !== this) {
                            otherSection.collapse({duration: args.duration});
                        }
                    });
                }

                if (args.completeCallback) {
                    args.completeCallback();
                }
            }
        }
    },

    ready() {
        let $tabs = this.container.find('.tabs-nav .tab-item');
        $tabs.on('click', (event) => {
            this.activateTabControls(jQuery(event.currentTarget).attr('data-tab-name'));
        });
    },


    attachEvents: function () {
        var meta, content, section = this;

        if (section.container.hasClass('cannot-expand')) {
            return;
        }

        // Expand/Collapse accordion sections on click.
        section.container.find('.accordion-section-title, .customize-section-back').on('click keydown', function (event) {
            if (api.utils.isKeydownButNotEnterEvent(event)) {
                return;
            }
            event.preventDefault(); // Keep this AFTER the key filter above

            if (section.expanded()) {
                section._toggleExpanded(false);
            } else {
                section.expand();
            }
        });

        // This is very similar to what is found for api.Panel.attachEvents().
        section.container.find('.customize-section-title .customize-help-toggle').on('click', function () {

            meta = section.container.find('.section-meta');
            if (meta.hasClass('cannot-expand')) {
                return;
            }
            content = meta.find('.customize-section-description:first');
            content.toggleClass('open');
            content.slideToggle(section.defaultExpandedArguments.duration, function () {
                content.trigger('toggled');
            });
            $(this).attr('aria-expanded', function (i, attr) {
                return 'true' === attr ? 'false' : 'true';
            });
        });
    },

    activateTabControls(tab, callback) {

        let $tab = this.container.find(`.tabs-nav .tab-item[data-tab-name="${tab}"]`);
        $tab.siblings().removeClass('active');
        $tab.addClass('active');

        this.currentTab = tab;

        this.controls().forEach((control) => {


            let controlInOtherTab = (control.params.colibri_tab !== tab);
            control.container.toggleClass('control-in-other-tab', controlInOtherTab);

            if (control.params.type === 'colibri-plugin-message') {
                control.container.attr('style', '');
                return;
            }

            if (!controlInOtherTab) {
                if (control.active()) {
                    if (control.container.css('display') === 'none') {
                        control.container.css('display', 'list-item');
                        control.onChangeActive(true, {unchanged: false});
                    }
                } else {
                    if (control.container.css('display') !== 'none') {
                        control.container.css('display', 'none');
                        control.onChangeActive(false, {unchanged: false});
                    }
                }
            }

        });

        if (_.isFunction(callback)) {
            callback.call(this);
        }

    },

    collapse: function (params) {
        // return this._toggleExpanded( false, params );
    },

});








