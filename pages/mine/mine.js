//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    login: false,userImg: '/image/headImg.png',userName: '富士山下'
  },
  onLoad: function () {
    
  },
  onShow:function(){
    var that = this;
    wx.getStorage({
      key: 'isLogin',
      success: function(res) {
        var userInfo = res.data;
        that.setData({
          login: true,
          userImg: userInfo.headImageUrl,
          userName: userInfo.nickName
        })
      },
      fail:function(){
        that.setData({
          login: false,
          userImg: '/image/headImg.png',
        })
      }
    })
  },
  login:function(e){
    var that = this;
    wx.navigateTo({
      url: '/pages/login/login',
    })
  },
  mybespoke:function(){
    var that = this;
    wx.getStorage({
      key: 'isLogin',
      success: function(res) {
        if(res.data!=''||res.data!=undefined){
          wx.navigateTo({
            url: '/pages/bespoke/bespoke',
          })
        }else{
          that.showModal();
        }
      },
      fail:function(e){
        that.showModal();
      }
    })
    
  },
  showModal: function () {
    var that = this;
    wx.showModal({
      title: '温馨提示',
      confirmText: '去登录',
      confirmColor: '#4182FF',
      content: '您尚未登录',
      success: function (res) {
        if (res.confirm) {
          wx.navigateTo({
            url: '/pages/login/login',
          })
        } else if (res.cancel) {
          return false;
        }
      }
    })
  },
  down:function(){
    wx.navigateTo({
      url: '/pages/down/down',
    })
  }
})
