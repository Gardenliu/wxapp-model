//获取应用实例
// import request from "../../utils/request";
import config from "../../etc/config";
import wxapp from "../../vendor/wxapp-client-sdk/index";
var app = getApp();
Page({
    data: {
        bannerList:app.globalData.bannerList,
        count:null,
        loanNum:null
    },
    onLoad:function(opt){
        let loanlv=0.80;
        let loanNum=parseInt(loanlv*opt.count*100)/100;
        this.setData({
            count: opt.count,
            loanNum:loanNum
        })
    }
});
