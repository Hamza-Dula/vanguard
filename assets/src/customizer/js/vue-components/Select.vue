<template>
    <el-select @change="setValue" v-model="selectValue">
        <el-option :disabled="item.disabled"
                   :key="item.value"
                   :label="item.label"
                   :value="item.value"
                   v-for="item  in elOptions"/>
    </el-select>
</template>

<script>


    export default {
        name: "Select",
        data() {
            return {
                selectValue: ''
            }
        },
        props: {
            options: {
                type: Array,
                default: []
            },
            value: {}
        },
        mounted() {
            this.selectValue = this.value;
        },
        computed: {
            elOptions() {
                return _.map(this.options, (label, value) => {
                    value = value.toString();
                    label = label.toString();
                    return {
                        value, label
                    }
                });
            }
        },
        methods: {
            setValue(value) {
                this.selectValue = value;
                this.$emit('change', value);
            }
        }
    }
</script>

<style scoped>

</style>







