import { App, Directive } from "vue"
import draggable from "@/directives/modules/draggable"
import copy from "@/directives/modules/copy"
import debounce from "@/directives/modules/debounce"
import throttle from "@/directives/modules/throttle"
const directivesList:
  { [key: string]: Directive } = {
  draggable, copy, debounce, throttle
}

const directives = {
  install: (app: App<Element>) => {
    Object.keys(directivesList).forEach(key => {
      app.directive(key, directivesList[key])
    })
  }
}

export default directives
