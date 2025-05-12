/** @global YT */

import BaseHandler from "./base-handler";

const VIDEO_ID_REGEX = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/)|(?:(?:watch)?\?v(?:i)?=|&v(?:i)?=))([^#&?]*).*/;

export default class YouTubeHandler extends BaseHandler {


    constructor(element, settings) {
        super(element, settings);

        return this;
    }

    static test(settings) {
        return 'video/x-youtube' === settings.mimeType;
    }


    ready() {
        if ('YT' in window) {
            window.YT.ready(() => {
                this.loadVideo();
            });
        } else {
            let tag = document.createElement('script');
            tag.src = 'https://www.youtube.com/iframe_api';
            tag.onload = () => {
                window.YT.ready(() => {
                    this.loadVideo();
                });
            };

            document.getElementsByTagName('head')[0].appendChild(tag);
        }
    }


    getVideoID() {
        let matches = this.settings.videoUrl.match(VIDEO_ID_REGEX);

        if (matches && matches.length >= 2) {
            return matches[1]
        }

        return null;
    }


    getYTOptions() {
        let options = {

            videoId: this.getVideoID(),
            events: {
                onReady: (e) => {
                    let ytVideo = e.target;
                    ytVideo.mute();
                    ytVideo.setPlaybackQuality("auto");
                    ytVideo.playVideo();
                },
                onStateChange: (e) => {
                    if (window.YT.PlayerState.PLAYING === e.data) {
                        this.trigger('play');
                    } else if (window.YT.PlayerState.PAUSED === e.data) {
                        this.trigger('pause');
                    } else if (window.YT.PlayerState.ENDED === e.data) {
                        e.target.playVideo();
                    }
                }
            },
            playerVars: {
                autoplay: 1,
                controls: 0,
                disablekb: 1,
                fs: 0,
                iv_load_policy: 3,
                loop: 1,
                modestbranding: 1,
                playsinline: 1,
                rel: 0,
                showinfo: 0,

            }
        };

        if (this.settings.height) {
            options['height'] = this.settings.height;
        }

        if (this.settings.width) {
            options['width'] = this.settings.width;
        }
        // height: this.settings.height,
        // width: this.settings.width,

        return options;
    }

    loadVideo() {
        let video = document.createElement('div'),
            YT = window.YT;

        this.setVideo(video);
        this.player = new window.YT.Player(video, this.getYTOptions());
    }

    play() {
        this.player.playVideo();
    }

    pause() {
        this.player.pauseVideo();
    }

    isPaused() {
        return YT.PlayerState.PAUSED === this.player.getPlayerState();
    }
}







