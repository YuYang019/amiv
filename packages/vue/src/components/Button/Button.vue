<!-- <template>
    <wrapper :wrapper-props="wrapperProps">
        <template #default="slotProps">
            <el-button @click="onAction(slotProps)">{{ label }}</el-button>
        </template>
    </wrapper>
</template> -->

<script lang="ts">
import { ElButton } from 'element-plus'
import { defineComponent, h, ref, inject, toRefs, onUpdated, computed, PropType } from 'vue'
import Wrapper from './Wrapper.vue'
import { injectionKey } from '../Form/useForm'

type ActionType = 'dialog' | 'drawer';

export interface Action {
    type: 'reset' | 'button' | 'submit' | 'action';
    label?: 'string';
    actionType?: ActionType;
    url?: string;
}

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
            default: ''
        }
    },

    components: {
        Wrapper
    },

    setup(props, { attrs }) {
        const form = inject(injectionKey)

        function onAction(slotProps) {
            console.log('click', slotProps)
            slotProps && slotProps.doAction()
        }

        return {
            onAction,
            form
        }
    },

    render() {
        const { onAction, $attrs, type, actionType, label, form } = this

        function renderButton(slotProps) {
            let buttonType = 'default'
            if ($attrs.primary) {
                buttonType = 'primary'
            }

            return h(ElButton, {
                onClick: () => onAction(slotProps),
                type: buttonType
            }, label)
        }

        if (actionType) {
            return h(Wrapper, {
                ...$attrs,
                actionType
            }, {
                default: (slotProps) => renderButton(slotProps)
            })
        }

        if (type === 'button') {
            const { url, onClick } = $attrs

            const handleClick = (e: any) => {
                onClick && onClick(e)
                url && window.open(url)
            }

            return h(ElButton, {
                ...$attrs,
                onClick: handleClick
            }, label)
        }

        if (type === 'submit') {
            const { onClick } = $attrs

            const handleClick = (e: any) => {
                onClick && onClick(e)
                form?.submitForm()
            }

            return h(ElButton, {
                ...$attrs,
                onClick: handleClick,
            }, label)
        }

        if (type === 'reset') {
            const { onClick } = $attrs

            const handleClick = (e: any) => {
                onClick && onClick(e)
                form?.resetForm()
            }

            return h(ElButton, {
                ...$attrs,
                onClick: handleClick,
            }, label)
        }

        return ''
    }
})
</script>

<style>
</style>


