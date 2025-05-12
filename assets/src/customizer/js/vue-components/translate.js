import enLang from 'element-ui/src/locale/lang/en';
import locale from "element-ui/src/locale";
import libLocale from "element-ui/lib/locale";

function _translate(translations, key) {
    let text = `__[${key}]__`;

    if (translations[key]) {
        text = translations[key];
    }

    return text;
}


function translate(translations) {

    let $ = jQuery;

    let lang = $.extend(true, enLang, {
        el: {
            colorpicker: {
                confirm: _translate(translations, "OK"),
                clear: _translate(translations, "clear"),
            },
            messagebox: {
                confirm: _translate(translations, "OK"),
            },

        },

        colibri: {
            mediapicker: {
                selectitem: _translate(translations, "select_item"),
                selectimage: _translate(translations, "select_image"),
            },
        }
    });

    lang.colibri = $.extend(true, lang.colibri, translations);

    let validator = {
        get(target, key) {

            if (typeof target[key] === 'object' && target[key] !== null) {
                return new Proxy(target[key], validator)
            } else {
                if (!target[key]) {
                    target[key] = _translate(translations, key);
                }
                return target[key];
            }
        }

    };

    if (window.Proxy) {
        return new Proxy(lang, validator);
    } else {
        return lang;
    }

}

let currentLang = enLang;

function use(toTranslate) {
    currentLang = translate(toTranslate);
    locale.use(currentLang);
    libLocale.use(currentLang);
}

function t(path, options) {
    locale.use(currentLang);
    libLocale.use(currentLang);
    return locale.t(path, options);
}


export default {
    t,
    use
}


export {
    t
}







