<template>
  <div :class="rowClasses">
    <div
        :class="getOuterClasses(item)"
        :key="item.value"
        :ref="item.value"
        v-for="(item, index) in itemsWithDummies">

      <el-tooltip
          :content="item.label"
          :enterable="false"
          :hide-after="1000"
          effect="dark"
          placement="top">
        <div
            :class="innerClasses(item)"
            @click="onClick(item)"
            v-if="!item.dummy">

          <div class="sel-with-ic-icon-container d-flex justify-content-center"
               v-html="item.icon"
               v-if="item.icon"></div>

        </div>
      </el-tooltip>
    </div>
  </div>
</template>

<script>
const dummyItem = {
  dummy: true,
  value: 'dummy',
};

export default {
  name: 'SelectWithIcon',
  components: {},
  props: {
    value: {
      type: String,
      default: null,
    },
    items: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      itemsPerRow: 3,
      svgSize: {
        width: '102',
        height: '42',
      },
    };
  },
  computed: {
    rowClasses() {
      let classes = ['select-with-icon-row', 'h-row', 'no-gutters'];
      return classes;
    },

    //the matrix layout should always be visible even if there is only one element per row.
    itemsWithDummies() {
      let items = this.items;
      let itemsOnLastRow = items.length % this.itemsPerRow;
      let missingItems = 0;
      if (itemsOnLastRow) {
        missingItems = this.itemsPerRow - itemsOnLastRow;
      }
      if (missingItems) {
        items = items.concat(this.getDummyItems(missingItems));
      }

      return items;
    },
  },
  methods: {
    innerClasses(item) {
      let classes = [
        'select-with-icon-inner',
        'd-flex',
        'align-items-center',
        'justify-content-center',
        'flex-column',
      ];

      return classes;
    },
    getDummyItems(numberOfItems = 0) {
      const dummyItems = [];
      for (let i = 0; i < numberOfItems; i++) {
        dummyItems.push(dummyItem);
      }

      return dummyItems;
    },
    itemIsDisabled(item) {
      return false;
    },
    onClick(item) {

      if (this.itemIsDisabled(item)) {
        return;
      }

      const newValue = item.value;
      if (newValue !== this.value) {
        this.$emit('change', newValue);
      }
    },
    getOuterClasses(item) {

      let classes = ['select-with-icon-grid-item', 'h-col-4'];
      if (item.value === this.value) {
        classes.push('select-with-icon-is-selected');
      }
      if (item.dummy) {
        classes.push('select-with-icon-dummy');
      }
      if (this.itemIsDisabled(item)) {
        classes.push('select-with-icon-grid-item--disabled');
      }

      return classes;
    },
  },
};
</script>
<style lang="scss">
// used by theme compiler
@import '../../../common/variables';

.select-with-icon-row {
  .select-with-icon-grid-item {
    $elements-per-row: 3;

    $background-color: white;
    $background-color-hover: $theme-controls-primary-color;
    $background-color-selected: $theme-controls-primary-color-background;

    $border-color: $theme-controls-border-color;
    $border-color-hover: $theme-controls-primary-color;
    $border-color-selected: $theme-controls-primary-color;

    $text-color-hover: $theme-controls-text-color-with-primary-color-bg;
    $text-color-selected: $theme-controls-primary-color;

    $border-radius: 4px;

    background-color: $background-color;
    border: 1px solid $border-color;
    position: relative;
    width: 100%;
    fill: #606266;
    margin-left: -1px;

    //all elements but the ones on the first row
    &:nth-child(n + #{$elements-per-row + 1}) {
      margin-top: -1px;
    }

    //first column
    &:nth-child(#{$elements-per-row}n + 1) {
      margin-left: 0;
    }

    //border radius start
    &:first-child {
      border-top-left-radius: $border-radius;
    }

    &:nth-child(#{$elements-per-row}) {
      border-top-right-radius: $border-radius;
    }

    &:last-child {
      border-bottom-right-radius: $border-radius;
    }

    &:nth-last-child(#{$elements-per-row}) {
      border-bottom-left-radius: $border-radius;
    }

    //border radius end

    .sel-with-ic-icon-container {
      width: 100%;
      padding: 10px;
    }

    &:not(.select-with-icon-dummy):not(.select-with-icon-grid-item--disabled) {
      cursor: pointer;

      &.select-with-icon-is-selected {
        background-color: $background-color-selected;
        border-color: $border-color-selected;
        color: $text-color-selected;
        fill: $text-color-selected;
        z-index: 999;
      }

      &:hover {
        background-color: $background-color-hover;
        fill: $text-color-hover;
        border-color: $border-color-hover;
        z-index: 999;
      }
    }

    &--disabled {
      cursor: not-allowed;
      opacity: $theme-controls-disabled-opacity;
    }

    .select-with-icon-label {
      margin-top: 16px;
    }

    .select-with-icon-inner {
      height: auto;
      min-height: 88px;
    }
  }
}
</style>








