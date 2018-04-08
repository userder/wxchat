// pages/writeMsg/writeMsg.js
var common = require('../../utils/common.js');
var userToken = '',orderId = '';
var inputTimeout = null;
var massage = {
  own:{'name':'','sex':'男','phone':'','address':'','marry':'未婚'},
  jobMsg: { 'jobName': '', 'jobAddress': '', 'jobTime': '', 'job': '','income': '','jobType':'工薪人士'},
  house: '无',
  car: '无',
  card: '无',
  otherMsg: { 
    'kids': '', 'haveDriv': 1,
    onelinkman: { 'name': '', 'relation': '', 'phone': '' },//第一联系人
    twolinkman: { 'name': '', 'relation': '', 'phone': '' },//第二联系人
    threelinkman: { 'name': '', 'relation': '', 'phone': '' },//第三联系人
  },
}
Page({
  /**
   * 页面的初始数据
   */
  data: {
    err: false,errTxt:'',
    name: false,
    pageone: true,//默认第一个资料填写页面显示
    sexTxt: '男', sexDropdown: false, sexlistTxt: '女',
    marryTxt: '未婚', marryDropdown: false, marryList: ['已婚', '离异', '丧偶'],
    date: '',//选择入职时间
    jobTypeTxt: '工薪人士', jobTypeDropdown: false, jobTime:'请选择入职时间', jobTypeList: '自雇人士',//工作类型
    companyTxt: '25人以内', companyDropdown: false, companyList: ['25-50人', '50 - 100人', '100人以上'], companyMony:'',//公司规模
    houseTxt: '无', houseDropdown: false, houseList: '有',//房贷贷相关
    housebankValue: '请选择银行',array: ['中国银行', '中国工商银行', '中国建设银行', '中国农业银行', '中国邮政储蓄银行', '中国招商银行', '民生银行', '兴业银行', '浦发银行'], houseBankindex: -1, carBankindex:-1,cardBankindex:-1,
    carTxt: '无', carDropdown: false, carList: '有', carbankValue: '请选择银行',//车贷贷相关
    cardTxt: '无', cardDropdown: false, cardList: '有', cardbankValue: '请选择银行',//信用卡相关
    driverTxt: '无', driverDropdown: false, driverList: '有',//驾照相关
    onelinkmanTxt: '未填', oneDropdown: false,//第一联系人
    twolinkmanTxt: '未填', twoDropdown: false,//第二联系人
    threelinkmanTxt: '未填', threeDropdown: false,//第三联系人
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getStorage({
      key: 'isLogin',
      success: function(res) {
        userToken = res.data.token;
      },
    })
    if(options.orderId==undefined){
      orderId = 33
    }else{
      orderId = options.orderId;
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this;
    massage = {
      own: { 'name': '', 'sex': '男', 'phone': '', 'address': '', 'marry': '未婚' },
      jobMsg: { 'jobName': '', 'jobAddress': '', 'jobTime': '', 'job': '', 'income': '', 'jobType': '工薪人士' },
      house: '无',
      car: '无',
      card: '无',
      otherMsg: {
        'kids': '', 'haveDriv': 1,
        onelinkman: { 'name': '', 'relation': '', 'phone': '' },//第一联系人
        twolinkman: { 'name': '', 'relation': '', 'phone': '' },//第二联系人
        threelinkman: { 'name': '', 'relation': '', 'phone': '' },//第三联系人
      },
    }
    //用户中途退出把信息缓存在本地
    wx.getStorage({
      key: 'massage',
      success: function(res) {
        var storageMsg = res.data;
        if (storageMsg.jobMsg.jobTime==''){
          that.setData({
            jobTime: '请选择入职时间'
          })
        }else{
          that.setData({
            jobTime: storageMsg.jobMsg.jobTime,//入职时间
          })
        }
        if (storageMsg.otherMsg.haveDriv==0){
          that.setData({
            driverTxt: '有',//有无驾照
          })
        }else{
          that.setData({
            driverTxt: '无',//有无驾照
          })
        }
          
        that.setData({
          ownnameValue: storageMsg.own.name,
          sexTxt: storageMsg.own.sex,
          ownphoneValue: storageMsg.own.phone,
          ownaddressValue: storageMsg.own.address,
          marryTxt: storageMsg.own.marry,//婚姻状况
          jobnameValue: storageMsg.jobMsg.jobName,//单位名称
          jobaddressValue: storageMsg.jobMsg.jobAddress,//单位地址
          jobValue: storageMsg.jobMsg.job,//职位
          jobincomeValue: storageMsg.jobMsg.income,//年收入
          jobTypeTxt: storageMsg.jobMsg.jobType,//工作类型
          
          houseTxt: storageMsg.house,//有无房贷
          carTxt: storageMsg.car,//有无车贷
          cardTxt: storageMsg.card,//有无信用卡
          kidsnumValue: storageMsg.otherMsg.kids,//小孩个数
          // driverTxt: storageMsg.otherMsg.haveDriv,//有无驾照
          onenameValue: storageMsg.otherMsg.onelinkman.name,
          onerelationValue: storageMsg.otherMsg.onelinkman.relation,
          onephoneValue: storageMsg.otherMsg.onelinkman.phone,
          twonameValue: storageMsg.otherMsg.twolinkman.name,
          tworelationValue: storageMsg.otherMsg.twolinkman.relation,
          twophoneValue: storageMsg.otherMsg.twolinkman.phone,
          threenameValue: storageMsg.otherMsg.threelinkman.name,
          threerelationValue: storageMsg.otherMsg.threelinkman.relation,
          threephoneValue: storageMsg.otherMsg.threelinkman.phone,
        })
        if (that.data.marryTxt=="已婚"){
          that.setData({
            marryName: storageMsg.marryMsg.spouseName,
            marryPhone: storageMsg.marryMsg.spousePhone
          })
        }
        if (that.data.jobTypeTxt=="自雇人士"){
          that.setData({
            companyTxt: storageMsg.company.guimo,
            companyMony: storageMsg.company.mony,
          })
        }else{
          delete massage.company
        }
        // 选择婚姻状况下拉文字后，下拉列表中不在有这个字段
        var marryList = that.data.marryList;
        var marryTxt = that.data.marryTxt;
        for(var i=0;i<marryList.length;++i){
          if (marryList[i] == marryTxt){
            marryList[i]='未婚';
          }
        }
        that.setData({
          marryList: marryList
        })
        // 选择工作类型下拉文字后，下拉列表中不在有这个字段
        var jobTypeList = that.data.jobTypeList;
        var jobTypeTxt = that.data.jobTypeTxt;
        if (jobTypeList == jobTypeTxt) {
          jobTypeList = '工薪人士';
        }
        that.setData({
          jobTypeList: jobTypeList
        })
        // 选择公司规模下拉文字后，下拉列表中不在有这个字段
        var companyList = that.data.companyList;
        var companyTxt = that.data.companyTxt;
        for (var i = 0; i < marryList.length; ++i) {
          if (companyList[i] == companyTxt) {
            companyList[i] = '25人以内';
          }
        }
        that.setData({
          companyList: companyList
        })
        //有无房贷
        if (storageMsg.house=="有"){
          if (storageMsg.houseDetail.houseBank==''){
            storageMsg.houseDetail.houseBank='请选择银行';
          }
          that.setData({
            housemonyValue: storageMsg.houseDetail.houseAll,
            housebankValue: storageMsg.houseDetail.houseBank,
            housemouthValue: storageMsg.houseDetail.houseMouth,
            housetimeValue: storageMsg.houseDetail.houseTime
          })
        }else{
          that.setData({
            housebankValue: '请选择银行',
          })
          delete storageMsg.houseDetail;
        }
        //有无车贷
        if (storageMsg.car == "有") {
          if (storageMsg.carDetail.carBank == '') {
            storageMsg.carDetail.carBank = '请选择银行';
          }
          that.setData({
            carmonyValue: storageMsg.carDetail.carAll,
            carbankValue: storageMsg.carDetail.carBank,
            carmouthValue: storageMsg.carDetail.carMouth,
            cartimeValue: storageMsg.carDetail.carTime
          })
        } else {
          that.setData({
            carbankValue: '请选择银行',
          })
          delete storageMsg.carDetail;
        }
        //有无信用卡
        if (storageMsg.card == "有") {
          if (storageMsg.cardDetail.cardBank == '') {
            storageMsg.cardDetail.cardBank = '请选择银行';
          }
          that.setData({
            cardmonyValue: storageMsg.cardDetail.cardAll,
            cardbankValue: storageMsg.cardDetail.cardBank,
          })
        } else {
          that.setData({
            cardbankValue: '请选择银行',
          })
          delete storageMsg.cardDetail;
        }
        var $onelinkman = storageMsg.otherMsg.onelinkman;
        if ($onelinkman.name!=''&&$onelinkman.relation!=''&&$onelinkman.phone!=''){
          that.setData({
            onelinkmanTxt: '已填'
          })
        }
        var $twolinkman = storageMsg.otherMsg.twolinkman;
        if ($twolinkman.name != '' && $twolinkman.relation != '' && $twolinkman.phone != '') {
          that.setData({
            twolinkmanTxt: '已填'
          })
        }
        var $threelinkman = storageMsg.otherMsg.threelinkman;
        if ($threelinkman.name != '' && $threelinkman.relation != '' && $threelinkman.phone != '') {
          that.setData({
            threelinkmanTxt: '已填'
          })
        }
        //**** */
        massage = storageMsg;
        console.log(massage)
      },
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    wx.setStorage({
      key: 'massage',
      data: massage,
      success:function(res){
        console.log(res)
      }
    })
  },
  lintFunction: function (inputvalue,errtxt) {//输入框为空的情况顶部警告提醒
    var that = this;
    if (inputvalue==''){
      that.setData({
        err: true,
        errTxt: errtxt
      })
      inputTimeout = setTimeout(function () { that.setData({ err: false, }); }, 2000)
    }
  },
  jsonmsg: function (obj, content) {//判断每个版块主题内容是否填写完毕，并弹框提示
    var that = this;
    for (var prop in obj) {
      // console.log("jsonObj[" + prop + "]=" + jsonObj[prop]);
      if (obj[prop] == '') {
        wx.showModal({
          title: '温馨提示',
          content: content,
          showCancel: false,
          confirmText: '知道了',
          confirmColor: '#4182FF',
        })
        return false;
      }
    }
  },
  $json:function(obj){//判断整个页面是否填写完毕，（决定是否跳转页面）
    var that = this;
    for (var prop in obj) {
      if (obj[prop] == '') {
        return false;
      }
    }
  },
  // 个人信息
  bindname:function(e){
    var that = this;
    var textValue = e.detail.value;
    massage.own.name = textValue;
    that.lintFunction(textValue,'请输入姓名');
  },
  bindphone:function(e){
    var that = this;
    var textValue = e.detail.value;
    massage.own.phone = textValue;
    that.lintFunction(textValue, '请输入联系电话');
  },
  bindaddress: function (e) {
    var that = this;
    var textValue = e.detail.value;
    massage.own.address = textValue;
    that.lintFunction(textValue, '请输入您的地址');
  },
  // 配偶信息
  bindspouseName: function (e) {
    var that = this;
    var textValue = e.detail.value;
    massage.marryMsg.spouseName = textValue;
    that.lintFunction(textValue, '请输入配偶姓名');
  },
  bindspousePhone: function (e) {
    var that = this;
    var textValue = e.detail.value;
    massage.marryMsg.spousePhone = textValue;
    that.lintFunction(textValue, '请输入配偶电话');
  },
  // 职业信息
  bindjobName:function(e){
    var that = this;
    var textValue = e.detail.value;
    massage.jobMsg.jobName = textValue;
    that.lintFunction(textValue, '请输入单位名称');
  },
  bindjobAddress: function (e) {
    var that = this;
    var textValue = e.detail.value;
    massage.jobMsg.jobAddress = textValue;
    that.lintFunction(textValue, '请输入单位地址');
  },
  bindjob: function (e) {
    var that = this;
    var textValue = e.detail.value;
    massage.jobMsg.job = textValue;
    that.lintFunction(textValue, '请输入您的职位');
  },
  bindjobIncome: function (e) {
    var that = this;
    var textValue = e.detail.value;
    massage.jobMsg.income = textValue;
    that.lintFunction(textValue, '请输入您的年收入');
  },
  bindmony:function(e){//公司规模
    var that = this;
    var textValue = e.detail.value;
    massage.company.mony = textValue;
    that.lintFunction(textValue, '请输入公司注册资金');
  },
  //贷款信息***********************************************************验证框是否输入
  //房贷
  bindhouseAll:function(e){
    var that = this;
    var textValue = e.detail.value;
    massage.houseDetail.houseAll = textValue;
    that.lintFunction(textValue, '请输入房贷金额');
  },
  bindhouseMouth: function (e) {
    var that = this;
    var textValue = e.detail.value;
    massage.houseDetail.houseMouth = textValue;
    that.lintFunction(textValue, '请输入房贷月供');
  },
  bindhouseTime: function (e) {
    var that = this;
    var textValue = e.detail.value;
    massage.houseDetail.houseTime = textValue;
    that.lintFunction(textValue, '请输入房贷期限');
  },
  //车贷
  bindcarAll: function (e) {
    var that = this;
    var textValue = e.detail.value;
    massage.carDetail.carAll = textValue;
    that.lintFunction(textValue, '请输入车贷金额');
  },
  bindcarMouth: function (e) {
    var that = this;
    var textValue = e.detail.value;
    massage.carDetail.carMouth = textValue;
    that.lintFunction(textValue, '请输入车贷月供');
  },
  bindcarTime: function (e) {
    var that = this;
    var textValue = e.detail.value;
    massage.carDetail.carTime = textValue;
    that.lintFunction(textValue, '请输入房贷期限');
  },
  //信用卡
  bindcardAll: function (e) {
    var that = this;
    var textValue = e.detail.value;
    massage.cardDetail.cardAll = textValue;
    that.lintFunction(textValue, '请输入信用卡贷款金额');
  },
  bindcardMouth: function (e) {
    var that = this;
    var textValue = e.detail.value;
    massage.cardDetail.cardMouth = textValue;
    that.lintFunction(textValue, '请输入房贷月供');
  },
  bindcardTime: function (e) {
    var that = this;
    var textValue = e.detail.value;
    massage.cardDetail.cardTime = textValue;
    that.lintFunction(textValue, '请输入房贷期限');
  },
  // 其他信息****************************************************************其他信息
  bindkids: function (e) {//小孩个数填写
    var that = this;
    var textValue = e.detail.value;
    massage.otherMsg.kids = textValue;
    that.lintFunction(textValue, '请输入小孩个数');
  },
  oneLinkmanType:function(){//第一联系人三个输入框是否填写完毕
    var that = this;
    var oneJson = massage.otherMsg.onelinkman;
    if (oneJson.name != '' && oneJson.relation != '' && oneJson.phone != '') {
      that.setData({
        onelinkmanTxt: '已填'
      })
    } else {
      that.setData({
        onelinkmanTxt: '未填'
      })
    }
  },
  twoLinkmanType: function () {//第二联系人三个输入框是否填写完毕
    var that = this;
    var twoJson = massage.otherMsg.twolinkman;
    if (twoJson.name != '' && twoJson.relation != '' && twoJson.phone != '') {
      that.setData({
        twolinkmanTxt: '已填'
      })
    } else {
      that.setData({
        twolinkmanTxt: '未填'
      })
    }
  },
  threeLinkmanType: function () {//第三联系人三个输入框是否填写完毕
    var that = this;
    var threeJson = massage.otherMsg.threelinkman;
    if (threeJson.name != '' && threeJson.relation != '' && threeJson.phone != '') {
      that.setData({
        threelinkmanTxt: '已填'
      })
    } else {
      that.setData({
        threelinkmanTxt: '未填'
      })
    }
  },
  //第一联系人填写
  bindonelinkmanName: function (e) {
    var that = this;
    var textValue = e.detail.value;
    massage.otherMsg.onelinkman.name = textValue;
    that.lintFunction(textValue, '请输入联系人姓名');
    that.setData({
      onenameValue: textValue
    })
    that.oneLinkmanType();
  },
  bindonelinkmanRelation: function (e) {
    var that = this;
    var textValue = e.detail.value;
    massage.otherMsg.onelinkman.relation = textValue;
    that.lintFunction(textValue, '请输入你们的关系');
    that.setData({
      onerelationValue: textValue
    })
    that.oneLinkmanType();
  },
  bindonelinkmanPhone: function (e) {
    var that = this;
    var textValue = e.detail.value;
    massage.otherMsg.onelinkman.phone = textValue;
    that.lintFunction(textValue, '请输入联系人电话');
    that.setData({
      onephoneValue: textValue
    })
    that.oneLinkmanType();
  },
  //第二联系人填写
  bindtwolinkmanName: function (e) {
    var that = this;
    var textValue = e.detail.value;
    massage.otherMsg.twolinkman.name = textValue;
    that.lintFunction(textValue, '请输入联系人姓名');
    that.setData({
      twonameValue: textValue
    })
    that.twoLinkmanType();
  },
  bindtwolinkmanRelation: function (e) {
    var that = this;
    var textValue = e.detail.value;
    massage.otherMsg.twolinkman.relation = textValue;
    that.lintFunction(textValue, '请输入你们的关系');
    that.setData({
      tworelationValue: textValue
    })
    that.twoLinkmanType();
  },
  bindtwolinkmanPhone: function (e) {
    var that = this;
    var textValue = e.detail.value;
    massage.otherMsg.twolinkman.phone = textValue;
    that.lintFunction(textValue, '请输入联系人电话');
    that.setData({
      twophoneValue: textValue
    })
    that.twoLinkmanType();
  },
  //第三联系人填写
  bindthreelinkmanName: function (e) {
    var that = this;
    var textValue = e.detail.value;
    massage.otherMsg.threelinkman.name = textValue;
    that.lintFunction(textValue, '请输入联系人姓名');
    that.setData({
      threenameValue: textValue
    })
    that.threeLinkmanType();
  },
  bindthreelinkmanRelation: function (e) {
    var that = this;
    var textValue = e.detail.value;
    massage.otherMsg.threelinkman.relation = textValue;
    that.lintFunction(textValue, '请输入你们的关系');
    that.setData({
      threerelationValue: textValue
    })
    that.threeLinkmanType();
  },
  bindthreelinkmanPhone: function (e) {
    var that = this;
    var textValue = e.detail.value;
    massage.otherMsg.threelinkman.phone = textValue;
    that.lintFunction(textValue, '请输入联系人电话');
    that.setData({
      threephoneValue: textValue
    })
    that.threeLinkmanType();
  },


  // 个人性别选择
  sex:function(){
    var that = this;
    if (that.data.sexTxt == '男') {
      this.setData({
        sexlistTxt: '女'
      })
    } else {
      this.setData({
        sexlistTxt: '男'
      })
    }
    this.setData({
      sexDropdown: !that.data.sexDropdown
    })
  },
  sexList:function(e){//性别选择列表
    var that = this;
    var text = e.currentTarget.dataset.id;
    this.setData({
      sexDropdown: false,
      sexTxt: text,
    })
    massage.own.sex = text;
  },
  // 配偶信息
  marry:function(){
    var that = this;
    var marryTxt = that.data.marryTxt;
    massage.own.marry = marryTxt;
    
    that.setData({
      marryDropdown: !that.data.marryDropdown
    })
  },
  marryList: function(e){//配偶信息性别选择列表
    var that = this;
    var marryList = that.data.marryList;
    var id = e.currentTarget.id;
    var text = e.currentTarget.dataset.id;
    if(text=="已婚"){
      massage.marryMsg = { 'spouseName': '', 'spouseSex': '', 'spousePhone':''};
      if(that.data.sexTxt=="男"){
        massage.marryMsg.spouseSex = '女';
      }else{
        massage.marryMsg.spouseSex = '男';
      }
    }else{
      delete massage.marryMsg
    }
    that.setData({
      marryDropdown: false,
      marryTxt: text
    })
    marryList[id] = massage.own.marry;
    that.setData({
      marryList: marryList
    })
    massage.own.marry = text;
  },
  dateSelect:function(e){//选择入职时间
    console.log(e);
    var that = this;
    that.setData({
      date: e.detail.value
    })
    massage.jobMsg.jobTime = e.detail.value;
  },
  // 职业信息选择
  jobType:function(){
    var that = this;
    
    if (that.data.jobTypeTxt == '工薪人士') {
      this.setData({
        jobTypeList: '自雇人士'
      })
    } else {
      this.setData({
        jobTypeList: '工薪人士'
      })
    }
    this.setData({
      jobTypeDropdown: !that.data.jobTypeDropdown
    })
  },
  jobTypeList:function(e){
    var text = e.currentTarget.dataset.id;
    if(text=="自雇人士"){
      massage.company = { 'guimo': '25人以内' , 'mony': ''};
    }else{
      delete massage.company;
    }
    this.setData({
      jobTypeDropdown: false,
      jobTypeTxt: text,
    })
    massage.jobMsg.jobType = text;
  },
  //公司规模
  company:function(){
    var that = this;
    var companyTxt = that.data.companyTxt;
    // massage.company = { 'guimo': companyTxt,'mony':''};
    massage.company.guimo = companyTxt;
    that.setData({
      companyDropdown: !that.data.companyDropdown
    })
  },
  companyList: function (e) {
    var that = this;
    var companyList = that.data.companyList;
    var id = e.currentTarget.id;
    var text = e.currentTarget.dataset.id;
    that.setData({
      companyDropdown: false,
      companyTxt: text
    })
    companyList[id] = massage.company.guimo;
    that.setData({
      companyList: companyList
    })
    massage.company.guimo = text;
  },
  //pageone 点击下一步
  next:function(){
    var that = this;
    console.log(massage)
    var ownObj = massage.own;//个人信息
    var jobObj = massage.jobMsg;//职业信息
    var marryObj = massage.marryMsg;//配偶信息
    var companyObj = massage.company;//公司规模
    // console.log('ownObj' + that.$json(ownObj))
    // console.log('jobObj' + that.$json(jobObj))
    // console.log('marryObj' + that.$json(marryObj))
    // console.log('companyObj' + that.$json(companyObj))
    if (that.$json(ownObj) == false || that.$json(marryObj) == false || that.$json(jobObj) == false || that.$json(companyObj) == false) {
      pageoneMsg();
    } else {
      that.setData({
        pageone: false
      })
    }
    function pageoneMsg(){
      that.jsonmsg(ownObj, '个人信息填写不完整');
      that.jsonmsg(jobObj, '职业信息填写不完整');
      if (marryObj != undefined) {
        that.jsonmsg(marryObj, '配偶信息填写不完整');
      }
      if (companyObj != undefined) {
        that.jsonmsg(companyObj, '公司规模信息填写不完整');
      }
    }  
  },
  // 贷款信息有无房贷选择**************************************************************************第二页点击收起展开
  house:function(){
    var that = this;
    var houseTxt = that.data.houseTxt;
    if (houseTxt=='无'){
      that.setData({
        houseList: '有'
      })
    }else{
      that.setData({
        houseList: '无'
      })
      
    }
    that.setData({
      houseDropdown: !that.data.houseDropdown
    })
  },
  houseList:function(e){
    var that = this;
    var text = e.currentTarget.dataset.id;
    if(text=="有"){
      massage.houseDetail = { 'houseBank': '', 'houseAll': '', 'houseMouth': '', 'houseTime': '' };
    }else{
      delete massage.houseDetail;
    }
    that.setData({
      houseTxt: text,
      houseDropdown: false
    })
    massage.house = text;
  },
  houseBank:function(e){
    console.log(e)
    var that = this;
    var arr = that.data.array;
    console.log(massage.houseDetail.houseBank)
    massage.houseDetail.houseBank = arr[e.detail.value];
    this.setData({
      houseBankindex: e.detail.value,
    })
  },
  // 贷款信息有无车贷选择
  car: function () {
    var that = this;
    var carTxt = that.data.carTxt;
    if (carTxt == '无') {
      that.setData({
        carList: '有'
      })
    } else {
      that.setData({
        carList: '无'
      })

    }
    that.setData({
      carDropdown: !that.data.carDropdown
    })
  },
  carList: function (e) {
    var that = this;
    var text = e.currentTarget.dataset.id;
    if (text == "有") {
      massage.carDetail = { 'carBank': '', 'carAll': '', 'carMouth': '', 'carTime': '' };
    } else {
      delete massage.carDetail;
    }
    that.setData({
      carTxt: text,
      carDropdown: false
    })
    massage.car = text;
  },
  carBank: function (e) {
    console.log(e)
    var that = this;
    var arr = that.data.array;
    console.log(massage.carDetail.carBank)
    massage.carDetail.carBank = arr[e.detail.value];
    this.setData({
      carBankindex: e.detail.value,
    })
  },
  // 贷款信息有无信用卡选择
  card: function () {
    var that = this;
    var cardTxt = that.data.cardTxt;
    if (cardTxt == '无') {
      that.setData({
        cardList: '有'
      })
    } else {
      that.setData({
        cardList: '无'
      })
    }
    that.setData({
      cardDropdown: !that.data.cardDropdown
    })
  },
  cardList: function (e) {
    var that = this;
    var text = e.currentTarget.dataset.id;
    if (text == "有") {
      massage.cardDetail = { 'cardBank': '', 'cardAll': ''};
    } else {
      delete massage.cardDetail;
    }
    that.setData({
      cardTxt: text,
      cardDropdown: false
    })
    massage.card = text;
  },
  cardBank: function (e) {
    console.log(e)
    var that = this;
    var arr = that.data.array;
    massage.cardDetail.cardBank = arr[e.detail.value];
    this.setData({
      cardBankindex: e.detail.value,
    })
  },
  // 有无驾照选择点击收起展开
  driver: function () {
    var that = this;
    var driverTxt = that.data.driverTxt;
    if (driverTxt == '无') {
      that.setData({
        driverList: '有'
      })
    } else {
      that.setData({
        driverList: '无'
      })
    }
    that.setData({
      driverDropdown: !that.data.driverDropdown
    })
  },
  driverList: function (e) {
    var that = this;
    var text = e.currentTarget.dataset.id;
    
    that.setData({
      driverTxt: text,
      driverDropdown: false
    })
    if (text == '有') {
      massage.otherMsg.haveDriv = 0;
    } else {
      massage.otherMsg.haveDriv = 1;
    }
  },
  // 第一联系人点击收起展开
  onelinkman: function () {
    var that = this;
    var onelinkmanTxt = that.data.onelinkmanTxt;
    that.setData({
      oneDropdown: !that.data.oneDropdown
    })
  },
  // 第二联系人点击收起展开
  twolinkman: function () {
    var that = this;
    var twolinkmanTxt = that.data.twolinkmanTxt;
    that.setData({
      twoDropdown: !that.data.twoDropdown
    })
  },
  // 第三联系人点击收起展开
  threelinkman: function () {
    var that = this;
    var threelinkmanTxt = that.data.threelinkmanTxt;
    that.setData({
      threeDropdown: !that.data.threeDropdown
    })
  },
  //提交申请*****************************************************
  submitMsg:function(){
    var that = this;
    console.log(massage)
    var houseObj = massage.houseDetail;//有无房贷
    var carObj = massage.carDetail;//有无车贷
    var cardObj = massage.cardDetail;//有无信用卡
    var otherObj = massage.otherMsg;//其他信息
    var onelinkmanObj = massage.otherMsg.onelinkman;//第一联系人
    var twolinkmanObj = massage.otherMsg.twolinkman;//第二联系人
    var threelinkmanObj = massage.otherMsg.threelinkman;//第三联系人
    // console.log(that.$json(houseObj))
    // console.log(that.$json(carObj))
    // console.log(that.$json(cardObj))

    // console.log(that.$json(otherObj))
    // console.log(that.$json(threelinkmanObj))
    // console.log(that.$json(twolinkmanObj))

    // console.log(that.$json(onelinkmanObj))
    if (that.$json(houseObj) == false || that.$json(carObj) == false || that.$json(cardObj) == false || that.$json(otherObj) == false || that.$json(onelinkmanObj) == false || that.$json(twolinkmanObj) == false || that.$json(threelinkmanObj) == false) {
      pagetwoMsg();
    } else {
      var sendJson = {
        "externalNumber": orderId,//订单号
        "clientName": massage.own.name,//客户名字
        "phoneNumber":massage.own.phone,//手机号码
        "notifyUrl":massage.own.address,//通知地址
        "attrs": {
          // "propertyInfo": {//房贷信息**********************
          //   "mortgageBank": massage.houseDetail.houseBank, //"string,贷款银行",
          //   "totalLoans": massage.houseDetail.houseAll,// "integer,贷款总额",
          //   "countBystages": massage.houseDetail.houseTime, //"integer,总期数",
          //   "outlay": massage.houseDetail.houseMouth,//"integer,月供"
          // },
          // "carInfo": {//车贷信息****************************
          //   "loanAmount": massage.carDetail.carAll,//"integer,贷款总额",
          //   "monthlyRepayAmount": massage.carDetail.carMouth,//"integer,月供",
          //   "bankInfoName": massage.carDetail.carBank,//"string,银行",
          //   "stageNumber": massage.carDetail.carTime,//"integer,期数"
          // },
          // "creditCard": {//信用卡********************************
          //   "creditCardName": massage.cardDetail.cardBank,//"string,信用卡的发卡银行",
          //   "creditCardQuota": massage.cardDetail.cardAll,//"integer,信用卡额度"
          // },
          "professionInfoSummary": {//单位信息*************************
            "companyName": massage.jobMsg.jobName,//"string,单位名称",
            "companyAddress": massage.jobMsg.jobAddress,//"string,企业地址",
            "workingLife": massage.jobMsg.jobTime,//"string,工作年限",
            "positionNote": massage.jobMsg.job,//'"string,职务",
            "totalIncome": massage.jobMsg.income,//"string,年收入",
            // "companyScale": massage.company.guimo,//"string,公司规模",/
            // "registerMoney": massage.company.mony,//"int,注册资金",
            "workType": massage.jobMsg.jobType,//"string,工作类型"
          },
          // "spouse": {
          //   "name": massage.marryMsg.spouseName,//"string,名字",
          //   "maritalStatus": massage.own.marry,//"string,婚姻状态",
          //   "sex": massage.marryMsg.spouseSex,//"string,性别",
          //   "phone": massage.marryMsg.spousePhone,//"string,电话号码"
          // },
          "linkMan": [//联系人******************
            {
              "name": massage.otherMsg.onelinkman.name,//"string,联系人名字",
              "relation": massage.otherMsg.onelinkman.relation,//"string,联系人关系",
              "linkPhone": massage.otherMsg.onelinkman.phone,//"string,联系电话"
            },
            {
              "name": massage.otherMsg.twolinkman.name,//"string,联系人名字",
              "relation": massage.otherMsg.twolinkman.relation,//"string,联系人关系",
              "linkPhone": massage.otherMsg.twolinkman.phone,//"string,联系电话"
            },
            {
              "name": massage.otherMsg.threelinkman.name,//"string,联系人名字",
              "relation": massage.otherMsg.threelinkman.relation,//"string,联系人关系",
              "linkPhone": massage.otherMsg.threelinkman.phone,//"string,联系电话"
            }
          ],
          "personalSummary": {
            "drivLicense": massage.otherMsg.haveDriv,//"integer,是否有驾照",
            "childrenNumber": massage.otherMsg.kids,//"integer,有几个孩子",
            "sex": massage.own.sex,//"string,性别",
            "phone": massage.own.phone,//"string,联系电话",
            "maritalStatus": massage.own.marry,//"string,婚姻状态"
          },
          "bankInfo": {
            "account": '',//"string,银行卡号"
          }
        }
      };
      if(massage.house=='无'){
        delete sendJson.attrs.propertyInfo
      }else{
        sendJson.attrs.propertyInfo = {
          "mortgageBank": massage.houseDetail.houseBank, //"string,贷款银行",
          "totalLoans": massage.houseDetail.houseAll,// "integer,贷款总额",
          "countBystages": massage.houseDetail.houseTime, //"integer,总期数",
          "outlay": massage.houseDetail.houseMouth,//"integer,月供"
        }
      }
      if(massage.car=='无'){
        delete sendJson.attrs.carInfo
      }else{
        sendJson.attrs.carInfo = {
          "loanAmount": massage.carDetail.carAll,//"integer,贷款总额",
          "monthlyRepayAmount": massage.carDetail.carMouth,//"integer,月供",
          "bankInfoName": massage.carDetail.carBank,//"string,银行",
          "stageNumber": massage.carDetail.carTime,//"integer,期数"
        }
      }
      if(massage.card=='无'){
        delete sendJson.attrs.creditCard
      }else{
        sendJson.attrs.creditCard = {
          "creditCardName": massage.cardDetail.cardBank,//"string,信用卡的发卡银行",
          "creditCardQuota": massage.cardDetail.cardAll,//"integer,信用卡额度"
        }
      }
      if (massage.own.marry == "已婚"){
        sendJson.attrs.spouse = {
          "name": massage.marryMsg.spouseName,//"string,名字",
          "maritalStatus": massage.own.marry,//"string,婚姻状态",
          "sex": massage.marryMsg.spouseSex,//"string,性别",
          "phone": massage.marryMsg.spousePhone,//"string,电话号码"
        }
      }else{
        delete sendJson.attrs.spouse
      }
      if(massage.jobMsg.jobType=='自雇人士'){
        sendJson.attrs.professionInfoSummary.registerMoney = massage.company.mony;
        sendJson.attrs.professionInfoSummary.companyScale = massage.company.guimo;
      }else{
        delete sendJson.attrs.professionInfoSummary.registerMoney;
        delete sendJson.attrs.professionInfoSummary.companyScale;
      }

      
      sendJson = JSON.stringify(sendJson);
      console.log(sendJson)
      console.log(userToken)
      wx.showLoading({
        title:'正在提交...'
      })
      wx.request({
        url: common.getWholeUrl('/qqd/apply'),
        data:{
          body: sendJson
        },
        method:'POST',
        header:{
          'content-type': 'application/x-www-form-urlencoded',
          token: userToken
        },
        success:function(res){
          console.log(res)
          if(res.statusCode==200){
            wx.redirectTo({
              url: '/pages/applySuccess/applySuccess',
            })
          }else if(res.statusCode==401){
            that.showmodel('您没有登录~')
          }else if(res.statusCode==400){
            if (res.data=='重复提交'){
              that.showmodel("同一个预约电话下的车辆融资审核流程还未结束，请勿重复提交融资申请（有特殊需要,请到车辆详情页面点击'预约看车'，输入不同的预约号码")
            }else{
              that.showmodel(res.data)
            }
            
          }else{
            that.showmodel('服务器开小差了，请稍后再试')
          }
        },
        fail:function(err){
          that.showmodel('网络不给力~')
        },
        complete:function(){
          wx.hideLoading();
        }
      })
      
      
    }
    
    function pagetwoMsg(){
      
      if (threelinkmanObj != undefined) {
        that.jsonmsg(threelinkmanObj, '第三联系人填写不完整');
      }
      if (twolinkmanObj != undefined) {
        that.jsonmsg(twolinkmanObj, '第二联系人填写不完整');
      }
      if (onelinkmanObj != undefined) {
        that.jsonmsg(onelinkmanObj, '第一联系人填写不完整');
      }
      that.jsonmsg(otherObj, '其他信息填写不完整');
      if (cardObj != undefined) {
        that.jsonmsg(cardObj, '信用卡信息填写不完整');
      }
      if (carObj != undefined) {
        that.jsonmsg(carObj, '车贷信息填写不完整');
      }
      if (houseObj != undefined) {
        that.jsonmsg(houseObj, '房贷信息填写不完整');
      }
      
    }
  },
  showmodel: function (text) {
    var that = this;
    wx.showModal({
      title: '温馨提示',
      content: text,
      showCancel: false,
      confirmText: '知道了',
      confirmColor: '#4182FF',
      success:function(){
        wx.navigateBack({})
      }
    })
  }
})