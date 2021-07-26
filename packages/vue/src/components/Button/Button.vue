<!-- <template>
    <wrapper :wrapper-props="wrapperProps">
        <template #default="slotProps">
            <el-button @click="onAction(slotProps)">{{ label }}</el-button>
        </template>
    </wrapper>
</template> -->

<script lang="ts">
import { ElButton } from 'element-plus'
import { defineComponent, h, ref, inject, toRefs, onUpdated, getCurrentInstance, PropType } from 'vue'
import { useScope } from 'packages/vue/src/composables/useScope'
import type { ActionType } from 'packages/vue/src/types/shared'
import Wrapper from './Wrapper.vue'
import { injectionKey } from '../Form/useForm'

export default defineComponent({
    name: 'Button',

    props: {
        type: {
            type: String,
            default: 'button'
        },
        actionType: {
            type: String as PropType<ActionType>,
            default: ''
        },
        label: {
            type: String,
            default: 'button'
        },
        level: {
            type: String,
            default: 'default'
        },
        url: {
            type: String,
            default: ''
        }
    },

    components: {
        Wrapper
    },

    render() {
        const { $attrs, type, actionType, label, level, url } = this
        const { onClick } = $attrs

        const renderButton = (props) => {
            return h(ElButton, {
                ...$attrs,
                ...props,
                type: level,
            }, {
                default: () => label
            })
        }

        if (actionType) {
            return h(Wrapper, {
                ...$attrs,
                actionType
            }, {
                default: (slotProps) => renderButton({
                    ...slotProps
                })
            })
        }

        if (type === 'button') {
            const handleClick = (e: any) => {
                onClick && onClick(e)
                url && window.open(url)
            }
            return renderButton({ onClick: handleClick })
        }

        return ''
    }
})
</script>

<style>
</style>


