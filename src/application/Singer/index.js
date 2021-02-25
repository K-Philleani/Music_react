import React, { memo, useState, useCallback } from 'react'
import { CSSTransition } from 'react-transition-group'
import { Container, ImgWrapper, CollectButton, BgLayer, SongListWrapper } from './style'
import Header from '../../baseUI/header'

const Singer = (props) => {
  const [ showStatus, setShowStatus ] = useState(true)
  const artist = {
  picUrl: "https://p2.music.126.net/W__FCWFiyq0JdPtuLJoZVQ==/109951163765026271.jpg",
  name: "薛之谦",
  hotSongs: [
    {
      name: "我好像在哪见过你",
      ar: [{name: "薛之谦"}],
      al: {
        name: "薛之谦专辑"
      }
    },
    {
      name: "我好像在哪见过你",
      ar: [{name: "薛之谦"}],
      al: {
        name: "薛之谦专辑"
      }
    },
  ]
}
  const handleBack = useCallback(() => {
    setShowStatus (false);
  }, []);


  return (
    <CSSTransition
      in={showStatus}
      timeout={300}
      classNames="fly"
      appear={true}
      unmountOnExits
      onExited={() => props.history.goBack()}
    >
      <Container>
        <Header title={"头部"} handleClick={handleBack}></Header>
        <ImgWrapper bgUrl={artist.picUrl}>
          <div className="filter"></div>
        </ImgWrapper>
        <CollectButton>
          <i className="iconfont">&#xe62d;</i>
          <span className="text"> 收藏 </span>
        </CollectButton>
        <BgLayer></BgLayer>
        <SongListWrapper>
          {/* // 歌曲列表部分，待会专门拆解 */}
        </SongListWrapper>
      </Container>
    </CSSTransition>
  )
}


export default memo(Singer)