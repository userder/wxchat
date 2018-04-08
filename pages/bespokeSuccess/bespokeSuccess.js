// pages/bespokeSuccess/bespokeSuccess.js
var common = require('../../utils/common.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.carList();
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
  
  },
  carList: function () {//首页汽车默认展示
    var that = this;
    wx.showNavigationBarLoading();
    var nums = Math.floor(Math.random() * 5 + 1)
    console.log(nums)
    wx.request({
      url: common.getWholeUrl('/qqd/cars', { pageNum: nums, pageSize: 4 }),
      method: 'GET',
      success: function (res) {
        console.log(res)
        if (res.statusCode == 200) {
          that.setData({
            carList: res.data.carList,
          })
        } else if (res.statusCode == 204) {
          that.showmodel('暂无数据展示');
        } else if (res.statusCode == 400) {
          that.showmodel(res.data)
        } else {
          that.showmodel('服务器开小差了，请稍后再试');
        }
      },
      fail: function (res) {
        that.showText('服务器开小差了，请稍后再试');
      },
      complete: function () {
        wx.stopPullDownRefresh();
        wx.hideNavigationBarLoading();
      }
    })
  },
  bespoke:function(){//查看申请
    wx.navigateTo({
      url: '/pages/bespoke/bespoke',
    })
  }
})