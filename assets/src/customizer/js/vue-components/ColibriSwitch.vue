<template>
    <div class="inline-elements-container">
        <div class="inline-element">

            <el-switch
                    @change="setValue"
                    active-color="#1989fa"
                    inactive-color="#949596"
                    v-model="value"
            >
            </el-switch>

        </div>
    </div>
</template>

<script>
    export default {
        name: "ColibriSwitch",
        props: {
            options: {
                value: '',
            },
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







