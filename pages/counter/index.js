//获取应用实例
// import request from "../../utils/request";
import util from "../../vendor/assets/plugins/loan";
var app = getApp();

const years = []

for (let i = 1; i <= 10; i++) {
    let name=i+'年(循环贷)';
    let year={name:name,value:i}
    years.push(year)
}

Page({
    data: {
        years:years,
        yearIndex:null,
        tableIndex:null,
        lilv:null,
        loan:null,
        houseCount:null,
        scrollTop: 0,
        form:{
            monthBack:'00.00',//每月还款
            totalBack:'00.00',//每年利息
            decrease:'00.00',//总利息
            totalInterest:'00.00',//总金额
        },
        table:[
            {
                pledge:'<75%',
                data:[
                    {price:100,lilv:6.525},
                    {price:200,lilv:6.7425},
                    {price:300,lilv:6.96},
                ]
            },
            {
                pledge:'75%-85%',
                data:[
                    {price:100,lilv:6.7425},
                    {price:200,lilv:6.96},
                    {price:300,lilv:7.1775},
                ]
            },
            {
                pledge:'85%-90%',
                data:[
                    {price:100,lilv:6.96},
                    {price:200,lilv:7.1775},
                    {price:300,lilv:7.395},
                ]
            },
        ]
    },
    onShow:function(){
        let that=this;
        wx.getStorage({
            key: 'houseCount',
            success: function(res) {
                let houseCount=res.data;
                let num=parseInt(that.data.loan);//可能优质-改变目标
                let maxnum=parseInt(houseCount*0.9);//可能优质
                if(num && maxnum){
                    num=num>maxnum?maxnum:num;
                    let lilv=that._lvCount(houseCount,num);
                    that.setData({
                        houseCount: houseCount,
                        loan: num,
                        lilv:lilv,
                        'form.monthBack': '00.00',
                        'form.decrease':'00.00',
                        'form.totalBack':'00.00',
                        'form.totalInterest':'00.00',
                    })
                }else{
                    that.setData({
                        houseCount: houseCount,
                    })
                }
            }
        })
    },
    onLoan:function(){
        wx.switchTab({
            url: '../loan/index'
        })
    },
    //贷款年限
    yearChange:function(e){
        this.setData({
            yearIndex: e.detail.value
        })
    },
/*    //抵押率--删除
    pledgeChange:function(e){
        console.log('rate',e.detail.value)
        let lilv=this._lvCount(e.detail.value,this.data.loan);
        console.log(lilv)
        this.setData({
            tableIndex: e.detail.value,
            lilv:lilv
        })
    },*/
    onHoseCount:function(ev){
        var HoseCount=parseInt(ev.detail.value);
        this.setData({
            houseCount: HoseCount,
            tableIndex:null,
            lilv:null,
            loan:null
        })
    },
    //金额输入
    oninput:function(ev){
        var num=parseInt(ev.detail.value);
        var maxnum=parseInt(this.data.houseCount*0.9);
        if(isNaN(maxnum) && num>300){
            num=300;
        }
        if(!isNaN(maxnum) && num>maxnum || num>=300){
            num=maxnum>=300?300:maxnum;
        }
        if(num<0){
            num=0;
        }
        let lilv=this._lvCount(this.data.houseCount,num);
        this.setData({
            loan: num,
            lilv:lilv
        })
    },
    /**
     * 利率计算
     * @param pledgeIdx //抵押率索引 0-75%;1-75%~85%;2-85%~90%
     * @param loan //贷款金额 0-100万以下 1-100万~200万 2-200万~300万
     * return lilv利率
     */
    _lvCount:function(HoseCount,loan){
        if(!HoseCount || !loan){
            return false;
        }
        HoseCount=parseInt(HoseCount);
        loan=parseInt(loan);let lilv;
        //计算抵押率
        let pledgeIdx=function(){
            let gl=loan/HoseCount;
            console.log('gl',gl)
            if(gl>0.75 && gl<=0.85){
                return 1;
            }
            if(gl>0.85 && gl<=0.9){
                return 2;
            }
            return 0;
        }();
        //显示抵押率范围标示
        this.setData({
            tableIndex: pledgeIdx
        });
        //返回利率
        let table=this.data.table;
        let curData=table[pledgeIdx].data;
        switch (true){
            case (loan<=curData[0].price):
                lilv=curData[0].lilv;
                break;
            case (loan<=curData[1].price):
                lilv=curData[1].lilv;
                break;
            case (loan<=curData[2].price):
                lilv=curData[2].lilv;
                break;
        }
        return lilv;
    },
    //清空重置
    formReset:function(){
        console.log('reset触发')
        this.setData({
            loan: null,
            houseCount: null,
            yearIndex:null,
            tableIndex:null,
            lilv:null
        })
    },
    onCompute: function() {
        let data=this.data;

        if(!data.loan || !data.yearIndex || !data.houseCount){
            wx.showModal({
                title: '提示',
                showCancel:false,
                content: '您有选项未填写',
            })
            return false;
        }
        let dataRank=data.years[data.yearIndex].value;
        console.log('loan',data.lilv,data.loan,dataRank);
        let callback=util.Floan(data.lilv,data.loan,dataRank);
        wx.setStorage({
            key:"houseCount",
            data:data.houseCount
        })
        this.setData({
            'form.monthBack': callback[0],
            'form.decrease':callback[1],
            'form.totalBack':callback[2],
            'form.totalInterest':callback[3],
            scrollTop:0
        })
    },
});
