import { createStore } from "vuex";
import router from '../router'



export default createStore({
    state: {
        toke: null,
        url: "http://localhost:4000/"
    },
    mutations: {
        setToken(state, payload) {
            state.toke = payload
        }
    },
    actions: {
        async login({ commit }, usuario) {
            try {
                const res = await fetch(this.state.url + 'api/auth/signin', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(usuario)
                })
                const usuarioDB = await res.json()
                console.log(usuarioDB.token)
                    // localStorage.setItem('email', usuario.email)
                if (usuarioDB.token == null) {
                    console.log('Error')
                } else {
                    commit('setToken', usuarioDB.token)
                    localStorage.setItem('token2', usuarioDB.token)
                    localStorage.setItem('email', usuario.email)
                }
                // this.datosUser(usuario.email)
                router.push({ name: 'Dashboard' }).catch(() => {});

            } catch (error) {
                console.log('error: ', error)
            }
        },
        async register({ commit }, usuario) {
            try {

                const res = await fetch(this.state.url + 'api/auth/signup', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(usuario)
                })
                const usuarioDB = await res.json()
                console.log(usuarioDB.token)
                commit('setToken', usuarioDB.token)
                localStorage.setItem('token2', usuarioDB.token)
                if (usuarioDB.token) {
                    localStorage.setItem('email', usuario.email)
                }
                router.push({ name: 'Dashboard' })

            } catch (error) {
                console.log('error: ', error)
            }
        },
        async datosUser() {
            const email = localStorage.getItem('email')
            try {
                const res = await fetch(this.state.url + 'api/user/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email: email })
                })
                const usuarioDB = await res.json()
                const user = usuarioDB[0];
                // console.log(user)
                return user
            } catch (error) {
                console.log('error: ', error)
            }
        },
        obtenerToken({ commit }) {
            if (localStorage.getItem('token2')) {
                commit('setToken', localStorage.getItem('token2'))
            } else {
                commit('setToken', null)
            }
        },

        cerrarSesion({ commit }) {
            commit('setToken', null)
            localStorage.removeItem('token2')
            localStorage.removeItem('email')
        }
    },
    modules: {}
})