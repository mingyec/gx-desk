import {storage} from '@/utils/storage'

const app = {
    state: {
        language: storage.get('lang') || 'zh',
        sidebar: {
            opened: ! + storage.get('sidebarStatus')
        },
        visitedViews: [],
        cachedViews: []
    },
    mutations: {
        SET_LANGUAGE: (state, language) => {
            state.language = language;
            storage.set('lang', language);
        },
        TOGGLE_SIDEBAR: state => {
            if(state.sidebar.opened) {
                storage.set('sidebarStatus', 1);
            }else {
                storage.set('sidebarStatus', 0);
            }
            state.sidebar.opened = !state.sidebar.opened;
        },
        ADD_VISITED_VIEWS: (state, view) => {
            if(state.visitedViews.some(v => v.path === view.path)) return;
            state.visitedViews.push({
                name: view.name,
                path: view.path,
                title: view.meta.title || 'no-name'
            })
            if(! view.meta.noCache) {
                state.cachedViews.push(view.name)
            }
        },
        DEL_VISITED_VIEWS: (state, view) => {
            for(const [i, v] of state.visitedViews.entries()) {
                if(v.path === view.path) {
                    state.visitedViews.splice(i, 1);
                    break;
                }
            }
            for(const i of state.cachedViews) {
                if(i === view.name) {
                    const index = state.cachedViews.indexOf(i);
                    state.cachedViews.splice(index, 1);
                    break;
                }
            }
        }
    },
    actions: {
        setLanguage({ commit }, language) {
            commit('SET_LANGUAGE',language)
        },
        toggleSideBar({ commit }) {
            commit('TOGGLE_SIDEBAR')
        },
        addVisitedViews({ commit, state }, view) {
            return new Promise((resolve) => {
                commit('ADD_VISITED_VIEWS', view);
                resolve([...state.visitedViews]);
            })
        },
        delVisitedViews({ commit, state }, view) {
            return new Promise((resolve) => {
                commit('DEL_VISITED_VIEWS', view);
                resolve([...state.visitedViews]);
            })
        }
    }
}

export default app
