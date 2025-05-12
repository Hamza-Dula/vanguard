import BaseHandler from "./base-handler";

export default class NativeHandler extends BaseHandler {
    static test(settings) {
        var video = document.createElement('video');
        return video.canPlayType(settings.mimeType);
    }

    isPaused() {
        return this.video.paused;
    }

    ready() {

        if (this.settings.poster) {
            this.element.style.backgroundImage = `url("${this.settings.poster}")`;
        }

        if (!this.settings.videoUrl) {
            return;
        }

        let video = document.createElement('video');

        video.id = this.settings.id || "";

        video.autoplay = 'autoplay';
        video.loop = 'loop';
        video.muted = 'muted';

        if (this.settings.width) {
            video.width = this.settings.width
        }

        if (this.settings.height) {
            video.height = this.settings.height;
        }


        video.addEventListener('play', () => {
            this.trigger('play');
        });

        video.addEventListener('pause', () => {
            this.trigger('pause');
        });

        this.video = video;
        this.setVideo(video);
        video.src = this.settings.videoUrl;
    }

    pause() {
        this.video.pause();
    }

    play() {
        this.video.play();
    }
}








