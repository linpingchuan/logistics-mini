import * as types from './mutation-types'

import * as api from '@/http/api'

// 进行涉及到多个全局变量的复杂计算

// export const setOpenId = ({ commit }, { id }) => {
//     commit(types.OPEN_ID, id)
// }
export default {
    // setOpenId: ({ commit }, { id }) => commit(openId, id)

    getUserNews:({ commit }, palyload) => {
        return api.login(palyload).then(res => {
            wx.setStorageSync('userInfosObj', res.data)
            commit(types.USER_NEWS, res.data)
            return res
        })
    },

    getBannerList: ({ commit }, palyload) => {
        return api.bannerList(palyload).then(res => {
            commit(types.BANNER_LIST, res.data)
            return res
        })
    },

    getSearchList: ({ commit }, palyload) => {
        return api.searchList(palyload).then(res => {
            if (res.retcode == 0) {
                commit(types.SEARCH_LIST_OBJ, res.data)
            }
            return res
        })
    },

    getGoodsList: ({ commit }, palyload) => {
        return api.goodsList(palyload).then(res => {
            if (res.retcode == 0) {
                commit(types.GOODS_LIST, res.data)
            }
            return res
        })
    },
    getStoreList: ({ commit }, palyload) => {
        return api.storeList(palyload).then(res => {
            if (res.retcode == 0) {
                commit(types.STORE_LIST, res.data)
            }
            return res
        })
    },

    getGroupList: ({ commit }, palyload) => {
        return api.groupList(palyload).then(res => {
            if (res.retcode == 0) {
                commit(types.GROUP_LIST, res.data)
            }
            return res
        })
    },
    getliveList: ({ commit }, palyload) => {
        return api.liveList(palyload).then(res => {
            if (res.retcode == 0) {
                commit(types.LIVE_LIST, res.data.live_list)
                commit(types.LIVE_LIST_OBJ, res.data)
            }
            return res
        })
    },
    getGoodsDetails: ({ commit }, palyload) => {
        commit(types.GOODS_DETAILS, {})  // 先清空数据
        return api.goodsDetails(palyload).then(res => {
            if (res.retcode == 0) {
                commit(types.GOODS_DETAILS, res.data)
            }
            return res
        })
    },
    getStoreDetails: ({ commit }, palyload) => {
        return api.storeDetails(palyload).then(res => {
            if (res.retcode == 0) {
                commit(types.STORE_DETAILS, res.data)
            }
            return res
        })
    },
    joinGroup: ({ commit }, palyload) => {
        return api.joinGroup(palyload).then(res => {
            if (res.retcode != 0 && res.retcode != 20022202) {
                return false
            }
            commit(types.JOIN_GROUP_RESULT, res.data)
            return res
        })
    },
    getShopGoodsList: ({ commit }, palyload) => {
        return api.shopGoodsList(palyload).then(res => {
            if (res.retcode == 0) {
                commit(types.SHOP_GOODS_LIST, res.data)
            }
            return res
        })
    },
    getMyGroupGoodsList: ({ commit }, palyload) => {
        return api.myGroupGoodsList(palyload).then(res => {
            if (res.retcode == 0) {
                commit(types.MY_GROUP_GOODS_LIST, res.data)
            }
            return res
        })
    },
    getPhoneCode: ({ commit }, palyload) => {
        return api.getCode(palyload).then(res => {
            return res
        })
    },
    bindUserPhone: ({ commit }, palyload) => {
        return api.bindPhone(palyload).then(res => {
            return res
        })
    },
    getLiveDetails: ({ commit }, palyload) => {
        return api.liveDetails(palyload).then(res => {
            if (res.retcode == 0) {
                commit(types.LIVE_DETAILS, res.data)
            }
            return res
        })
    },
    liveShareNum: ({ commit }, palyload) => {
        return api.liveShareStatistics(palyload).then(res => {
            return res
        })
    },
    getLiveBindGoods: ({ commit }, palyload) => {
        return api.liveBindGoods(palyload).then(res => {
            if (res.retcode == 0) {
                commit(types.LIVE_BIND_GOODS, res.data)
            }
            return res
        })
    },

    getAiTestTags: ({ commit }, palyload) => {
        return api.aiTestTags(palyload).then(res => {
            if (res.retcode == 0) {
                for (let val of res.data) {
                    val.isChoose = false
                }
                commit(types.AI_TEST_TAGS, res.data)
            }
            return res
        })
    },
    getAiTestDatas: ({ commit }, palyload) => {
        return api.aiTest(palyload).then(res => {
            if (res.retcode == 0) {
                commit(types.AI_TEST_DATAS, res.data)
            }
            return res
        })
    },

}