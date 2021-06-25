import {registerComponent} from '@amiv/core';
import Col from './Col.vue';
import Row from './Row.vue';
import Container from './Container.vue';
import Aside from './Aside.vue';
import Main from './Main.vue';
import Header from './Header.vue';
import Footer from './Footer.vue';

registerComponent({
    name: 'layout-row',
    component: Row
})

registerComponent({
    name: 'layout-col',
    component: Col
})

registerComponent({
    name: 'layout-aside',
    component: Aside
})

registerComponent({
    name: 'layout-container',
    component: Container
})

registerComponent({
    name: 'layout-main',
    component: Main
})

registerComponent({
    name: 'layout-footer',
    component: Footer
})

registerComponent({
    name: 'layout-header',
    component: Header
})
