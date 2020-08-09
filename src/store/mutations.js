import * as types from './mutation-types'

const mutations = {
    // [方法名](参数1,参数2...){方法}
    // [types.SET_OPEN_ID](state, v) {
    //     state.openId = v
    // },
    [types.USER_NEWS](state, datas) {
        state.userNews = datas
    },
    [types.GET_CLIP_IMG](state, datas) {
        state.clipImg = datas
    },
    [types.BANNER_LIST](state, datas) {
        state.bannerList = datas
    },
    [types.SEARCH_LIST_OBJ](state, datas) {
        state.searchListObj = datas
    },
    [types.GOODS_LIST](state, datas) {
        state.goodsList = datas
    },
    [types.STORE_LIST](state, datas) {
        state.storeList = datas
    },
    [types.GROUP_LIST](state, datas) {
        state.groupList = datas
    },

    [types.LIVE_LIST](state, datas) {
        state.liveList = datas
    },
    [types.LIVE_LIST_OBJ](state, datas) {
        state.liveListObj = datas
    },
    [types.GOODS_DETAILS](state, datas) {
        state.goodsDetails = datas
    },
    [types.STORE_DETAILS](state, datas) {
        state.storeDetails = datas
    },
    [types.JOIN_GROUP_RESULT](state, datas) {
        state.joinGroupResult = datas
    },
    [types.SHOP_GOODS_LIST](state, datas) {
        state.shopGoodsList = datas
    },
    [types.MY_GROUP_GOODS_LIST](state, datas) {
        state.myGroupGoodsList = datas
    },
    [types.LIVE_DETAILS](state, datas) {
        state.liveDetails = datas
    },
    [types.LIVE_BIND_GOODS](state, datas) {
        state.liveGoodsList = datas
    },

    [types.AI_TEST_TAGS](state, datas) {
        state.aiTestTagsList = datas
    },
    [types.AI_TAGS](state, datas) {
        state.aiTags = datas
    },
    [types.AI_TEST_DATAS](state, datas) {
        state.aiTestDatas = datas
    },
}

export default mutations;