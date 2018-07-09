const baseUrl = ''
const LINKS = {
    admin:{
        signUp:'admin/signup'
    },
    agent:{
        signUp:'agent/signup',
        fetchAll:'agent/all'
    }
}

const EMITTERS = {
    AdminSignup:'admin:signup',
    Agent:'agent:signup'
}

export default {
    LINKS,
    EMITTERS
}