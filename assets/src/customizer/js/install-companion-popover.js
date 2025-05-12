let api = wp.customize,
    pluginControlConstructor = api.controlConstructor["colibri-plugin-message"],
    pluginControl = null,
    popover = null;


let updatePopoverPosition = () => {
    let linkedTo = popover.data('linkedTo');
    let rect = linkedTo.getBoundingClientRect();
    let style = {
        top: (rect.top + linkedTo.offsetHeight / 2 - popover.height() / 2) + "px",
        left: (rect.left + linkedTo.offsetWidth + 10) + "px",
    };

    popover.css(style);
};

let showPopover = (linkedTo) => {
    if (!popover) {
        popover = jQuery("<div class='colibri-install-plugin-popover' ><ul></ul></div>");
        jQuery('body').append(popover);
    }

    if (!pluginControl) {
        pluginControl = new pluginControlConstructor('colibri-install-plugin-popover-control', {});
        pluginControl.renderContent();
        pluginControl.activate();
        pluginControl.ready();
        popover.find('ul').append(pluginControl.container);
    }

    popover.data('linkedTo', linkedTo);
    updatePopoverPosition();
    popover.fadeIn(100);

    $(window).on('resize.colibri-popover', updatePopoverPosition);
    $('body .wp-full-overlay-sidebar-content').on('scroll.colibri-popover', updatePopoverPosition);

    $(document).on('click', '*', (event) => {
        let target = event.currentTarget;

        if (!$.contains(popover[0], target)) {
            popover.fadeOut();
            $(window).off('resize.colibri-popover');
            $('body .wp-full-overlay-sidebar-content').off('scroll.colibri-popover');
        }

    });
};

api.bind('colibri_panel_button_clicked', function (name, event) {
    if (name === "colibriwp_add_section" || name === "colibriwp_footers_panel") {
        showPopover(event.currentTarget);
    }
});








