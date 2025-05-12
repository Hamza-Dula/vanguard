import ColibriFrontComponent from "../colibri-kube-component";
import Handlers from "./handlers/handlers";


export default class VideoBackground extends ColibriFrontComponent {
    static componentName() {
        return "video-background";
    }

    init() {
        this.videoData = {};
    }


    generateVideo() {
        for (let handle in Handlers) {
            if (Handlers.hasOwnProperty(handle) && Handlers[handle].test(this.videoData)) {
                this.$element.empty();
                new Handlers[handle](this.$element[0], this.videoData);
                break;
            }
        }
    }

    start() {
        this.videoData = {
            mimeType: this.opts.mimeType,
            poster: this.opts.poster,
            videoUrl: this.opts.video
        };

        this.generateVideo();
    }
}







