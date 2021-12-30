import axios from "axios";


export const sendPraises = (params) => {
    return axios.post(`/rtm`, {
       ...params
    })
}

export const appenpraises = () => {
    return axios.get(`/appenpraises`)
}

export const login = (name) => {
    return axios.get(`/login`,{
        params:{
            name
        }
    })
}