import { createStore } from "vuex";
import router from '../router'
import apiUtils from "../utils/apiUtils";

export const SET_TOKEN = 'setToken';

export default createStore({
    state: {
        toke: null,
        url: process.env.VUE_APP_URL,
        errorMessage: null,
    },
    mutations: {
        [SET_TOKEN](state, payload) {
            state.toke = payload;
        },
        setErrorMessage(state, message) {
            state.errorMessage = message;
        },
    },
    actions: {
        
        async login({ commit }, usuario) {
            try {
                const res = await fetch(this.state.url + 'api/auth/signin', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(usuario),
                });
        
                if (!res.ok) {
                    const error = await res.json();
                    console.log('Error:', error);
                    commit('setErrorMessage', error.message || 'Hubo un error en la solicitud.');
                    throw new Error('Credenciales incorrectas');
                }
        
                const responseData = await res.json();
                commit(SET_TOKEN, responseData.data.token);
                localStorage.setItem('data', JSON.stringify(responseData.data.user));
                localStorage.setItem('token', responseData.token);
                router.push({ name: 'Dashboard' }).catch(() => {});
                return apiUtils.handleErrors(res);
            } catch (error) {
                console.log('Error:', error);
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
            console.log(this.state.toke)
            try {
                const res = await fetch(this.state.url + 'api/user/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-access-token': this.state.toke
                    }
                })
                const usuarioDB = await res.json()
                const user = usuarioDB;
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
            // commit('setToken', null)
            // localStorage.removeItem('token2')
            // localStorage.removeItem('email')

            commit(SET_TOKEN, null);
            localStorage.removeItem('data');
            // router.replace({ name: 'Inicio' }).catch(() => {});
        }
    },
    modules: {}
})