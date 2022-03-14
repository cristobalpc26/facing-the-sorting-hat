import { TinyEmitter } from "tiny-emitter"
const emitter = new TinyEmitter()
const eventBus = () => {
  return { emitter }
}
export default eventBus