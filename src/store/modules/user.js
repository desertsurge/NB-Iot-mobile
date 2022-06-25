import axios from 'axios'

const SET_USER_NAME = 'SET_USER_NAME'
const SET_RANDOM_IMG = 'SET_RANDOM_IMG'

export default {
    namespaced: true,

    state: {
        username: 'Tom',
        randomImg: 'https://images.dog.ceo/breeds/bulldog-french/n02108915_8258.jpg',
    },

    getters: {
        getUsername (state) {
            return state.username
        },
        getRandomImg (state) {
            return state.randomImg
        },
    },

    mutations: {
        [SET_USER_NAME]: (state, username)=>{
            state.username = username
        },
        [SET_RANDOM_IMG]: (state, randomImg)=>{
            state.randomImg = randomImg
        },
    },

    actions: {
        async setUsername ({dispatch, commit, getters}, data) {
            let username = getters.getUsername
            return new Promise((resolve, reject) => {
                setTimeout(()=>{
                    commit('GET_USER_NAME', data)
                    resolve(data)
                }, 2000)
            })
        },
        async setRandomImg ({dispatch, commit, getters}, data) {
            // let randomImg = getters.getRandomImg
            return new Promise((resolve, reject) => {
                axios.get('https://dog.ceo/api/breeds/image/random').then((res) => {
                    let img = res.data.message
                    commit('SET_RANDOM_IMG', img)
                    resolve(img)
                })
            })
        },
    },
}