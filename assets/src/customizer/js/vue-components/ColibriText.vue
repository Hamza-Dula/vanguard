<template>
    <el-input @change="setValue" @input="debouncedSetValue" type="text" v-model="currentValue"></el-input>
</template>

<script>
    export default {
        name: "ColibriText",
        data() {
            return {
                currentValue: ''
            }
        },
        props: {

            value: {}
        },
        mounted() {
            this.currentValue = this.value;
        },
        methods: {
            setValue(value) {
                this.currentValue = value;
                this.$emit('change', value);
            },
            debouncedSetValue: _.debounce(function (value) {
                this.currentValue = value;
                this.$emit('change', value);
            }, 300)
        }
    }
</script>

<style scoped>

</style>







