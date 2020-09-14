import {
    Remark
} from '../../models/remark.js';
Page({

    data: {
        authorized: false,
        userInfo: null,
        isShowRemark: false
    },

    onLoad: function (options) {
        this.userAuthorized()
        this.initRemark()
    },

    /**
     * 调用检测是否登录的API
     */
    userAuthorized() {
        wx.getSetting({
            success: data => {
                if (data.authSetting['scope.userInfo']) {
                    // 判断已登录，调用getUserInfo获取用户信息，并将授权状态更改为true
                    wx.getUserInfo({
                        success: data => {
                            this.setData({
                                authorized: true,
                                userInfo: data.userInfo
                            })
                        }
                    })
                }
            }
        })
    },

    onGetUserInfo(event) {
        // 页面获取用户数据
        const userInfo = event.detail.userInfo
        //授权时拒绝情况不报错
        if (userInfo) {
            this.setData({
                userInfo,
                authorized: true
            })
        };
    },

    async initRemark() {
        const remark = await Remark.getRemark()
        if(remark) {
            this.setData({
                remark,
                isShowRemark: true
            })
        }

    }

})