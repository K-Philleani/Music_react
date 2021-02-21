import styled from 'styled-components'
import style from '../../assets/global-style'

export const Container = styled.div`
 position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  background: ${style["background-color"]};
  transform-origin: right bottom;
  &.fly-appear {
  transform: rotateZ(30deg) translate3d(100%, 0, 0);
  }
  &.fly-appear.fly-appear-active,
  &.fly-appear-done.fly-enter-done {
  transition: transform 0.3s;
  transform: rotateZ(0deg) translate3d(0, 0, 0);
  }
  &.fly-exit.fly-exit-active {
  transition: transform 0.3s;
  transform: rotateZ(30deg) translate3d(100%, 0, 0);
  }
`;
export const List = styled.ul`
  margin-top: 10px;
  padding: 0 5px;
  display: ${props => props.globalRank ? "flex": "" };
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  background: ${style["background-color"]};
  &::after{
    content:"";
    display:block;
    width: 32vw;
  }
`
export const ListItem = styled.li`
  display: ${props => props.tracks.length ? "flex": ""};
  padding: 3px 0;
  border-bottom: 1px solid ${style["border-color"]};
  .img_wrapper{
    width:  ${props => props.tracks.length ? "27vw": "32vw"};
    height: ${props => props.tracks.length ? "27vw": "32vw"};
    border-radius: 3px;
    position: relative;
    .decorate {
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 35px;
      border-radius: 3px;
      background: linear-gradient(hsla(0,0%,100%,0),hsla(0,0%,43%,.4));
    }
    img{
      width: 100%;
      height: 100%;
      border-radius: 3px;
    }
    .update_frequecy{
      position: absolute;
      left: 7px;
      bottom: 7px;
      font-size: ${style["font-size-ss"]};
      color: ${style["font-color-light"]};
    }
  }
`;
export const SongList = styled.ul`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 10px 10px;
  >li{
    font-size: ${style["font-size-s"]};
    color: grey;
  }
`;
