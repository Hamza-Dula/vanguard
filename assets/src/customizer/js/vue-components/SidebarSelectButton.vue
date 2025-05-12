<template>
  <el-button
    :disabled="disabled"
    :class="classes"
    @click="$emit('click', $event)">
    <slot/>
  </el-button>
</template>
<script>
export default {
  name: 'SidebarSelectButton',
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    isSelected: {
      type: Boolean,
      default: false,
    },
    grayDisable: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    classes() {
      let classes = ['sidebar-select-button'];

      if (this.isSelected) {
        classes.push('is-selected');
      }
      if (this.grayDisable) {
        classes.push('use-gray-disable');
      } else {
        classes.push('use-opacity-disable');
      }

      return classes;
    },
  },
};
</script>








