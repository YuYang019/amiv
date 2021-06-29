<template>
    <el-checkbox-group
        v-model="value"
        :disabled="linkageDisabled"
        v-bind="$attrs"
    >
        <el-checkbox
            v-for="item in options"
            :label="item.value"
            :key="item.value"
        >
            {{ item.label }}
        </el-checkbox>
    <!-- <el-checkbox label="复选框 B"></el-checkbox>
    <el-checkbox label="复选框 C"></el-checkbox>
    <el-checkbox label="禁用" disabled></el-checkbox>
    <el-checkbox label="选中且禁用" disabled></el-checkbox> -->
    </el-checkbox-group>
    <!-- <el-checkbox
        v-model="value"
        :border="border"
        :true-label="trueValue"
        :false-label="falseValue"
        :disabled="linkageDisabled"
    >
        {{ option }}
    </el-checkbox> -->
</template>

<script lang="ts">
import {defineComponent, ref, PropType, watch} from 'vue'
import pick from 'lodash/pick'

interface Option {
    value: any;
    label: string;
}

export default defineComponent({
    name: 'Checkboxes',

    props: {
        linkageDisabled: {
            type: Boolean
        },
        setFormValue: {
            type: Function,
            default: () => void 0
        },
        options: {
            type: Array as PropType<Option[]>,
            default: () => []
        },
        joinValues: {
            type: Boolean,
            default: true
        },
        delimeter: {
            type: String,
            default: ','
        }
    },

    setup(props) {
        const value = ref([])

        watch(value, (newVal: Array<string | number>) => {
            const val = props.joinValues ? newVal.join(props.delimeter) : newVal
            props?.setFormValue?.(val)
        })

        return {
            value,
        }
    },

    created() {
        console.log('checkboxes', this.$attrs)
    }
})
</script>


