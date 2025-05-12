<template>
    <el-color-picker
            :show-alpha="alpha"
            :size="size"
            @active-change="activeChange"
            @change="setValue"
            v-model="value"
    </el-color-picker>
</template>

<script>
    export default {
        name: "ColibriColorPicker",
        inline: true,
        props: {
            value: ''
        },
        data() {
            return {
                value: '',
            }
        },
        mounted() {
        },
        methods: {
            setValue(value) {
                this.$emit('change', value);
            }
        }
    }
</script>

<style scoped>

</style>







