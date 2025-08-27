import * as React from "react"
import { Toast as ToastComponent } from "../app/Components/ui/toast"

const TOAST_LIMIT = 1
const TOAST_REMOVE_DELAY = 1000000

let count = 0

function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER
  return count.toString()
}

const listeners = []
let memoryState = { toasts: [] }

function dispatch(action) {
  memoryState = reducer(memoryState, action)
  listeners.forEach(listener => listener(memoryState))
}

// reducer function (exactly যেমন তুমি আগে লিখেছিলে)
function reducer(state, action) {
  switch(action.type) {
    case "ADD_TOAST":
      return { ...state, toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT) }
    case "UPDATE_TOAST":
      return {
        ...state,
        toasts: state.toasts.map(t => t.id === action.toast.id ? { ...t, ...action.toast } : t)
      }
    case "DISMISS_TOAST":
      const { toastId } = action
      state.toasts.forEach(toast => {
        if (!toastId || toast.id === toastId) toast.open = false
      })
      return { ...state, toasts: [...state.toasts] }
    case "REMOVE_TOAST":
      return { ...state, toasts: state.toasts.filter(t => t.id !== action.toastId) }
    default:
      return state
  }
}

function toast(props) {
  const id = genId()
  const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id })
  const update = newProps => dispatch({ type: "UPDATE_TOAST", toast: { ...newProps, id } })

  dispatch({ type: "ADD_TOAST", toast: { ...props, id, open: true, onOpenChange: open => { if(!open) dismiss() } } })

  return { id, dismiss, update }
}

function useToast() {
  const [state, setState] = React.useState(memoryState)

  React.useEffect(() => {
    listeners.push(setState)
    return () => { listeners.splice(listeners.indexOf(setState), 1) }
  }, [])

  return {
    ...state,
    toast,
    dismiss: toastId => dispatch({ type: "DISMISS_TOAST", toastId })
  }
}

export { useToast, toast }
