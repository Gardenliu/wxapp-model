//获取应用实例
//logs.js
import amapFile from "../../vendor/assets/plugins/amap-wx.js";
import config from "../../etc/config";
import wxapp from "../../vendor/wxapp-client-sdk/index";
var app = getApp();
Page({
    data: {
        tips: {},
        aid:''
    },
    onLoad: function(opt){
        let aid=opt.aid;//区域值
        this.setData({
            aid:aid
        });
        console.log("区域索引值",this.data.aid)
    },
    bindInput: function(e){
        var that = this;
        var keyword = e.detail.value;
        console.log("发送值",{aid:that.data.aid,keyword:keyword})
        wxapp.request({
            url: config.service.searchUrl,
            method: 'GET',
            data:{aid:that.data.aid,keyword:keyword},
            login: true,
            success(res){
                if (res.data.success) {
                    console.log('返回房产的数据',res.data.data)
                    that.setData({
                        tips: res.data.data
                    });
                }
            }
        });
        /*var myAmapFun = new amapFile.AMapWX({key: config.service.gdKey});
        myAmapFun.getInputtips({
            keywords: keywords,
            type:190403,
            city: '郑州',
            success: function(data){
                if(data && data.tips){
                    that.setData({
                        tips: data.tips
                    });
                }
            }
        })*/
    },
    bindSearch: function(e){
        let keywords = e.currentTarget.dataset.keywords;
        let house_price = e.currentTarget.dataset.price;
        console.log("选中的小区",keywords)
        console.log("选中的小区",house_price)
        app.globalData.indexArea.hname=keywords;
        app.globalData.indexArea.hprice=house_price;
        wx.switchTab({
            url: './index'
        })
    }
})

