<script lang="ts">
import { ElButton, ElDialog, ElDrawer } from 'element-plus'
import { defineComponent, h, ref, inject, getCurrentInstance } from 'vue'
import Child from 'packages/vue/src/Child'
import { useScope } from 'packages/vue/src/composables/useScope'
import { injectionKey } from '../Form/useForm'

import type { PropType } from 'vue'
import type { Action, ActionType } from 'packages/vue/src/types/shared'

export default defineComponent({
    name: 'Wrapper',

    props: {
        actionType: {
            type: String as PropType<ActionType>,
            default: ''
        },
        dialog: {
            type: Object,
            default: () => ({})
        },
        drawer: {
            type: Object,
            default: () => ({})
        },
        onClose: {
            type: Function,
            default: null
        }
    },

    setup() {
        const visible = ref(false)
        const btnLoading = ref(false)
        const form = inject(injectionKey)
        const { scope } = useScope()

        scope?.registerInstance(getCurrentInstance())

        function getTargets() {
            return scope?.getInstances()?.filter(item => item?.attrs?.type === 'form') ?? []
        }

        async function submitForm(actionType: ActionType) {
            btnLoading.value = true
            const targets = getTargets()
            console.log(scope)
            try {
                if (targets.length) {
                    // confirm 只找同级
                    await targets[0].setupState?.form?.submitForm()
                }
                else if (actionType === 'submit') {
                    // 同级的 form 找不到，用父级的 form
                    await form?.submitForm()
                }
            } finally {
                btnLoading.value = false
            }
        }

        async function resetForm() {
            const targets = getTargets()
            if (targets.length) {
                targets[0].setupState?.form?.resetForm()
            } {
                // 同级的 form 找不到，用父级的 form
                form?.resetForm()
            }
        }

        function open() {
            visible.value = true
        }

        function close() {
            visible.value = false
        }

        return {
            visible,
            open,
            close,
            submitForm,
            resetForm,
            btnLoading
        }
    },

    render() {
        const { $attrs, $slots, visible, open, close, actionType, submitForm, resetForm, btnLoading, dialog, drawer, onClose } = this
        const { onClick } = $attrs

        console.log('wrapper', $attrs, actionType)

        if (!actionType) {
            return $slots.default()
        }

        let Comp
        let children
        let compProps: Record<string, any> = {
            modelValue: visible,
            appendToBody: true,
            beforeClose: () => {
                close()
                console.log('beforeClose')
            },
        }

        function renderFooter(actions: Action[] = []) {
            if (actions.length) {
                actions = actions.map(action => {
                    return {
                        ...action,
                        onClose: close
                    }
                })
            }

            if (actions.length === 0) {
                actions = [{
                    type: 'button',
                    actionType: 'cancel',
                    label: '取消',
                    level: 'default',
                    onClose: close,
                }, {
                    type: 'button',
                    actionType: 'confirm',
                    label: '确认',
                    level: 'primary',
                    onClose: close
                }]
            }

            return actions.map(action => h(Child, {
                schema: action,
            }))
        }

        if (actionType === 'dialog') {
            Comp = ElDialog
            const { body, actions, ...rest } = dialog

            if (body) {
                if (body.type === 'form' && !body?.actions) {
                    body.actions = []
                }
                children = {
                    default: () => h(Child, {
                        schema: body
                    }),
                    footer: renderFooter(actions)
                }
            }

            compProps = {
                ...compProps,
                ...rest
            }
        }

        if (actionType === 'drawer') {
            Comp = ElDrawer
            const { body, actions, ...rest } = drawer

            if (body) {
                children = {
                    default: () => [
                        h(Child, { schema: body }),
                        renderFooter()
                    ]
                }
            }
            compProps = {
                ...compProps,
                ...rest
            }
        }

        if (actionType === 'confirm' || actionType === 'submit') {
            return $slots.default({
                loading: btnLoading,
                onClick: async (e) => {
                    await submitForm(actionType)
                    onClick && onClick(e)
                    onClose && onClose()
                }
            })
        }

        if (actionType === 'cancel') {
            return $slots.default({
                onClick: (e) => {
                    onClick && onClick(e)
                    onClose && onClose()
                }
            })
        }

        if (actionType === 'reset') {
            return $slots.default({
                onClick: (e) => {
                    onClick && onClick(e)
                    resetForm()
                }
            })
        }

        function renderChild() {
            return $slots.default({ onClick: open })
        }

        return [
            renderChild(),
            Comp && h(Comp, {
                ...compProps
            }, children)
        ]
    },
})
</script>

<style>
.el-drawer__body {
    padding: 20px;
}
</style>


