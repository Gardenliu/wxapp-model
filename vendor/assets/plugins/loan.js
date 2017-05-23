function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
//等额本息还款法
//original贷款金额
//yearratio年利率%，如年利率5.6%就为5.6
//year还款年限
    function Borrow(original,yearratio,year){
        year=parseInt(year);
        original=parseFloat(original);
        yearratio=parseFloat(yearratio);

        var timeSpan=year * 12;

        var active = yearratio * 10 / 12 * 0.001;

        var t1=Math.pow(1+active,timeSpan);
        var t2=t1-1;
        var tmp=t1/t2;

        var monthratio = active * tmp;

        var monthBack=original*monthratio;

        var totalBack=monthBack*timeSpan;

        var totalInterest=totalBack-original;

        //var monthInterest=totalInterest/timeSpan;

        totalInterest=(Math.round(totalInterest*100))/100;
        //monthInterest=(Math.round(monthInterest*10000))/10000;
        monthBack=(Math.round(monthBack*100))/100;
        totalBack=(Math.round(totalBack*100))/100;

        var objArray=[];
        objArray[0]=monthBack;
        objArray[1]=totalBack;
        objArray[2]=0;
        objArray[3]=totalInterest;

//alert(objArray);
        return objArray;
    }

//等额本息还款法
//original贷款金额
//yearratio年利率%，如年利率5.6%就为5.6
//year还款年限
    function Floan(lilv,loan,year){

        year=parseInt(year);
        lilv=parseFloat(lilv)/100;
        loan=parseFloat(loan)*10000;

        var everyMothlixi=loan*lilv/12;//每月利息
        var mothMoney=everyMothlixi*12;//年利息
        var countlixi=loan*lilv*year;//总利息
        var countMoney=countlixi+loan;//总还款
        var reback=[];
        reback[0]=Math.round(mothMoney*100)/100;
        reback[1]=Math.round(everyMothlixi*100)/100;
        reback[2]=Math.round(countlixi*100)/100;
        reback[3]=Math.round(countMoney*100)/100;
        return reback;
    }

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime,
	  Borrow:Borrow,
Floan:Floan
}
