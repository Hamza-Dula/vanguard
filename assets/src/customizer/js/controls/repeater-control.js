import ColibriVueControl from "../colibri-vue-control";

import {sprintf} from "sprintf-js";

export default class RepeaterControl extends ColibriVueControl {
    name() {
        return "colibri-repeater";
    }

    vueData(wpControl) {
        let items = this.getWpControlValue(wpControl) ? this.getWpControlValue(wpControl) : [];
        return {
            items: items.map(function (item, index) {
                item.index = index;
                return item;
            }),
            fields: wpControl.params.fields,
            item_add_label: wpControl.params.item_add_label || "Add Item",
            max: wpControl.params.max || Infinity,
            min: wpControl.params.min || 0
        }
    }

    vueComputed(wpControl) {

        return {
            itemsLabels() {
                return this.items.map(function (item, index) {
                    let label = wpControl.params.item_label || "Item %s";
                    return sprintf(label, index + 1);
                });
            },

            canAdd() {
                return (!!this.max && this.max > this.items.length);
            },

            canRemoveItem() {
                return (this.min < this.items.length);
            }
        }
    }

    vueWatch(wpControl) {

    }

    vueMethods(wpControl) {
        let control = this;
        return {
            getComponentType(name) {
                return `colibri-repeater-${name}`;
            },

            setValue(items) {

                if (!items) {
                    items = this.getClonedItems();
                    items.forEach((item, index) => {
                        items.index = index;
                    })
                }

                this.$set(this, 'items', items);
                this.$nextTick(() => {
                    control.setWpControlValue(wpControl, this.items);
                });
            },

            getClonedItems() {
                return this.items.map(a => Object.assign({}, a));
            },

            onSortEnd(newIndex, oldIndex) {
                const target = this.items.splice(oldIndex, 1)[0];
                let items = this.getClonedItems();

                items.splice(newIndex, 0, target);

                this.$nextTick(() => {
                    this.setValue(items);
                });

            },
            removeItem(index) {

                let items = this.getClonedItems();

                items.splice(index, 1);

                this.setValue(items);
            },
            propChanged(value, item, prop) {
                item[prop] = value;

                this.setValue(this.items);
            },
            addItem() {
                let newItem = {};
                for (let name in this.fields) {
                    if (this.fields.hasOwnProperty(name)) {
                        newItem[name] = this.fields[name].default || "";
                    }
                }

                newItem.index = this.items.length;

                let items = this.getClonedItems();
                items.push(newItem);
                this.setValue(items);
            }
        }
    }

    vueMounted(wpControl) {

    }
}







