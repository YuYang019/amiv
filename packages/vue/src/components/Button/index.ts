import { registerComponent } from '@amiv/core'
import Button from './Button.vue'

registerComponent({
    type: ['reset', 'button', 'submit', 'action'],
    component: Button
})
