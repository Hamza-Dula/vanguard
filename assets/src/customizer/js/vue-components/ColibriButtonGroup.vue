<template>
    <el-button-group class="colibri-select-buttons-container">
        <div class="h-row no-gutters">
            <sidebar-select-button
                    :is-selected="buttonIsSelected(item.value)"
                    :key="item.value"
                    :ref="item.value"
                    :title="item.label"
                    @click="handleButtonClicked(item)"
                    class="h-col"
                    v-for="item in items">
        <span v-if="optionsType === 'string'">
          {{ item.label }}
        </span>
                <svgicon
                        :height="iconSize"
                        :name="item.iconPath"
                        :width="iconSize"
                        v-if="optionsType === 'svg'"/>
            </sidebar-select-button>
        </div>
    </el-button-group>
</template>

<script>
    import '../../../common/sidebar-vue-svg-icons';
    import SidebarSelectButton from './SidebarSelectButton';

    export default {
        name: 'SelectControl',
        components: {SidebarSelectButton},
        mixins: [],
        model: {
            event: 'change',
        },
        props: {
            items: {
                type: Array,
                default: () => {
                    return [];
                },
            },
            value: {type: [String, Number], default: ''},
            size: {type: String, default: ''},
            disabled: {type: Boolean, default: false},
            optionsType: {
                type: String,
                default: 'string',
            },
            iconSize: {
                type: [String, Number],
                default: '14',
            },
        },
        computed: {
            hasDefaultSlot() {
                return !!this.$slots.default;
            },
        },
        methods: {
            itemIsDisabled(item) {
                return this.disabled;
            },

            buttonIsSelected(buttonValue) {
                return this.value === buttonValue;
            },
            getButtonClasses(buttonValue) {
                let classes = ['h-col', 'sidebar-select-button'];

                return classes;
            },
            handleButtonClicked(item) {
                const newValue = item.value;

                if (this.disabled || newValue === this.value) {
                    return;
                }

                this.$emit('change', newValue);
            },
        },
    };
</script>

<style lang="scss">
    .colibri-select-buttons-container {
        width: 100%;
    }
</style>








