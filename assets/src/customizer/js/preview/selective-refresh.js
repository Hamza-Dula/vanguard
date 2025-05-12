let $ = jQuery,
    selectiveRefresh = wp.customize.selectiveRefresh,
    partialIsRelatedSetting = selectiveRefresh.Partial.prototype.isRelatedSetting,
    partialRefresh = selectiveRefresh.Partial.prototype.refresh,
    renderContent = selectiveRefresh.Partial.prototype.renderContent,
    partialReady = selectiveRefresh.Partial.prototype.ready,
    innerRefreshes = [],
    innerPartialsListGenerated = false,
    renderInnerPlacementDelay = 200;


function isSelectiveRefreshSetting(id) {
    return (colibri_ADDITIONAL_JS_DATA.selective_refresh_settings.indexOf(id) !== -1);
}

selectiveRefresh.Partial = selectiveRefresh.Partial.extend({
    isRelatedSetting(setting/*... newValue, oldValue */) {
        let isRelatedSetting = partialIsRelatedSetting.apply(this, arguments),
            isInnerPartial = false;

        if (isRelatedSetting) {
            selectiveRefresh.partial.each((partial) => {
                if (innerRefreshes.indexOf(partial.id) === -1) {
                    if (this.containsPartial(partial)) {
                        innerRefreshes.push(partial.id);
                    }
                }
            });
        } else {
            isInnerPartial = (innerRefreshes.indexOf(this.id) !== -1);

            if (isInnerPartial) {
                this.renderedAsInnerPartial = true;
            } else {
                this.renderedAsInnerPartial = false;
            }
        }

        return (isInnerPartial || isRelatedSetting);
    },

    refresh() {
        let refreshPromise = partialRefresh.apply(this, arguments);
        refreshPromise.always(function () {
            innerRefreshes = [];
            innerPartialsListGenerated = false;
        });

        return refreshPromise;
    },

    ready() {

        _.each(this.placements(), (placement) => {
            this.addColibriOverlay(placement);
        });

        partialReady.apply(this, arguments);
    },

    addColibriOverlay(placement) {
        return;
        if (placement.container.children('span.customize-colibri-overlay').length === 0) {
            placement.container.append('<span class="customize-colibri-overlay"></span>');
        }
    },

    renderContent(placement) {

        this.addColibriOverlay(placement);

        if (this.renderedAsInnerPartial) {
            setTimeout(() => {
                let currentPlacement = this.placements()[0];
                currentPlacement.addedContent = placement.addedContent;
                renderContent.call(this, currentPlacement);
            }, renderInnerPlacementDelay)


        } else {
            renderContent.apply(this, arguments);
        }
    },

    containsPartial(toCheck) {
        let parentPlacements = this.placements();
        let childPlacements = toCheck.placements();

        for (let i = 0; i < parentPlacements.length; i++) {

            let parentPlacement = parentPlacements[i].container;

            if (parentPlacement) {

                for (let j = 0; j < childPlacements.length; j++) {

                    let childPlacement = childPlacements[j].container;

                    if (childPlacement && !parentPlacement.is(childPlacement) && $.contains(parentPlacement[0], childPlacement[0])) {
                        return true;
                    }
                }
            }
        }

        return false;
    }
});







