let api = wp.customize,
    sectionConstructor = api.sectionConstructor,
    outerSection = sectionConstructor.outer;
$ = jQuery;

sectionConstructor['colibri_floating_section'] = outerSection.extend({

    initialize(id, options) {
        options = options || {};
        this.onReadyCallback = options.ready;

        outerSection.prototype.initialize.apply(this, [id, options]);
    },

    ready() {
        this.container.children('.section-meta').addClass('hidden');

        if (_.isFunction(this.onReadyCallback)) {
            this.onReadyCallback.call(this);
        }
    },

    toggle() {
        this.expanded(!this.expanded())
    },

    show() {
        this.expanded(true)
    },


    hide() {
        this.expanded(false)
    }
});







