<script lang="ts">
import { ElButton, ElDialog, ElDrawer } from 'element-plus'
import { defineComponent, h, ref, unref } from 'vue'
import Child from '../../Child'

export default defineComponent({
    name: 'Wrapper',

    setup(props, { attrs }) {
        const visible = ref(false)

        function open() {
            visible.value = true
        }

        function close() {
            visible.value = false
        }

        return {
            visible,
            open,
            close
        }
    },

    props: ['wrapperProps'],

    render() {
        const { $attrs, $slots, visible, open, close } = this

        const { actionType, onClick } = $attrs

        console.log('wrapper', $attrs, $attrs.actionType)

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

        function renderDialogFooter(actions = []) {
            let children = [
                h(ElButton, {
                    onClick: close
                }, {
                    default: () => '取消'
                }),
                h(ElButton, {
                    type: 'primary',
                    onClick: close
                }, {
                    default: () => '确认'
                })
            ]

            if (actions.length === 0) {
                children = []
            }
            if (actions.length) {
                children = actions.map(action => {
                    const isConfirm = action?.actionType === 'confirm'

                    return h(Child, {
                        schema: action,
                        onClick: isConfirm ? close : null
                    })
                })
            }

            return h('span', {
                class: 'dialog-footer'
            }, {
                default: () => children
            })
        }

        if (actionType === 'dialog') {
            Comp = ElDialog
            const { dialog: { body, actions, ...rest } } = $attrs
            console.log(actions)
            if (body) {
                children = {
                    default: () => h(Child, {
                        schema: body
                    }),
                    footer: renderDialogFooter(actions)
                }
            }
            compProps = {
                ...compProps,
                ...rest
            }
        }
        if (actionType === 'drawer') {
            Comp = ElDrawer
            const { drawer: { body, ...rest } } = $attrs
            if (body) {
                children = {
                    default: () => h(Child, {
                        schema: body
                    })
                }
            }
            compProps = {
                ...compProps,
                ...rest
            }
        }

        function doAction() {
            if (onClick) {
                onClick()
            } else {
                open()
            }
        }


        function renderChild() {
            return $slots.default({ doAction })
        }

        console.log('render-wrapper', compProps)

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
.divider {
    height: 1px;
    width: 100%;
    background: #ccc;
}
</style>


