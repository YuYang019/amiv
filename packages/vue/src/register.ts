import {DefineComponent, h} from 'vue';
// import {register} from '@amiv/core';

interface RegisterComponentOptions<T> {
    type: string;
    component: T
}

// export const registerComponent = <T>(options: RegisterComponentOptions<T>) => {
//     const {type, component} = options;
//     console.log(type, component);
//     register({
//         type,
//         component
//     })
// }
