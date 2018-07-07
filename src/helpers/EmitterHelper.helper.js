import FbEmitter from 'fbemitter'

class Emitter {
    constructor () {
        this.emitter = new FbEmitter.EventEmitter()
    }
}
// create a singleton of the emitter so we can use thesame emitter instance
export default new Emitter()