import React, { useEffect, useContext } from 'react'
import Horizen from '../../baseUI/horizen-item'
import {  NavContainer, ListContainer, List, ListItem} from "./style"
import { categoryTypes, alphaTypes } from '../../api/category'
import Scroll from '../../baseUI/scroll'
import {connect} from 'react-redux';
import  LazyLoad, {forceCheck} from 'react-lazyload';
import { 
  getSingerList, 
  getHotSingerList, 
  changeEnterLoading, 
  changePageCount, 
  refreshMoreSingerList, 
  changePullUpLoading, 
  changePullDownLoading, 
  refreshMoreHotSingerList 
} from './store/actionCreators';
import Loading from '../../baseUI/loading';
import { CategoryDataContext, CHANGE_ALPHA, CHANGE_CATEGORY } from './data'
import { renderRoutes } from 'react-router-config'

const Singers = (props) => {
  // let [category, setCategory] = useState ('');
  const {data, dispatch} = useContext(CategoryDataContext);
  // let [alpha, setAlpha] = useState ('');
  const {category, alpha} = data.toJS();

  const { singerList, enterLoading, pullUpLoading, pullDownLoading, pageCount } = props;
  const { getHotSingerDispatch, updateDispatch, pullDownRefreshDispatch, pullUpRefreshDispatch } = props;
  
  useEffect (() => {
    if (!singerList.size) {
      getHotSingerDispatch ();
    }
  }, [singerList.size, getHotSingerDispatch]);

  let handleUpdateAlpha = (val) => {
  dispatch ({type: CHANGE_ALPHA, data: val});
  updateDispatch (category, val);
};

let handleUpdateCatetory = (val) => {
  dispatch ({type: CHANGE_CATEGORY, data: val});
  updateDispatch (val, alpha);
};

  const handlePullUp = () => {
    pullUpRefreshDispatch(category, alpha, category === '', pageCount);
  };

  const handlePullDown = () => {
    pullDownRefreshDispatch(category, alpha);
  };

  const enterDetail = (id)  => {
    props.history.push (`/singers/${id}`);
  };


  const renderSingerList = () => {
    const list = singerList ? singerList.toJS(): [];
    console.log(props)
    return (
      <List>
        {
          list.map((item, index) => {
            return (
              <ListItem key={item.accountId+""+index} onClick={() => enterDetail(item.id)}>
                <div className="img_wrapper">
                  <LazyLoad placeholder={<img width="100%" height="100%" src={require('./singer.png')} alt="music"/>}>
                    <img src={`${item.picUrl}?param=300x300`} width="100%" height="100%" alt="music"/>
                  </LazyLoad>
                </div>
                <span className="name">{item.name}</span>
              </ListItem>
            )
          })
        }
      </List>
    )
  };

  return (
    <div>
      <NavContainer>
        <Horizen 
          title={"分类 (默认热门):"} 
          list={categoryTypes} 
          handleClick={handleUpdateCatetory} 
          oldVal={category}
        ></Horizen>
        <Horizen 
          list={alphaTypes} 
          title={"首字母:"} 
          handleClick={handleUpdateAlpha}
          oldVal={alpha}
        ></Horizen>
      </NavContainer>
      <ListContainer>
       <Scroll
        pullUp={ handlePullUp }
        pullDown = { handlePullDown }
        pullUpLoading = { pullUpLoading }
        pullDownLoading = { pullDownLoading }
        onScroll={forceCheck}
      >
        { renderSingerList () }
      </Scroll>
      <Loading show={enterLoading}></Loading>
      </ListContainer>
       { renderRoutes(props.route.routes) }
    </div>
    
  )

}


const mapStateToProps = (state) => ({
  singerList: state.getIn(['singers', 'singerList']),
  enterLoading: state.getIn(['singers', 'enterLoading']),
  pullUpLoading: state.getIn(['singers', 'pullUpLoading']),
  pullDownLoading: state.getIn(['singers', 'pullDownLoading']),
  pageCount: state.getIn(['singers', 'pageCount'])
});

const mapDispatchToProps = (dispatch) => {
  return {
    getHotSingerDispatch() {
      dispatch(getHotSingerList());
    },
    updateDispatch(category, alpha) {
      dispatch(changePageCount(0));//由于改变了分类，所以pageCount清零
      dispatch(changeEnterLoading(true));//loading，现在实现控制逻辑，效果实现放到下一节，后面的loading同理
      dispatch(getSingerList(category, alpha));
    },
    // 滑到最底部刷新部分的处理
    pullUpRefreshDispatch(category, alpha, hot, count) {
      dispatch(changePullUpLoading(true));
      dispatch(changePageCount(count+1));
      if(hot){
        dispatch(refreshMoreHotSingerList());
      } else {
        dispatch(refreshMoreSingerList(category, alpha));
      }
    },
    //顶部下拉刷新
    pullDownRefreshDispatch(category, alpha) {
      dispatch(changePullDownLoading(true));
      dispatch(changePageCount(0));//属于重新获取数据
      if(category === '' && alpha === ''){
        dispatch(getHotSingerList());
      } else {
        dispatch(getSingerList(category, alpha));
      }
    }
  }
}; 

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Singers));