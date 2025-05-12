export default class BaseHandler {
    constructor(element, settings) {
        this.settings = settings;
        this.element = element;

        this.ready();
    }

    static test() {
        return false;
    }

    ready() {

    }

    play() {
    }

    pause() {
    }

    isPaused() {
    }

    setVideo(node) {
        node.className = 'colibri-video-background-item';
        this.element.innerHTML = '';
        this.element.appendChild(node);


    }

    trigger(name) {
        var evt;

        if ('function' === typeof window.Event) {
            evt = new Event(name);
        } else {
            evt = document.createEvent('Event');
            evt.initEvent(name, true, true);
        }

        this.element.dispatchEvent(evt);
    }
}







