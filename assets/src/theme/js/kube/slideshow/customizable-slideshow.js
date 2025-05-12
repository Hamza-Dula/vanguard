import Slideshow from "@kubio/scripts/src/background/slideshow/slideshow";


export default class CustomizableSlideshow extends Slideshow {
    start() {
        if (!this.customizerBinded && typeof wp !== 'undefined') {
            this.opts = jQuery.extend(true,{},this.opts, Colibri.getData(this.opts.kubioId) || {});
            this.wpCustomize(wp.customize);
            this.customizerBinded = true;
        }

        super.start();
    }

    wpCustomize(api) {

        for (let opt in this.opts.wpSettings) {

            if (this.opts.wpSettings.hasOwnProperty(opt)) {
                let setting = this.opts.wpSettings[opt];

                this.wpSettingBind(setting, (newValue) => {
                    this.opts[opt] = parseInt(newValue).toString();
                    this.stop();
                    setTimeout(() => {
                        this.start();
                    }, 100);
                });
            }
        }
    }

    wpSettingBind(setting_id, callback) {
        window.wp.customize(setting_id, function (setting) {
            setting.bind(callback);
        });
    }
}








