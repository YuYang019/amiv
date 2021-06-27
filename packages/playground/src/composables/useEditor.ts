import {Ref, onMounted, onUnmounted, unref, ref} from 'vue'
import * as monaco from 'monaco-editor'
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker'
import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker'
import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker'
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'
import useCode from './useCode'

// @ts-ignore
self.MonacoEnvironment = {
    getWorker(_: string, label: string) {
        if (label === 'json') {
            return new jsonWorker()
        }
        if (label === 'css' || label === 'scss' || label === 'less') {
            return new cssWorker()
        }
        if (label === 'html' || label === 'handlebars' || label === 'razor') {
            return new htmlWorker()
        }
        if (label === 'typescript' || label === 'javascript') {
            return new tsWorker()
        }
        return new editorWorker()
    }
}

type MaybeRef<T> = T | Ref<T>;

function addSaveCommand(editor: monaco.editor.IStandaloneCodeEditor) {
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_S, () => {
        const { setCode } = useCode()
        const value = editor.getValue()
        setCode(value)
    })
}

export default function(el: MaybeRef<HTMLElement | undefined>) {
    el = unref(el)
    if (!el) return

    const { getCode } = useCode()
    const monacoEditor = monaco.editor.create(el as HTMLElement, {
        language: 'json',
        value: getCode()
    })

    addSaveCommand(monacoEditor)

    onUnmounted(() => {
        monacoEditor.dispose()
    })
}
