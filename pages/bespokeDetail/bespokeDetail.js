// pages/bespokeDetail/bespokeDetail.js
var common = require('../../utils/common.js');
var userToken = '', orderId = '';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bespokeTitle: '', bespokeTtileIcon: 'SHTG',
    prompt: '客服人员会与您沟通看车事宜',
    btnText: '申请融资', btnType:true,
    cont: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    orderId = options.orderId;
    wx.getStorage({
      key: 'isLogin',
      success: function(res) {
        var userInfo = res.data;
        userToken = userInfo.token;
        that.bespokeRequest(orderId, userToken);
      },
    })
    return false;
    
  },
  bespokeRequest: function (orderId,userToken){
    var that = this;
    wx.showNavigationBarLoading();
    console.log(orderId)  
    wx.request({
      url: common.getWholeUrl('/qqd/order/'+orderId),
      method:'GET',
      header:{
        token: userToken
      },
      success:function(res){
        console.log(res)
        if(res.statusCode==200){
          that.setData({
            cont: res.data
          })
          var orderStatus = res.data.orderStatus;
          if (orderStatus == "10" || orderStatus == "15") {
            that.setData({
              bespokeTitle:'预约成功',
              bespokeTtileIcon: 'SHTG',
              prompt: '客服人员会与您沟通看车事宜',
              btnText: '申请融资'
            })
          } else if (orderStatus == "25" || orderStatus == "50") {
            that.setData({
              bespokeTitle: '融资审核通过',
              bespokeTtileIcon: 'SHTG',
              prompt: '您的融资审核已通过，请前去注册并下载车护宝进行后续操作',
              btnText: '下载APP'
            })
          } else if (orderStatus == "20") {
            that.setData({
              bespokeTitle: '融资审核中',
              bespokeTtileIcon: 'SHZ',
              prompt: '您的资料已提交，请等待资质审核',
              btnText: '查看资料',
              btnType: false,
            })
          } else if (orderStatus == "60") {
            that.setData({
              bespokeTitle: '融资审核未通过',
              bespokeTtileIcon: 'SHBTG',
              prompt: '很遗憾您的融资审核暂未通过，您可以尝试重新申请或联系客服',
              btnText: '重新申请',
            })
          }
        }else if(res.statusCode==204){
          that.showmodel(res.data)
        }else if(res.statusCode==400){
          that.showmodel(res.data)
        } else if (res.statusCode == 401){
          that.showmodel('您没有登录，没有权限访问本页面')
        }else{
          that.showmodel('服务器开小差了，请稍后再试')
        }
      },
      fail:function(){
        that.showmodel('服务器开小差了，请稍后再试')
      },
      complete:function(){
        wx.hideNavigationBarLoading();
        wx.stopPullDownRefresh();
      }
    })
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
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.bespokeRequest(orderId, userToken);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },
  call:function(){//联系客服
    wx.makePhoneCall({
      phoneNumber: '13320284502',
    })
  },
  getuser: function () {//授权
    var that = this;
    wx.showNavigationBarLoading();
    wx.getLocation({
      success: function (res) {
        wx.hideNavigationBarLoading();
        wx.openLocation({
          latitude: res.latitude,
          longitude: res.longitude,
        })
      },
      complete: function () {
        wx.getSetting({
          success(res) {
            if (!res.authSetting['scope.userLocation']) {
              wx.showModal({
                title: '温馨提示',
                showCancel: false,
                content: '请授权地理位置信息',
                confirmText: "授权",
                complete: function () {
                  wx.openSetting();
                }
              })
            }
          }
        })
      }
    })
  },

  apply:function(){//申请融资
    var that = this;
    wx.getStorage({
      key: 'isLogin',
      success: function (res) {
        if (res.data != '' && res.data != undefined) {
          var bespokeTitle = that.data.bespokeTitle;
          if (bespokeTitle == "预约成功" || bespokeTitle == "融资审核未通过"){
            wx.redirectTo({
              url: '/pages/writeMsg/writeMsg?orderId='+orderId,
            })
          } else if (bespokeTitle == "融资审核通过"){
            wx.redirectTo({
              url: '/pages/down/down',
            })
          } else if (bespokeTitle == "融资审核中"){
            wx.redirectTo({
              url: '/pages/lookMsg/lookMsg',
            })
          }
        } else {
          that.showModal();
        }
      },
      fail: function () {
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