// pages/register/register.js
var common = require('../../utils/common.js');
var registerMsg = { 'phone': '','code':'','pass': '' },
codeTimeout = null,codeInterval = null,codeLint = true;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    windowHight:0,
    loading: false, loadTxt: '登录', codeTxt: '发送验证码'
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
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
    registerMsg = { 'phone': '', 'code': '', 'pass': '' };
    that.setData({
      phonevalue: '',
      codevalue: '',
      passvalue: ''
    })
  },
  setcode:function(){//发送验证码
    var that = this;
    clearTimeout(codeTimeout);
    setTimeout(function(){
      if (registerMsg.phone == '') {
        that.setData({
          err: true,
          errTxt: '请输入手机号码'
        })
        codeTimeout = setTimeout(function () { that.setData({ err: false, }); }, 2000)
      } else if (!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(registerMsg.phone))) {
        that.setData({
          err: true,
          errTxt: '手机号错误'
        })
        codeTimeout = setTimeout(function () { that.setData({ err: false, }); }, 2000)
        return false;
      } else {
        if (codeLint) {//限制在60S时间中重复点击
          codeLint = false;
          var t = 60;
          codeInterval = setInterval(function () {
            --t;
            if (t == 0) {
              clearInterval(codeInterval)
              that.setData({
                codeTxt: '发送验证码'
              })
              codeLint = true;//时间到了之后解开限制，使之可以点击
            } else {
              that.setData({
                codeTxt: t + 's后重新发送'
              })
            }
          }, 1000)
          that.codeRequest();
        } else {
          return false;
        }
      }
    },100)
  },
  codeRequest: function () {//发送验证码网络请求
    var that = this;
    wx.request({
      url: common.getWholeUrl('/qqd/user/send', { phone: registerMsg.phone }),
      method: 'POST',
      success: function (res) {
        console.log(res)
        if (res.statusCode == 200) {
          that.showmodel('验证码已经发送到您的手机，请注意查看');
        } else if (res.statusCode == 204) {
          that.showmodel('暂无数据,请稍后重试 ~');
        } else if (res.statusCode == 400) {
          that.showmodel(res.data);
        } else {
          that.showmodel('服务器开小差了,请稍后重试 ~');
        }
      },
      fail: function () {
        that.showmodel('服务器开小差了,请稍后重试 ~');
      },
      complete: function () {

      }
    })
  },
  bindblurPhone: function (e) {
    var that = this;
    var text = e.detail.value;
    registerMsg.phone = text;
  },
  bindblurCode: function (e) {
    var that = this;
    var text = e.detail.value;
    registerMsg.code = text;
  },
  bindblurPass: function (e) {
    var that = this;
    var text = e.detail.value;
    registerMsg.pass = text;
  },
  login:function(){//点击登录按钮
    var that = this;
    var loading = that.data.loading;
    if (registerMsg.phone == '' || registerMsg.code == '' || registerMsg.pass == ''){
      that.showmodel('请完整填写您的注册信息')
    }else{
      if (loading) {
        return false;
      }
      that.setData({
        loading: true
      })
      that.loginRequest();
    }
    
  },
  loginRequest:function(){
    var that = this;
    wx.request({
      url: common.getWholeUrl('/qqd/user/regist', { phone: registerMsg.phone, password:registerMsg.pass,code:registerMsg.code}),
      method:'POST',
      success:function(res){
        console.log(res)
        if (res.statusCode == 200) {
          setTimeout(function () {
            wx.setStorage({
              key: 'isLogin',
              data: res.data,
            })
            wx.navigateBack({});
          }, 500)
        } else if (res.statusCode == 204) {
          that.showmodel('暂无数据,请稍后重试 ~');
        } else if (res.statusCode == 400) {
          that.showmodel(res.data);
        } else {
          that.showmodel('服务器开小差了,请稍后重试 ~');
        }
      },
      fail:function(){
        that.showmodel('服务器开小差了,请稍后重试 ~');
      },
      complete:function(){
        setTimeout(function () {
          that.setData({
            loading: false
          })
        }, 1000)
      }
    })
  },
  loginPage:function(){//回到登录页面
    wx:wx.redirectTo({
      url: '/pages/login/login',
    })
  },
  lint: function (text) {
    var that = this;
    that.setData({
      err: true,
      errTxt: text
    })
    codeTimeout = setTimeout(function () { that.setData({ err: false }); }, 2000)
  },
  showmodel: function (text) {
    var that = this;
    wx.showModal({
      title: '温馨提示',
      content: text,
      showCancel: false,
      confirmText: '知道了',
      confirmColor: '#4182FF',
    })
  }
})