//store为实例化生成的
const state = {
    // openId:'初始openId'

    clipImg: '',  // 裁剪的图片

    userNews: {}, // 用户登录信息

    bannerList: [], // banner list

    goodsList: {
        goods_list: []
    }, // 首页 goods list

    storeList: {
        store_list: []
    }, // 首页门店列表

    searchListObj: {}, // 搜索列表

    groupList: {},  // 拼团列表

    liveList: [], // 直播列表
    liveListObj: {}, // 直播列表对象

    goodsDetails: {},  // 商品详情

    storeDetails: {}, // 店铺信息

    joinGroupResult: {}, // 参团结果

    shopGoodsList: [], // 店铺商品列表

    myGroupGoodsList: [], // 我的拼团列表

    liveDetails: {},  // 直播间详情
    liveGoodsList: [], // 直播间商品


    aiTestTagsList: [],  // 测一测标签
    aiTags: [],

    aiTestDatas: {},  // ai检测完的数据
    
}

export default state;