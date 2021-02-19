import React, { useState } from 'react'
import Horizen from '../../baseUI/horizen-item'
import { NavContainer } from './style'
import { categoryTypes, alphaTypes } from '../../api/category'

const Singers = () => {
  let [category, setCategory] = useState ('');
  let [alpha, setAlpha] = useState ('');

  let handleUpdateAlpha = (val) => {
    setAlpha (val);
  }

  let handleUpdateCatetory = (val) => {
    setCategory (val);
  }
  return (
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
  )

}

export default React.memo(Singers)