const getters = {
    sidebar: state => state.app.sidebar,
    language: state => state.app.language,
    visitedViews: state => state.app.visitedViews,
    cachedViews: state => state.app.cachedViews
}

export default getters;
