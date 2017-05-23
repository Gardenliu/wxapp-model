
import wxapp from "../../vendor/wxapp-client-sdk/index";
var app = getApp();
Page({
    data: {
        bannerList: null,
        block: null,//区域值
        index:null,//aid 区域id
        area:null,
        unit:''
    },
    onLoad:function(){
        wx.showToast({
            title: '加载中...',
            icon: 'loading',
            duration: 2000
        })
        app.getAppConfig(function(config){
            wx.hideToast();
        });
    },
    onShow: function () {
        let that=this;
        app.getAppConfig(function(config){
            that.setData({
                area: config.indexArea,
                bannerList:config.bannerList,
                block:config.areaList,
            })
            console.log("选中的小区数据",that.data.area)
        });
    },
    //选择区域触发时间
    blockChange: function(e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            index: e.detail.value,
            area:null
        })
    },
    onSearch:function(){
        //./search
        var blockIndex=this.data.index;
        if(blockIndex==null){
            wx.showModal({
                title: '提示',
                showCancel:false,
                content: '请先选择所在区域',
            });
            return false;
        }
        wx.navigateTo({
            url: './search?aid='+blockIndex
        })
    },
    oninput:function(ev){
        var num=ev.detail.value;
        this.setData({
            unit: num
        })
    },
    onCast:function(){
        let data=this.data;
        if(!data.index){
            wx.showModal({
                title: '提示',
                showCancel:false,
                content: '请选择城市区域',
            });
            return false;
        }
        if(!data.area.hname){
            wx.showModal({
                title: '提示',
                showCancel:false,
                content: '请填写小区名称',
            });
            return false;
        }
        var patt=/^\d+(\.\d+)?$/;
        if(!patt.test(data.unit)){
            wx.showModal({
                title: '提示',
                showCancel:false,
                content: '请正确填写住宅面积',
            });
            return false;
        }
        let price=data.area.hprice;
        let unit=data.unit;
        let count=parseInt((price*unit)/10000);
        wx.setStorage({
            key:"houseCount",
            data:count
        })
        wx.navigateTo({
            url: './forecast?count='+count
        })
    },
    onShareAppMessage: function () {
        return {
            title: '郑州房产估值',
            desc: '让微信运营简单、专业，高效！',
            path: '/pages/index/index'
        }
    }
})
