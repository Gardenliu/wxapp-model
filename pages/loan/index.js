//获取应用实例
// import request from "../../utils/request";
import config from "../../etc/config";
import wxapp from "../../vendor/wxapp-client-sdk/index";
var app = getApp();var posting=false;
Page({
    data: {
        form:{
            name:'',
            code:'',
            mobile:'',
            money:'',
            status:null,
        },
        fix:null,
        fixImg:['../../vendor/assets/images/pic_out.png','../../vendor/assets/images/pic_wait.png','../../vendor/assets/images/pic_pass.png'],
        area:['中原区','二七区','管城区','金水区','郑东新区','高新区','经开区'],
        areaIdx:null,
        house:[
            {name:'无本地房产',value:0},
            {name:'有本地房产',value:1},
            {name:'有本地按揭房产',value:2},
        ],
        houseIdx:null,
        income:[
            {name:'5万以下',value:0},
            {name:'5-10万',value:1},
            {name:'10-20万',value:2},
            {name:'20-30万',value:3},
            {name:'30-50万',value:4},
            {name:'50万以上',value:5},
        ],
        incomeIdx:null,
    },
    onLoad:function(){
        var userInfo=app.globalData.userInfo;
        if(userInfo){
            this.setData({
                "form.name": userInfo.userName,
                "form.code": userInfo.code,
                "form.mobile": userInfo.mobile,
                "form.money": userInfo.money,
                "houseIdx": userInfo.house,
                "incomeIdx": userInfo.income,
                "form.status": parseInt(userInfo.status),
                "fix":userInfo.statusInfo
            })
        }
    },
    onEdit:function(){
        this.setData({
            "form.status":null
        })
    },
    callMobile:function(ev){
        let mobile=ev.target.dataset.mobile;
        wx.makePhoneCall({
            phoneNumber: mobile
        })
    },
    onSubmit:function(){
        let data=this.data;
        if(!data.form.name || !data.form.code || !data.form.mobile|| !data.form.money|| data.areaIdx===null|| data.houseIdx===null|| data.incomeIdx===null){
            wx.showModal({
                title: '提示',
                showCancel:false,
                content: '您有选项未填写',
            })
            return false;
        }
        let codeVer=/^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
        if(!codeVer.test(data.form.code)){
            wx.showModal({
                title: '提示',
                showCancel:false,
                content: '身份证填写格式有错误',
            })
            return false;
        }
        let mobileVer=/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
        if(!mobileVer.test(data.form.mobile)){
            wx.showModal({
                title: '提示',
                showCancel:false,
                content: '手机号码格式有错误',
            })
            return false;
        };
        if(posting) return false;
        posting=true;
        wx.showToast({
            title: '请求中..',
            icon: 'loading',
            duration: 10000
        });
        var form = this.formData(data);
        var that=this;
        let setStatus=!data.form.status?0:data.form.status;
        console.log('form',form)
        wxapp.request({
            url: config.service.loanUrl,
            header:{"Content-Type":"application/x-www-form-urlencoded"},
            method: 'POST',
            data:form,
            login: true,
            success(res){
                wx.hideToast();
                posting=false;
                if(res.data.success){
                    that.setData({
                        "form.status": setStatus,
                    })
                }else{
                    wx.showModal({
                        title: '提示',
                        showCancel:false,
                        content: res.data.message,
                    })
                }

            }
        });
    },
    formData:function(data){
        let areaidx=data.areaIdx;
        let form={
            userName:data.form.name,
            code:data.form.code,
            mobile:data.form.mobile,
            money:data.form.money,
            city:data.area[areaidx],
            house:data.houseIdx,
            income:data.incomeIdx,
        };
        return form;
    },
    nameInput:function(ev){
        var num=ev.detail.value;
        this.setData({
            "form.name": num
        })
    },
    codeInput:function(ev){
        var value=ev.detail.value;
        this.setData({
            "form.code": value
        })
    },
    moblieInput:function(ev){
        var value=ev.detail.value;
        this.setData({
            "form.mobile": value
        })
    },
    moneyInput:function(ev){
        var value=ev.detail.value;
        this.setData({
            "form.money": value
        })
    },
    areaChange: function(e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            areaIdx: e.detail.value
        })
    },
    houseChange: function(e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            houseIdx: e.detail.value
        })
    },
    incomeChange: function(e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            incomeIdx: e.detail.value
        })
    }
});
