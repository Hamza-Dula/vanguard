let api = wp.customize,
    panelConstructor = api.panelConstructor;

panelConstructor['colibri_panel'] = api.Panel.extend({

    getContent() {
        let $container = this.container.find('.control-panel-content').first();
        this.maybeAddPanelFooter();
        return $container;
    },

    maybeAddPanelFooter() {
        this.colibriReflowFooterButtons(true);

        if (!this.reflow_binded) {
            this.reflow_binded = true;
            api.bind('pane-contents-reflowed', () => {
                this.colibriReflowFooterButtons();
            });
        }
    },

    colibriReflowFooterButtons(create = false) {

        let $wrapper = this.container.find('.control-panel-content').first().parent();
        let $footer = $wrapper.children('.panel-footer');
        let buttons = this.params.footer_buttons;

        if (create) {
            if ($footer.length !== 0) {
                $footer.remove();
            }

            $wrapper.append('<div class="panel-footer"></div>');

            $footer = $wrapper.children('.panel-footer');

            $footer.on('click', 'button', (event) => {
                event.preventDefault();
                event.stopPropagation();
                let name = jQuery(event.currentTarget).attr('data-name');
                api.trigger('colibri_panel_button_clicked', name, event);
            });


            for (let key in buttons) {
                if (buttons.hasOwnProperty(key)) {
                    let button = buttons[key];
                    let classes = (button.classes || ['button-primary']).join(' ');
                    let icon = button.icon || "";

                    if (icon) {
                        icon = `<span class="dashicons ${icon}"></span>`
                    }

                    let buttonHtml = `<button data-name="${button.name}" class="button ${classes} hidden ">${icon}<span>${button.label}</span></button>`;
                    let $button = jQuery(buttonHtml);
                    $footer.append($button);
                }
            }

            api.bind('colibri_preview_ready', () => {
                this.colibriReflowFooterButtons();
            })
        }

        for (let key in buttons) {
            if (buttons.hasOwnProperty(key)) {
                let button = buttons[key];
                let $button = $footer.find(`[data-name="${button.name}"]`);
                if (!button.activate_when) {
                    $button.removeClass('hidden');
                } else {
                    if (this.checkButtonActiveWhen(button.activate_when)) {
                        $button.removeClass('hidden');
                    } else {
                        $button.addClass('hidden');
                    }
                }
            }
        }


    },

    checkButtonActiveWhen(activate_when) {
        if (activate_when.selector) {
            let previewDocument = api.previewer.preview ? api.previewer.preview.iframe[0].contentDocument : false;

            if (!previewDocument) {
                return false;
            }

            if (jQuery(previewDocument).find(activate_when.selector).length) {
                return true;
            }
            return false
        }
    },

    attachEvents() {

    }
});







