// pages/bespoke/bespoke.js
var common = require('../../utils/common.js');
var userToken = '';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabList: ['全部', '预约成功', '融资申请'], tabnum: '全部',
    loadding: true,
    bespokeList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getStorage({
      key: 'isLogin',
      success: function(res) {
        var userInfo = res.data;
        userToken = userInfo.token;
        that.bespoke(userToken,0);
      },
    })
  },
  bespoke: function (usertoken, statusnum){
    var that = this;
    wx.showNavigationBarLoading();
    wx.request({
      url: common.getWholeUrl('/qqd/orders', { pageSize: 100, pageNumber: 1, status: statusnum}),
      method:'GET',
      header:{
        token: usertoken
      },
      success:function(res){
        console.log(res)
        if(res.statusCode==200){
          that.setData({
            bespokeList: res.data
          })
        } else if (res.statusCode==401){
          wx.showModal({
            title: '警告',
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
        } else if(res.statusCode == 204){
          that.showmodel('您还没有该内容的预约申请')
          that.setData({
            bespokeList: ''
          })
        }else if(res.statusCode==400){
          that.showmodel(res.data)
        }else{
          that.showmodel('服务器开小差了，请稍后再试')
        }
      },
      fail:function(res){
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
    var that= this;
    that.bespoke(userToken,0);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  tabChange:function(e){
    var tabTxt = e.currentTarget.dataset.id;
    var that = this;
    if(tabTxt=='全部'){
      that.bespoke(userToken, '0');
    } else if (tabTxt == '预约成功'){
      that.bespoke(userToken, '10');
    }else{
      that.shrz(userToken, 20);
      that.cgrz(userToken, 25);
      that.norz(userToken, 60);
    }
    this.setData({
      tabnum: tabTxt
    })
  },
  bespokeDetail:function(){
    wx.navigateTo({
      url: '/pages/bespokeDetail/bespokeDetail',
    })
  },
  shrz: function (usertoken, statusnum) {
    var that = this;
    wx.showNavigationBarLoading();
    wx.request({
      url: common.getWholeUrl('/qqd/orders', { pageSize: 100, pageNumber: 1, status: statusnum }),
      method: 'GET',
      header: {
        token: usertoken
      },
      success: function (res) {
        console.log(res)
        if (res.statusCode == 200) {
          that.setData({
            cgrz: res.data
          })
        } else if (res.statusCode == 401) {
          wx.showModal({
            title: '警告',
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
        } else if (res.statusCode == 204) {
          // that.showmodel('您还没有该内容的预约申请')
          that.setData({
            bespokeList: ''
          })
        } else if (res.statusCode == 400) {
          that.showmodel(res.data)
        } else {
          that.showmodel('服务器开小差了，请稍后再试')
        }
      },
      fail: function (res) {
        that.showmodel('服务器开小差了，请稍后再试')
      },
      complete: function () {
        wx.hideNavigationBarLoading();
        wx.stopPullDownRefresh();
      }
    })
  },
  cgrz: function (usertoken, statusnum) {
    var that = this;
    wx.showNavigationBarLoading();
    wx.request({
      url: common.getWholeUrl('/qqd/orders', { pageSize: 100, pageNumber: 1, status: statusnum }),
      method: 'GET',
      header: {
        token: usertoken
      },
      success: function (res) {
        console.log(res)
        if (res.statusCode == 200) {
          that.setData({
            cgrz: res.data
          })
        } else if (res.statusCode == 401) {
          wx.showModal({
            title: '警告',
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
        } else if (res.statusCode == 204) {
          // that.showmodel('您还没有该内容的预约申请')
          that.setData({
            bespokeList: ''
          })
        } else if (res.statusCode == 400) {
          that.showmodel(res.data)
        } else {
          that.showmodel('服务器开小差了，请稍后再试')
        }
      },
      fail: function (res) {
        that.showmodel('服务器开小差了，请稍后再试')
      },
      complete: function () {
        wx.hideNavigationBarLoading();
        wx.stopPullDownRefresh();
      }
    })
  },
  norz: function (usertoken, statusnum) {
    var that = this;
    wx.showNavigationBarLoading();
    wx.request({
      url: common.getWholeUrl('/qqd/orders', { pageSize: 100, pageNumber: 1, status: statusnum }),
      method: 'GET',
      header: {
        token: usertoken
      },
      success: function (res) {
        console.log(res)
        if (res.statusCode == 200) {
          that.setData({
            norz: res.data
          })
        } else if (res.statusCode == 401) {
          wx.showModal({
            title: '警告',
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
        } else if (res.statusCode == 204) {
          // that.showmodel('您还没有该内容的预约申请')
          that.setData({
            bespokeList: ''
          })
        } else if (res.statusCode == 400) {
          that.showmodel(res.data)
        } else {
          that.showmodel('服务器开小差了，请稍后再试')
        }
      },
      fail: function (res) {
        that.showmodel('服务器开小差了，请稍后再试')
      },
      complete: function () {
        wx.hideNavigationBarLoading();
        wx.stopPullDownRefresh();
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