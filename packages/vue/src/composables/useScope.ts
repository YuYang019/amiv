import { provide, inject } from 'vue'
import type { InjectionKey } from 'vue'

interface UseScope {
    scope: Scope | undefined
}

const KEY: InjectionKey<Scope> = Symbol('scope')

class Scope {
    instances: any[] = [];
    parentScope: Scope | undefined;
    childScope: Scope[] | undefined;

    constructor(parentScope) {
        this.parentScope = parentScope
        if (parentScope) {
            if (!parentScope.childScope) {
                parentScope.childScope = [this]
            } else {
                parentScope.childScope.push(this)
            }
        }
    }

    registerInstance(instance) {
        if (!this.instances.includes(instance)) {
            this.instances.push(instance)
        }
    }

    getInstances() {
        return this.instances.slice()
    }
}

// 构建组件实例作用域
export function useScope(): UseScope {
    const createScope = () => {
        // 子元素只会 inject 到相邻父级的 scope
        const parentScope = inject(KEY)
        const scope = new Scope(parentScope)
        provide(KEY, scope)
    }

    createScope()

    return {
        scope: inject(KEY),
    }
}
