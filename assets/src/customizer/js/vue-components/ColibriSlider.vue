<template>

    <div class="inline-elements-container">
        <div class="inline-element">
            <el-slider
                    :max="max"
                    :min="min"
                    :step="step"
                    @change="setValue"
                    v-model="internalValue"
            >
            </el-slider>
        </div>
        <div class="inline-element fit">
            <el-input-number
                    :max="max"
                    :min="min"
                    :step="step"
                    @change="setValue"
                    controls-position="right"
                    size="small"
                    v-model="internalValue">
            </el-input-number>
        </div>
    </div>

</template>

<script>
    export default {
        name: "ColibriSlider",
        props: {
            min: {
                type: Number,
                default: 0
            },
            max: {
                type: Number,
                default: 100
            },
            step: {
                type: Number,
                default: 1
            },
            value: {
                type: Number,
                default: 0
            },
        },
        data() {
            return {
                internalValue: 0,
            }
        },
        mounted() {
            this.internalValue = parseFloat(this.value);
        },
        methods: {
            setValue(value) {
                this.internalValue = parseFloat(value);
                this.$emit('change', this.internalValue);
            }
        }
    }
</script>

<style scoped>

</style>







