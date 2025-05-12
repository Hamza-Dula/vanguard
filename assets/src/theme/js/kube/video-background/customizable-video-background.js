import VideoBackground from "@kubio/scripts/src/background/video/video-bg";

export default class CustomizableVideoBackground extends VideoBackground {

    constructor(element, options) {
        super(element, options);
        this.opts.wpSettings = Colibri.getData(this.opts.kubioId) || {};
        return this;
    }

    wpCustomize(api) {
        this.API_URL = colibri_ADDITIONAL_JS_DATA.api_url;
        for (let opt in this.opts.wpSettings) {

            if (this.opts.wpSettings.hasOwnProperty(opt)) {
                let setting = this.opts.wpSettings[opt];

                this.wpSettingBind(setting, (newValue) => {
                    if (opt === "externalUrl") {
                        this.restartYouTubeVideo(newValue);
                    }

                    if (opt === "internalUrl") {
                        this.restartSelfHostedVideo(newValue);
                    }

                    if (opt === "videoType") {
                        var videoType = "native";
                        if (newValue === "external") videoType = "youtube";
                        this.changeProvider(videoType);
                    }

                    if (opt === "posterUrl") {
                        this.$element.css({
                            backgroundImage: `url(${newValue})`
                        });
                        this.videoData.poster = newValue;
                    }
                });
            }
        }
    }

    changeProvider(newValue) {
        if (newValue === "youtube") {
            this.restartYouTubeVideo(wp.customize(this.opts.wpSettings['externalUrl']).get());
        } else {
            this.restartSelfHostedVideo(wp.customize(this.opts.wpSettings['internalUrl']).get());
        }
    }

    restartYouTubeVideo(value) {
        this.videoData.videoUrl = value;
        this.videoData.mimeType = "video/x-youtube";

        super.generateVideo();
    }

    restartSelfHostedVideo(value) {

        if (!value) {
            this.videoData.videoUrl = "";
            this.videoData.mimeType = "video/mp4";
            super.generateVideo();
        } else {

            this.$.getJSON(`${this.API_URL}/attachment-data/${value}`, (data) => {
                this.videoData.videoUrl = data.url;
                this.videoData.mimeType = data.mime_type;

                super.generateVideo();
            });
        }

    }


}








