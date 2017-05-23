//获取应用实例
// import request from "../../utils/request";
// import config from "../../etc/config";
import wxapp from "../../vendor/wxapp-client-sdk/index";
var app = getApp();
Page({
    data: {
        linkList:null
    },

    onLoad: function() {
        let that=this;
        app.getAppConfig(function(config){
            console.log('about-config',config)
            that.setData({
                linkList:config.linkList
            })
            console.log("选中的小区数据",that.data.area)
        });
    },
    onMap:function(ev){
        let pos=ev.currentTarget.dataset.pos;
        let address=ev.currentTarget.dataset.address;
        let title=ev.currentTarget.dataset.title;
        if(!pos){
            wx.showModal({
                title: '提示',
                content: '坐标位置未获取',
                showCancel:false,
                success: function(res) {
                    if (res.confirm) {
                        console.log('用户坐标',pos)
                    }
                }
            })
        }
        let post=pos.split(",");
        let latitude=post[0],longitude=post[1];
        wx.openLocation({
            latitude: latitude,
            longitude: longitude,
            scale: 28,
            name:title,
            address:address
        })
        /*wx.getLocation({
            type: 'wgs84',
            success: function(res) {
                var latitude = res.latitude;
                var longitude = res.longitude;
                wx.navigateTo({
                    url: '../map/car?pos='+pos+'&mylat='+latitude+'&mylong='+longitude
                })
            }
        })*/

    },
    callMobile:function(ev){
        let mobile=ev.target.dataset.mobile;
        wx.makePhoneCall({
            phoneNumber: mobile
        })
    }
})
