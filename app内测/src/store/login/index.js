import { getCache, setCache,get_local_cache , set_local_cache } from '@/config/cache'
import { fetch } from '@/config/fetch'
export default {
    namespaced: true,
    state: {
        login: '',
        wx: '',
        qq: '',
    },
    getters: {
        login: state => {
            return state.login
        },
        wx: state => {
            return state.wx
        },
        qq: state => {
            return state.qq
        },
    },
    mutations: {
        set_login(state, val) {
            state.login = val;
            set_local_cache('login', val);
        },
        set_wx(state, val) {
            state.wx = val;
            set_local_cache('wx', val);
        },
        set_qq(state, val) {
            state.qq = val;
            set_local_cache('qq', val);
        },
    },
    actions: {
        get_user({ commit}) {
            const login = get_local_cache('login');
            if (login) {
                commit('set_login', login);
                if (login == 'wx') {
                    const wx = JSON.parse(get_local_cache('wx'));
                    commit('set_wx', wx);
                    commit('set_userid', wx.unionid,{root:true});
                } else if (login == 'qq') {
                    const qq = JSON.parse(get_local_cache('qq'));
                    commit('set_qq', qq);
                    // commit('set_userid', qq.openid,{root:true});
                }
            }
        },
    }
}
