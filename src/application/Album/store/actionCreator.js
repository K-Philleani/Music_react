import { CHNAGE_ENTER_LOADING, CHNAGE_CURRENT_ALBUM } from './constants'
import { getAlbumDetailRequest } from '../../../api/request'
import { fromJS } from 'immutable'


const changeCurrentAlbum = data =>( {
  type: CHNAGE_CURRENT_ALBUM,
  data: fromJS(data)
})

export const changeEnterLoading = data => ({
  type: CHNAGE_ENTER_LOADING,
  data
})

export const getAlbumList = id => {
  return dispatch => {
    getAlbumDetailRequest(id).then(res => {
      let data = res.playlist
      dispatch(changeCurrentAlbum(data))
      dispatch(changeEnterLoading(false))
    }).catch(() => {
      console.log('获取alnum数据失败')
    })
  }
}