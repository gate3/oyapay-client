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
            agents:[],
            agentSignUp: action(this.agentSignUp),
            fetchAllAgents: action(this.fetchAllAgents)
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
        }
    }

    async fetchAllAgents () {
        //this.isLoading = true
        try{
            const result = await this.httpClient.get(this.apiRoutes.fetchAll)
            const {data} = result
            runInAction(()=>{
                this.agents = data.message
                this.isLoading = false
            })
        }catch(e){
            console.log(e)
            runInAction(()=>this.isLoading = false)
        }
    }
}

export default new AgentStore()
