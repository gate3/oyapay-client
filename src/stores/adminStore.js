import { action, extendObservable, runInAction } from 'mobx'
import GenericStore from './genericStore'
import Constants from '../helpers/Constants.helper'
import EventEmitter from '../helpers/EmitterHelper.helper'

class AdminStore extends GenericStore {
    constructor () {
        super()
        this.apiRoutes = Constants.LINKS.admin
        extendObservable(this,{
            isLoading:false,
            adminSignUp: action(this.adminSignUp)
        })
    }
    
    async adminSignUp (args) {
        this.isLoading = true
        try{
            const result = await this.httpClient.post(this.apiRoutes.signUp,args)
            if(result){
                const {data} = result
                runInAction(()=>this.isLoading = false)
                EventEmitter.emitter.emit(Constants.EMITTERS.AdminSignup, data)
            }
        }catch(e){
            runInAction(()=>this.isLoading = false)
            // log this erorr using a logger
            console.error(e)
        }
    }
}

export default new AdminStore()
