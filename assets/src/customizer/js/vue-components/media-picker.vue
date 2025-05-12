<template>
    <div :class="type" @click="chooseMedia" class="colibri-component media-picker">
        <!--IMAGE ELEMENT-->
        <img :src="currentValue" v-if="mediaExist && type === 'image'">

        <!--VIDEO ELEMENT-->
        <video :key="value"
               class="video-preview"
               muted="muted"
               v-if="mediaExist && type === 'video'">
            <source :src="currentValue" @click="chooseMedia" type="video/mp4"/>
        </video>

        <!--NO ELEMENT-->
        <p v-if="!mediaExist">{{ t('colibri.mediapicker.selectitem') }}</p>
    </div>
</template>

<script>
    import {t} from "./translate";
    import Locale from 'element-ui/src/mixins/locale';

    export default {
        name: "MediaPicker",
        mixins: [Locale],
        data() {
            return {
                selectedValue: "",
            }
        },

        props: {
            value: {
                type: String,
                default: '',
            },
            title: {
                type: String,
                default: t('colibri.mediapicker.selectitem'),
            },
            type: {
                type: String,
                default: 'image',
            },
            disabled: {
                type: Boolean,
                default: false,
            },
        },
        computed: {

            currentValue() {
                return this.selectedValue || this.value;
            },

            mediaExist() {
                return !!this.value;
            },
            backgroundImage() {
                let style = {};

                if (this.type === 'image') {
                    style = {
                        backgroundImage: `url(${this.value})`,
                    };
                }
                return style;
            },
        },


        methods: {
            chooseMedia() {
                this.$wpService.openMediaBrowser({
                    type: this.type,
                    callback: (media) => {
                        let sources = [].concat(media);
                        if (sources.length) {
                            this.selectedValue = sources[0].url;
                            this.$emit('change', sources[0].url);
                        }
                    }
                })

            }

        }
    }
</script>

<style lang="scss" scoped>

</style>







