// pages/login/login.js
const app = getApp();
var common = require('../../utils/common.js');
var userloginMsg = {'phone':'','pass':''};
var codeTimeout = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    windowHight: 0,
    loading: false
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
    userloginMsg = { 'phone': '', 'pass': '' };
    this.setData({
      phonevalue: '',
      passvalue: ''
    })
  },
  bindblurPhone:function(e){
    var that = this;
    var text = e.detail.value;
    userloginMsg.phone = text;
  },
  bindblurPass: function (e) {
    var that = this;
    var text = e.detail.value;
    userloginMsg.pass = text;
  },
  login:function(){//登录
    var that = this;
    console.log(userloginMsg.phone)
    console.log(userloginMsg.pass)
    clearTimeout(codeTimeout)
    if (userloginMsg.phone == '' || userloginMsg.pass==''){
      that.lint('请完整填写您的登录信息')
    } else if (!(/^1(3|4|5|7|8)\d{9}$/.test(userloginMsg.phone))){
      that.lint('手机号格式错误')
    }else{
      if (that.data.loading) {
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
      url: common.getWholeUrl('/qqd/user/login', { phone:userloginMsg.phone, password:userloginMsg.pass}),
      method:'POST',
      success:function(res){
        console.log(res);
        if(res.statusCode==200){
          setTimeout(function () {
            wx.setStorage({
              key: 'isLogin',
              data: res.data,
            })
            wx.navigateBack({});
          }, 500)
        } else if(res.statusCode==204){
          that.showmodel('暂无数据展示');
        } else if (res.statusCode == 400){
          that.showmodel(res.data)
        } else{
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
  registerPage:function(){//注册
    wx.redirectTo({
      url: '/pages/register/register',
    })
  },
  lint:function(text){
    var that = this;
    that.setData({
      err: true,
      errTxt: text
    })
    codeTimeout = setTimeout(function () { that.setData({ err: false }); }, 2000)
  },
  showmodel:function(text){
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