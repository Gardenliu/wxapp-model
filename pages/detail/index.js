//获取应用实例
// import request from "../../utils/request";
import config from "../../etc/config";
import wxapp from "../../vendor/wxapp-client-sdk/index";
var WxParse = require('../../vendor/assets/plugins/RichTextArea/wxParse/wxParse.js');
var app = getApp();
Page({
    data: {
        detail:null
    },

    onLoad: function(opts) {
        console.log('页面id',opts.id)
        this.getInfo(opts.id);
        console.log(this.data.detail)
    },
    getInfo:function(id){
        var that = this;
        wx.showToast({
            title: '请求中..',
            icon: 'loading',
            duration: 10000
        });
        wxapp.request({
            url: config.service.detailUrl,
            method: 'GET',
            data:{id:id},
            login: true,
            success(res){
                wx.hideToast();
                if(!res.data.success){
                    wx.navigateBack({ delta: 1})
                }else{
                    that.setData({
                        detail: res.data.data
                    })
                    WxParse.wxParse('article', 'html', res.data.data.content, that, 0);
                }

            }
        });
    }
})
