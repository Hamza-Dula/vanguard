let $ = jQuery,
    domready = require('domready');

function toggleClass(item, newValue, oldValue) {
    let $el = $(item.selector);

    if (newValue) {
        $el.addClass(item.value);
    } else {
        $el.removeClass(item.value);
    }
}

function setClass(item, newValue, oldValue) {
    let $el = $(item.selector);
    let addClass = newValue;
    let removeClass = oldValue;

    if (item.value && item.value[newValue]) {
        addClass = item.value[newValue];
    }
    if (item.value && item.value[oldValue]) {
        removeClass = item.value[oldValue];
    }

    $el.removeClass(removeClass);
    $el.addClass(addClass);
}

function setCss(item, newValue, oldValue) {
    let $el = $(item.selector);
    let value = "";

    if (_.isObject(item.value)) {
        value = item.value[newValue];
    } else {
        value = newValue;
    }

    let callback;
    if (item.callback) {
        callback = new Function("return " + item.callback)();
        value = callback(value, oldValue);
    }

    $el.css(item.property, value);
}

function focus(item, newValue, oldValue) {
    //let entity = newValue['entity'];
    let entity_type = item.value['entity'];
    let entity_id = item.value['entity_id'];
    let fallback_entity_type;
    let fallback_entity_id;

    if (item.value['fallback']) {
        fallback_entity_type = item.value['fallback']['entity'];
        fallback_entity_id = item.value['fallback']['entity_id'];
    }

    let entity = top.wp.customize[entity_type](entity_id);
    if (!entity && fallback_entity_type) {
        entity = top.wp.customize[fallback_entity_type](fallback_entity_id);
    }

    entity.collapse();
    top.wp.customize.trigger('colibri_sections_collapse');
    entity.focus();
    //api.preview.send( 'focus-control-for-setting', entity_id );
}

function colibriComponentToggle(item, newValue, oldValue) {

    let el = $(item.selector);
    let component = el.data()['fn.kubio.' + item.value];
    if (component) {
        setTimeout(function () {
            if (newValue) {
                component.start();
            } else {
                component.stop();
            }
        }, item.delay || 0);
    } else {
        console.log(item.selector, 'has no kubio component')
    }
}

function colibriComponentRestart(item, newValue, oldValue) {

    let el = $(item.selector);
    let component = el.data()['fn.kubio.' + item.value];
    if (component) {
        setTimeout(function () {
            if (component.hasOwnProperty('restart')) {
                component.restart();
            } else {
                component.stop();
                component.start();
            }
        }, item.delay || 0);
    } else {
        console.log(item.selector, 'has no kubio component')
    }
}

function colibriNavigationToggleSticky(item, newValue, oldValue) {

    let el = $(item.selector);
    let component = el.data()['fn.kubio.navigation'];
    if (component.opts?.sticky != false) {
        window.colibriNavStickyOpts = component.opts.sticky;
    }

    if (newValue == false) {
        component.opts.sticky = false;
    } else {
        component.opts.sticky = window.colibriNavStickyOpts;
    }

    if (component) {
        if (component.hasOwnProperty('restart')) {
            component.restart();
        } else {
            component.stop();
            component.start();
        }
    } else {
        console.log(item.selector, 'has no kubio component')
    }
}

function colibriNavigationToggleOverlap(item, newValue, oldValue) {

    let el = $(item.selector);
    let component = el.data()['fn.kubio.navigation'];
    component.opts.overlap = newValue;
    if (component) {
        if (component.hasOwnProperty('restart')) {
            component.restart();
        } else {
            component.stop();
            component.start();
        }

        let callback;
        if (item.callback) {
            callback = new Function("return " + item.callback)();
            callback(newValue, oldValue);
        }

    } else {
        console.log(item.selector, 'has no kubio component')
    }
}

function colibriSetAttr(item, newValue, oldValue) {
    let el = $(item.selector);
    el.attr(item.value, newValue);
}

function runJs(data, newValue, oldValue) {
    data.forEach((item) => {
        switch (item.action) {
            case 'toggle-class':
                toggleClass(item, newValue, oldValue);
                break;
            case 'set-class':
                setClass(item, newValue, oldValue);
                break;
            case 'set-css':
                setCss(item, newValue, oldValue);
                break;
            case 'focus':
                focus(item, newValue, oldValue);
                break;
            case 'colibri-component-restart':
                colibriComponentRestart(item, newValue, oldValue);
                break;
            case 'colibri-component-toggle':
                colibriComponentToggle(item, newValue, oldValue);
                break;
            case 'colibri-navigation-toggle-sticky':
                colibriNavigationToggleSticky(item, newValue, oldValue);
                break;
            case 'colibri-navigation-toggle-overlap':
                colibriNavigationToggleOverlap(item, newValue, oldValue);
                break;
            case 'colibri-set-attr':
                colibriSetAttr(item, newValue, oldValue);
                break;
        }
    });
}

export default runJs;








