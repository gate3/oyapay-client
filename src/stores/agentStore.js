import { action, extendObservable, runInAction } from 'mobx'
import GenericStore from './genericStore'
import Constants from '../helpers/Constants.helper'
import EventEmitter from '../helpers/EmitterHelper.helper'

class AgentStore extends GenericStore {
    constructor () {
        super()
        this.apiRoutes = Constants.LINKS.agent
        extendObservable(this, {
            isLoading:false,
            agentSignUp: action(this.agentSignUp)
        })  
    }

    async agentSignUp (args) {
        this.isLoading = true
        try{
            const result = await this.httpClient.post(this.apiRoutes.signUp,args)
            if(result){
                const {data} = result
                runInAction(() => this.isLoading = false)
                EventEmitter.emitter.emit(Constants.EMITTERS.MerchantSignup, data)
            }
        }catch(e){
            runInAction(() => this.isLoading = false)
            // log this erorr using a logger
            console.error(e)
        }finally{
            
        }
    }
}

export default new AgentStore()
