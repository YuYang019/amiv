<template>
    <img
        alt="Vue logo"
        src="./assets/logo.png"
    >
    <renderer :schema="schema"/>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import HelloWorld from './components/HelloWorld.vue';
import {Renderer} from '@amiv/vue';
import {registerComponent} from '@amiv/core';

registerComponent({
    name: 'custom',
    component: HelloWorld,
});

export default defineComponent({
    name: 'App',
    components: {
        Renderer,
    },
    data() {
        return {
            schema: null,
        };
    },
    mounted() {
        this.schema = {
            component: 'page',
            title: '简单页面',
            body: [
                {
                    component: 'layout-row',
                    type: 'flex',
                    justify: 'space-between',
                    body: [
                        {
                            component: 'layout-col',
                            span: 6,
                            body: 'hello',
                        },
                        {
                            component: 'layout-col',
                            span: 6,
                            body: 'my',
                        },
                        {
                            component: 'layout-col',
                            span: 6,
                            body: 'world',
                        },
                    ],
                },
                {
                    component: 'layout-container',
                    body: [
                        {
                            component: 'layout-header',
                            body: 'header',
                        },
                        {
                            component: 'layout-main',
                            body: 'main',
                        },
                        {
                            component: 'layout-footer',
                            body: 'footer',
                        },
                    ],
                },
                {
                    component: 'custom',
                    msg: 'Hello Vue 3 + TypeScript + Vite',
                },
                {
                    component: 'divider',
                },
            ],
        };
    },
});
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
