import * as actionTypes from './constans'
import { fromJS } from 'immutable'
import { getBannerRequest, getRecommendListRequest } from '../../../api/request'


const changeBannerList = (data) => ({
  type: actionTypes.CHANGE_BANNER,
  data: fromJS(data)
})

const changeRecommendList = (data) => ({
  type: actionTypes.CHANGE_RECOMMEND_LIST,
  data: fromJS(data)
})

const getBannerList = () => {
  return (dispatch) => {
    getBannerRequest().then(data => {
      dispatch(changeBannerList(data.banners))
    }).catch(() => {
      console.log("轮播图数据传输错误")
    })
  }
}

const getRecommendList = () => {
  return (dispatch) => {
    getRecommendListRequest().then(data => {
      dispatch(changeRecommendList(data.result));
      dispatch(changeEnterLoading(false))
    }).catch(() => {
      console.log("推荐歌单数据传输错误");
    });
  }
};

const changeEnterLoading = (data) => ({
  type: actionTypes.CHANGE_ENTER_LOADING,
  data
})



export {
  changeBannerList,
  changeRecommendList,
  getBannerList,
  getRecommendList,
  changeEnterLoading
}