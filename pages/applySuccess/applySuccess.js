// pages/applySuccess/applySuccess.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageShow: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.showModal({
      title: '申请成功',
      content: '是否保存您的融资申请信息，以便再次申请时不用重新填写',
      cancelText: '不用了',
      confirmText: '保存',
      confirmColor: '#4182FF',
      success: function (res) {
        that.setData({
          pageShow: true
        })
        if (res.confirm) {
          
        } else if (res.cancel) {
          wx.removeStorage({
            key: 'massage',
          })
        }
        
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
  lookBespoke:function(){
    wx.redirectTo({
      url: '/pages/bespoke/bespoke',
    })
  }
})