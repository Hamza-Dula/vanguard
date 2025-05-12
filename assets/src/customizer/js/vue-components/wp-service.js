import {t} from "./translate";

let api = wp.customize,
    $ = window.jQuery;


function fixCropKeyPressBug() {
    setTimeout(function () {
        $(top.document).unbind($.imgAreaSelect.keyPress);
    }, 100);
}

export default class WPService {
    install(Vue, options) {
        let service = this;
        Object.defineProperty(Vue, '$wpService', {
            get() {
                return service;
            },
        });

        Object.defineProperty(Vue.prototype, '$wpService', {
            get() {
                return service;
            },
        });
    }

    openCropableImageManager(options) {
        let control = new api.CroppedImageControl('custom_image_cropper[' + Date.now() + ']', {
            params: {}
        });

        control.params = {
            button_labels: {
                frame_title: t('colibri.mediapicker.selectimage')
            },
            height: options.height,
            width: options.width
        };
        let flexible = _.isUndefined(options.flexible) ? true : options.flexible;

        if (flexible) {
            control.params = _.extend(control.params, {
                flex_width: options.width,
                flex_height: options.height
            });
        }

        control.initFrame();
        control.frame.setState('library').open();
        control.frame.content.mode('browse');
        control.frame.on('close', fixCropKeyPressBug);


        control.setImageFromAttachment = function (attachment) {
            options.callback([attachment]);
            fixCropKeyPressBug();
        };


        let frameView = $(control.frame.views.selector);

        frameView.parent().css({
            'z-index': '16000000'
        });
        frameView.find('.instructions').remove();

        control.frame.on('content:create:crop', function () {
            let state = control.frame.state();
            let __createCropToolbar = state.createCropToolbar;
            state.createCropToolbar = function () {
                state.set('canSkipCrop', true);
                __createCropToolbar.apply(state, arguments);
            };
        });
    }

    openVideoPicker(options) {

    }

    openMediaBrowser(options) {
        switch (options.type) {
            case 'video':
                this.openVideoPicker(options);
                break;
            case 'image':
                this.openCropableImageManager({
                    width: options.width || 1920,
                    height: options.height || 1080,
                    flexible: _.isUndefined(options.flexible) ? true : options.flexible,
                    callback(medias) {
                        options.callback(medias[0]);
                    }
                });
                break;
        }
    }
}







