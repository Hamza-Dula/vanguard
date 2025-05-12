<template>
    <div class="colibri-icon-picker">
        <el-popover
                @show="initOptions"
                placement="right"
                ref="popover"
                title=""
                trigger="click"
                width="420">
            <!--content starts-->
            <div class="colibri-icons-wrapper">
                <div class="inline-elements-container">
                    <div class="inline-element fit">
                        <span>{{ selectIcon }}</span>
                    </div>
                    <div class="inline-element">
                        <el-input v-model="search"/>
                    </div>
                </div>
                <div class="colibri-icons-holder">
                    <ul>
                        <li :key="option.name" v-for="option in options">
                            <span :style="iconStyle(option.content)" @click="setValue(option)"
                                  class="icon-preview"></span>
                        </li>
                    </ul>
                </div>
            </div>
            <!--content end-->
            <el-button class="picker-button" slot="reference" type="text">
                <span :style="iconStyle(currentValue.content)" class="icon-preview"></span>
                <span class="icon-label">{{ toLabel(currentValue.name) }}</span>

            </el-button>
        </el-popover>
    </div>
</template>

<script>
    import {Button as ElButton, Input as ElInput, Popover as ElPopover} from "element-ui";
    import FontAwesomeIcons from "../font-awesome";

    let escapeRegexpString = (value = '') => String(value).replace(/[|\\{}()[\]^$+*?.]/g, '\\$&');


    export default {
        name: "ColibriIcon",
        components: {
            ElPopover,
            ElButton,
            ElInput,
        },
        data() {
            return {
                search: '',
                options: [],
                internalValue: null
            }

        },

        watch: {
            search(value, oldValue) {
                if (value !== oldValue) {
                    this.debouncedQuery(value);
                }
            },
            internalValue() {
                this.$emit('input', this.internalValue);
                this.$emit('change', this.internalValue);
            }
        },

        props: {
            title: {
                type: String,
                default: ""
            },

            selectIcon: {
                type: String,
                default: "Select Icon"
            },
            value: {
                type: Object,
                default() {
                    return {
                        name: "",
                        content: ""
                    }

                }

            },
            icons: {
                type: Array,
                default: function () {
                    return FontAwesomeIcons;
                }

            },

            defaultMatches: {
                type: Array,
                default: function () {
                    return [];
                }
            },
        },
        computed: {
            currentValue() {
                return this.internalValue || this.value;
            }
        },

        created() {
            this.debouncedQuery = _.debounce(this.queryIcons, 200);
        },

        methods: {


            iconStyle(svg) {
                let encoded = window.btoa(svg);
                return {
                    backgroundImage: `url(data:image/svg+xml;base64,${encoded})`
                };
            },
            toLabel(name) {
                return (name || "").split('/').pop().replace(/-/img, ' ')
            },


            queryIcons(query) {

                query = query || '';

                if (typeof query === "string") {
                    query = [query];
                }
                query = query.map(item => escapeRegexpString(item)).join('|');


                if (!query) {
                    this.options = this.icons
                } else {
                    this.options = this.icons.filter((icon) => {
                        return new RegExp(query, 'i').test(this.toLabel(icon.name));
                    }).slice(0, 29);
                }


            },

            initOptions() {
                this.search = '';
                this.queryIcons();
            },
            setValue(value) {
                this.internalValue = value;
                this.$refs.popover.doClose();
            }

        }
    }
</script>








