import React from 'react'
import { message, Button, Dropdown, Menu, Modal } from 'antd'
import { cloneDeep } from 'lodash'
import classNames from 'classnames'
import { 
  PauseCircleOutlined,
} from '@ant-design/icons';
import './index.scss'

let cardTopBase = 20 // 每一列牌的向下偏移
let cardLeftBase = 10  // 每一列牌的向右偏移
const wrapPaddingTop = 8 // 背景paddingTop值
const wrapPaddingLeft = 16 // 背景paddingLeft值

let imgWidth = 80 // 图片宽度
const imgWHRatio = 180 / 250 // 图片宽高比
let imgHeight = imgWidth / imgWHRatio // 图片高度
const dealInterval = 0.05 // 发一张牌用的时间
const annimationDuration = 0.3 // 牌移动动画时间

const postCardMarLeft = 8 // 发牌处距离主体的横向距离
let postCardLeft = 1000 // 发牌时牌的初始left
let postCardTop = 1000 // 发牌时牌的初始top

let clickMore = 0 // 点击发牌次数
let cardIndex = 0 // 展示了多少牌

let firstShowNum = 54 // 一开始发多少张牌
let cardPacks = 8 // 几副牌

const tenArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const originUseTime = '00:00'
let thisTime = 0 // 所用时间
let thisTimer // 记时器
let score = (cardPacks / 2) * 100 // 分数
const originHardLevel = 8 //  默认难度
let onceError = false // 犯过一次错误
let successTimes = 0 // 胜利次数
let moveTimes = 0
/**
 * 难度设计：
 * 1：2副牌
 * 4：4副牌
 * 8：8副牌
 * 16：8副牌洗两次
 * 32：8副牌洗四次
 */
const hardLevelObj = {
  1: {
    name: '大白',
    packs: 2,
    firstShowNum: 16,
    score: 100
  },
  4: {
    name: '入门',
    packs: 4,
    firstShowNum: 22,
    score: 200
  },
  8: {
    name: '普通',
    packs: 8,
    firstShowNum: 54,
    score: 500
  },
  16: {
    name: '困难',
    packs: 8,
    firstShowNum: 54,
    score: 500
  },
  32: {
    name: '专家',
    packs: 8,
    firstShowNum: 54,
    score: 500
  },
}

// 获取10列空的数组
const getOriginCardTable = () => {
  let originCardTable = []
  for (let i = 0; i < 10; i++) {
    originCardTable[i] = []
  }
  return originCardTable
}

// 获取几副牌
const getCards = (num = 1) => {
  let res = []
  let _list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
  for (let i = 0; i < num; i++) {
    res = res.concat(_list)
  }
  return res
}

// 洗牌
const shuffleCard = (_list) => {
  _list.sort(() => {
    return Math.random() > 0.5 ? 1 : -1
  })
  return _list
}

const addZero = (x) => {
  if (('' + x).length === 1) {
    return '0' + x
  }
  return x
}

// 判断是否是PC端
function isPC() {
  var userAgentInfo = navigator.userAgent;
  var Agents = ["Android", "iPhone",
              "SymbianOS", "Windows Phone",
              "iPad", "iPod"];
  var flag = true;
  for (var v = 0; v < Agents.length; v++) {
      if (userAgentInfo.indexOf(Agents[v]) > 0) {
          flag = false;
          break;
      }
  }
  return flag;
}


// 根据列获取每张牌的left值
const getLeft = (i) => {
  return (cardLeftBase + imgWidth) * i + wrapPaddingLeft
}

// 根据行获取每张牌的top值
const getTop = (i) => {
  return cardTopBase * i  + wrapPaddingTop
}


/**
 * 蜘蛛纸牌
 * 
 * 关键数据格式：
 * originData: [{ cardNum: 1, show: true  }]
 * 牌的id是其索引值, 从0到103
 * 
 * cardTable: [ { cardId: 1, index:  1, cardNum: 1 } ]
 * 牌的id编号，所在行，牌的真实数字，其索引值是所在列line
 * 
 * selectedObj: { line: [ { cardId: 1, index: 1, cardNum: 1 }, { cardId: 3, index: 3, cardNum: 3 } ] }
 */
class SpiderCard extends React.PureComponent{
  constructor(props) {
    super(props) 
    
    this.state = {
      cardTable: getOriginCardTable(), // 只有展示中的数据，二维
      selectedObj: {}, // 选中的牌的列和行信息
      originData: [], // 全部数据，一维
      dealing: false, // 是否正在发牌
      useTime: originUseTime,
      selectedHardLevel: originHardLevel,
    }
    document.title = '蜘蛛纸牌'
  }

  componentDidMount() {
    this.fitMobile()
    this.getPostCardPos()
    this.getOriginData()
    this.spiderWrap.addEventListener('click', this.onBindClick)
  }

  fitMobile = () => {
    const { offsetHeight, offsetWidth } = document.documentElement
    if (offsetHeight > offsetWidth) {
      const body = document.body
      const spiderContainer = document.getElementsByClassName('spider-container')[0]
      const spiderWrap = document.getElementsByClassName('spider-wrap')[0]

      cardTopBase = 12
      body.style.transform = `rotate(90deg)`
      body.style.transformOrigin = '0% 0%'
      body.style.position = 'relative'
      body.style.left = '100%'
      body.style.width = `100vh`
      body.style.height = `100vw`

      spiderContainer.style.maxHeight = '100vw'
      spiderContainer.style.padding = '10px 10px'
      
      let thisHeight = offsetWidth - 24 - 30
      if (thisHeight < 370) thisHeight = 370
      spiderWrap.style.minHeight = `${thisHeight}px`
    }
  }

  getPostCardPos =  () => {
    const wholeWidth = this.spiderWrap.offsetWidth
    const wholeHeight = this.spiderWrap.offsetHeight
    // 重新计算每列牌的间距
    imgWidth = (wholeWidth - wrapPaddingLeft * 2  - 9 * cardLeftBase) / 10
    imgHeight = imgWidth / imgWHRatio
    // 重新计算发牌位置
    postCardLeft = wholeWidth - postCardMarLeft - imgWidth
    postCardTop = wholeHeight - imgHeight - 10
  }

  getOriginData = () => {
    const { selectedHardLevel} = this.state
    let originData = []
    let _list = []
    let res = [];
    ({ packs: cardPacks, firstShowNum, score } = hardLevelObj[selectedHardLevel])
    if (selectedHardLevel == 1 ) {
      // 每1副牌单独洗
      _list = getCards(1)
      for (let i = 0; i < 2; i ++) {
        shuffleCard(_list) 
        res = res.concat(_list)
      }
    } else if (selectedHardLevel == 4) {
      _list = getCards(1)
      for (let i = 0; i < 4; i ++) {
        shuffleCard(_list) 
        res = res.concat(_list)
      }
    } else if (selectedHardLevel == 8) {
      _list = getCards(8)
      shuffleCard(_list) 
      res = res.concat(_list)
    } else if (selectedHardLevel == 16) {
      _list = getCards(8)
      for (let i = 0; i < 2; i++) {
        shuffleCard(_list) 
      }
      res = res.concat(_list)
    } else if (selectedHardLevel == 32) {
      _list = getCards(8)
      for (let i = 0; i < 4; i++) {
        shuffleCard(_list) 
      }
      res = res.concat(_list)
    }
    res.map(item => {
      originData.push({
        show: false,
        cardNum: item
      })
    })
    this.setState({
      originData,
      dealing: true
    }, () => {
      this.initDealCard()
    })
  }

  //定时函数，每一秒执行一次
  timer = () => {
    thisTime += 1;//一秒钟加一，单位是秒
    let hour = parseInt(thisTime / 3600)
    let min = parseInt(thisTime / 60);//把秒转换为分钟，一分钟60秒，取商就是分钟
    let sec = thisTime % 60;//取余就是秒
    hour = addZero(hour)
    min = addZero(min)
    sec = addZero(sec)
    const res = hour === '00' ?  `${min}:${sec}` : `${hour}:${min}:${sec}`
    this.setState({
      useTime: res
    })
  }

  // 初始化的发牌
  initDealCard = () => {
    const { originData, cardTable } = this.state
    let _cardTable =  cloneDeep(cardTable)
    if (cardIndex > firstShowNum - 1) {
      this.setState({
        dealing: false,
      })
      //启动定时
      thisTimer = setInterval(this.timer, 1000);
      return
    }
    const thisLine = cardIndex % 10
    const thisIndex = Math.floor(cardIndex / 10)

    if (cardIndex >= firstShowNum - 10) {
      let newList = cloneDeep(originData)
      newList[cardIndex].show = true
      this.setState({
        originData: newList
      }, () => {
        this.onDealCard(cardIndex, thisLine, thisIndex)
      })
    } else {
      this.onDealCard(cardIndex, thisLine, thisIndex)
    }
    
    _cardTable[cardIndex%10].push({
      cardId: cardIndex,
      index: Math.floor(cardIndex / 10),
      cardNum: originData[cardIndex].cardNum,
    })
    cardIndex += 1

    this.setState({
      cardTable: _cardTable,
    })
    setTimeout(() => {
      this.initDealCard()
    }, dealInterval * 1000)


  }

  // 继续发牌
  onShowMoreCard = () => {
    const { dealing } = this.state
    if (dealing) return
    this.setState({
      dealing: true,
      selectedObj: {},
    })

    clickMore += 1
    this.onRealShowMoreCard()
    
  }

  // 实际继续发牌
  onRealShowMoreCard = () => {
    const { originData, cardTable } = this.state
    let _cardTable = cloneDeep(cardTable)
    let _originData = cloneDeep(originData)
    if (cardIndex >= clickMore * 10 + firstShowNum || cardIndex > cardPacks * 13 - 1) {
      this.setState({
        dealing: false,
      })
      return
    }  
    const thisLine = cardIndex % 10
    const thisIndex = _cardTable[thisLine].length
    _cardTable[thisLine].push({
      cardId: cardIndex,
      index: thisIndex,
      cardNum: _originData[cardIndex].cardNum,
    })

    _originData[cardIndex].show = true
    
    this.setState({
      originData: _originData,
      cardTable: _cardTable,
    }, () => {
      this.onDealCard(cardIndex, thisLine, thisIndex)
      cardIndex += 1
    })

    setTimeout(() => {
      this.onRealShowMoreCard()
    }, dealInterval * 1000)
  }

  onDealCard = (cardId, line, index) => {
    const a = document.getElementById(`card-v${cardId}`)
    if (a) {
      a.style.zIndex = index + moveTimes * 30
      a.style.left = getLeft(line) + 'px'
      a.style.top = getTop(index) + 'px'
      a.setAttribute('data-line', line)
      a.setAttribute('data-index', index)
      a.setAttribute('data-type', '')
      moveTimes += 1
    }
  }

  // 从cardTable中获取牌的数字
  getCardNum = (line, index) => {
    const { cardTable } = this.state
    let thisNum = -1
    if (cardTable[line] && cardTable[line][index]) {
      thisNum = (cardTable[line][index] && cardTable[line][index]['cardNum']) || -1
    }
    return thisNum
  }

  /**
   * 绑定点击事件，要做两件事，改变cardTable或者selectedObj
   * 之前有选中，分为三种：点击的是空列、相同列、其他列，点击相同列分为点击相同牌、不同牌
   * 之前没有选中，
   */
  onBindClick = (e) => {
    const { classList, dataset: { line, index, type }, id } = e.target
    const { cardTable, selectedObj, dealing, originData } = this.state
    if (type === 'origin') {
      this.onShowMoreCard() 
      return
    }
    const cardId = id.replace('card-v', '')
    if (dealing) return
    // 点击其他地方，取消选择
    if (!classList.contains('card') && !classList.contains('card-bg')) {
      this.onChangeActiveCSS()
      this.setState({
        selectedObj: {},
      })
      return
    } 
    if (index != -1 && (!originData[cardId] || !originData[cardId]['show'])) return 
    const thisLine = cardTable[line]
    
    // 之前有选中
    if (Object.values(selectedObj).length) {
      const beforeSelectedLine = Object.keys(selectedObj)[0]
      // 点击的是空列
      if (!cardTable[line].length && index == -1) {
        this.onChangeCardTable(line, id)
        
      } else if (beforeSelectedLine == line) {
        // 点击的是相同列
        if (selectedObj[beforeSelectedLine].length === 1 && selectedObj[beforeSelectedLine][0].index == index) {
          // 点击的是同一张牌
          this.setState({
            selectedObj: {},
          })
          this.onChangeActiveCSS()
        } else {
          this.onChangeSelectedObj(line, index, id) 
        }

      } else if (+index == thisLine.length - 1) {
        // 点击其他列的最后一个，说明是要添加
        const selectedLine = Object.keys(selectedObj)[0]

        // 满足条件
        if ( cardTable[line][index].cardNum - 1 ===  selectedObj[selectedLine][0].cardNum) {
          this.onChangeCardTable(line, selectedLine)
        } else {
          // 没犯过错误
          if (!onceError) {
            message.error('不能移动到那儿', { duration: 1 })
            onceError = true
          } else {
            // 犯过错误
            this.onChangeSelectedObj(line, index, id) 
            onceError = false
          }
        }
      } else {
        // 点击的是其他列，但不是最后一个
        this.onChangeSelectedObj(line, index, id) 
      }
    } else {
      // 之前未选中过
      this.onChangeSelectedObj(line, index, id) 
    }
  }

  // 改变选中的牌
  onChangeSelectedObj = (line, index, id) => {
    if (index == -1) return
    const { cardTable } = this.state
    const thisLine = cardTable[line]
    if (!thisLine) return 

    let _selectedObj = {}
    if (thisLine.length === +index + 1) {
      // 当前点击的是本列的最后一个
      _selectedObj[line] = [
        {
          index: thisLine[index].index,
          cardId: thisLine[index].cardId,
          cardNum: thisLine[index].cardNum
      }]
      this.onChangeActiveCSS([ id ])
     
    } else {
      // 当前点击的不是本列的最后一个
      let flag = true
      for (let i = thisLine.length - 1; i >= +index+1; i--) {
        // 有一个不是下面比上面小1
        if (thisLine[i]['cardNum'] !== thisLine[i - 1]['cardNum'] - 1) {
          flag = false
        }
      }
      if (flag) {
        _selectedObj[line] = []
        const ids = []
        for(let i = +index; i < thisLine.length; i++) {
          const cardId = thisLine[i].cardId
          ids.push(`card-v${cardId}`)
          _selectedObj[line].push({
            index: thisLine[i].index,
            cardId,
            cardNum: thisLine[i].cardNum
          })
        }
        this.onChangeActiveCSS(ids)
      }
    }
    this.setState({
      selectedObj: _selectedObj,
    })
  }

  onChangeActiveCSS = (ids = []) => {
    let b = document.getElementsByClassName('active')
    b = [...b]
    b.forEach(item => {
      item.classList.remove('active')
    })
    for (let i = 0; i < ids.length; i++) {
      const a = document.getElementById(ids[i])
      
      if (a) {
        a.classList.add('active')
      }
    }
  }

  // 改变cardTable数组
  onChangeCardTable = (line) => {
    const { selectedObj, cardTable, originData } = this.state
    const selectedLine = Object.keys(selectedObj)[0]
    const _cardTable = cloneDeep(cardTable)
    const _originData = cloneDeep(originData)
    
    // 选中的列中的第一张牌
    const selectedFirstIndex = selectedObj[selectedLine][0].index

    let cutNums = []
    for (let i = 0; i < selectedObj[selectedLine].length; i++) {
      const thisId = selectedObj[selectedLine][i].cardId
      const thisIndex = i + cardTable[line].length
      cutNums.push({
        index: thisIndex,
        cardId: thisId,
        cardNum: selectedObj[selectedLine][i].cardNum
      })
      this.onDealCard(thisId, line, thisIndex)
    }
    
    _cardTable[line].push( ...cutNums )
    _cardTable[selectedLine].splice(selectedFirstIndex, selectedObj[selectedLine].length)
    const selectedLineLen = _cardTable[selectedLine].length
    score -= 1
    // 将移走的那一列的最后一个显示出来
    if (selectedLineLen && _originData[_cardTable[selectedLine][selectedLineLen - 1].cardId].show === false) {
      _originData[_cardTable[selectedLine][selectedLineLen - 1].cardId].show = true
    }
    this.onChangeActiveCSS()
    this.setState({
      cardTable: _cardTable,
      originData: _originData,
      selectedObj: {}
    })
    setTimeout(() => {
      this.checkComplete(line)
    }, annimationDuration * 1000)
  }

  // 检查是否完成一组
  checkComplete = (line) => {
    const { cardTable, originData } = this.state
    const total = 13
    if (!cardTable[line] || cardTable[line].length < total) return
    
    const thisLen = cardTable[line].length
    let flag = true
    for (let i = thisLen - 1; i > thisLen - total; i--) {
      const cardId = cardTable[line][i].cardId
      if (cardTable[line][i].cardNum !== cardTable[line][i - 1].cardNum - 1 || !originData[cardId] || !originData[cardId]['show'] ){
        flag = false
      }
    }
    if (flag) {
      let _originData = cloneDeep(originData)
      let _cardTable = cloneDeep(cardTable)
      
      for (let i = thisLen - 1; i >= thisLen - total; i--) {
        const cardId = cardTable[line][i].cardId
        const a = document.getElementById(`card-v${cardId}`)
        if (a) {
          a.style.left = 10 + successTimes * 16 + 'px'
          a.style.top = postCardTop + 'px'
          a.style.zIndex = 1000 + successTimes * 13- cardTable[line][i].cardNum
        }
      }
      successTimes += 1
      _cardTable[line].splice(thisLen - total, total)
      if (_cardTable[line].length) {
        const cardId = _cardTable[line][_cardTable[line].length - 1].cardId
        _originData[cardId].show = true
      }
      score += 100
      if (successTimes === cardPacks) {
        message.success('恭喜你，顺利通关！')
      } else {
        message.success('继续努力💪！')
      }

      this.setState({
        cardTable: _cardTable,
        originData: _originData
      })
    }
  }

  judgeSelectedCss = (index, idx) => {
    const { selectedObj } = this.state
    const isSelected = selectedObj.line === index && 
                        selectedObj.indexes && 
                          selectedObj.indexes.includes(idx)
    let isSelectedOne = false
    let isSelectedTop = false
    let isSelectedBottom = false
    let isSelectedSide = false
    if (isSelected) {
      if (selectedObj.indexes.length === 1) {
        isSelectedOne = true
      } else if (selectedObj.indexes.length >= 1){
        if (selectedObj.indexes[0] === idx) {
          isSelectedTop = true
        } else if (selectedObj.indexes[selectedObj.indexes.length - 1] === idx) {
          isSelectedBottom = true
        } else {
          isSelectedSide = true
        }
      }
    }
   return { isSelected, isSelectedOne, isSelectedTop, isSelectedBottom, isSelectedSide }
  }

  onPause = () => {
    const { paused } = this.state
    clearInterval(thisTimer)
    if (paused) {
      //启动定时
      thisTimer = setInterval(this.timer, 1000);
    } 
    this.setState({
      paused: !paused
    })
  }

  onSetHardLevel = (level) => {
    const { selectedHardLevel: originLevel } = this.state
    this.setState({
      selectedHardLevel: level
    }, () => {
      if (level != originLevel) {
        Modal.confirm({
          title: '您选择列新的难度，要重新开始吗？',
          cancelText: '下次',
          okText: '重来',
          onOk: () => {
            this.onReset()
          },
        })
      }
    })
  }

  onChangeHardLevel = () => {
    const { selectedHardLevel: originLevel } = this.state
    let keys = Object.keys(hardLevelObj)
    let index = keys.indexOf('' + originLevel)
    if (index === 0) {
      index = 1
    } else if (index === keys.length - 1) {
      index = 0
    } else {
      index += 1
    }
    this.setState({
      selectedHardLevel: keys[index]
    })
  }

  onReset = () => {
    clearInterval(thisTimer)
    cardIndex = 0
    onceError = false
    thisTime = 0
    score = 0
    clickMore = 0
    successTimes = 0
    this.setState({
      selectedObj: {},
      cardTable: getOriginCardTable(),
      originData: [],
      useTime: originUseTime,
    }, () => {
      this.getOriginData()
    })
  }
  
  render() {

    let { cardTable, originData, selectedObj, useTime, paused, selectedHardLevel } = this.state
    const thisStyle = { width: imgWidth, height: imgHeight }
    const isMobile = !isPC()

    const menu = (
      <Menu>
        {
          Object.keys(hardLevelObj).map(item => (
            <Menu.Item 
              onClick={()=>this.onSetHardLevel(item)} 
              key={item} 
              className={classNames({'active': selectedHardLevel == item})}
            >
              {hardLevelObj[item]['name']}
            </Menu.Item>
          ))
        }
      </Menu>
    );

    return (
      <>
      <div className='spider-container'>
      <div className='spider-top'>
        <span className='left-show'>
          <span className='spider-score'>
            <span>分数：</span>
            <span className='spider-value'>{score}</span>
          </span>
          <span className='spider-time'>
            <span>用时：</span>
            <span className='spider-value'>{useTime}</span>
          </span>
        </span>
        
        <span className='right-btns'>
          {
            isMobile ?
            <Button 
              shape='round' 
              size='small'
              onClick={this.onChangeHardLevel}
            >
              {hardLevelObj[selectedHardLevel]['name'] }
            </Button>
            :
            <Dropdown 
              overlay={menu} 
              placement='bottomCenter' 
              overlayClassName='hard-dropdown'
            >
              <Button 
                shape='round' 
                size='small'
              >
                {hardLevelObj[selectedHardLevel]['name'] }
              </Button>
            </Dropdown>
          }
        
          <Button 
            type='primary' 
            shape='round' 
            size='small'
            onClick={this.onPause}
          >
            {paused ? '继续' : '暂停'}
          </Button>
          <Button 
            type='danger' 
            shape='round' 
            className='reset' 
            size='small'
            onClick={this.onReset}
          >
            重来
          </Button>
        </span>
      </div>
      {/* <div id='test' style={{ overflow: 'scroll', minHeight: 400, maxHeight: 'calc(100vw - 24px)' }}> */}
      <div 
        className='spider-wrap' 
        ref={ref=>this.spiderWrap=ref} 
        style={{ paddingTop: wrapPaddingTop, paddingLeft: wrapPaddingLeft }}
      > 
        {
          paused &&
          <div className='pause-mask' onClick={this.onPause}>
            <PauseCircleOutlined />
          </div>
        }
        {
          tenArr.map((item, index) => (
            <div 
              key={item} 
              className='card-bg'
              data-line={index}
              data-index={-1}
              style={{
                ...thisStyle,
                left: getLeft(index),
                top: getTop(0),
                position: 'absolute'
              }}
            >
            </div>
          ))
        }
        {
            originData.map((item, index) => {
              let _item = item.show ? item.cardNum : 'back'
              let left = postCardLeft 
              if (index >= firstShowNum) {
                left = postCardLeft - 6 * Math.floor((index - firstShowNum) / 10)
              }
              return (
                <span
                  key={index}
                  id={`card-v${index}`}
                  data-line={-1}
                  data-index={-1}
                  data-type='origin'
                  style={{
                    ...thisStyle,
                    position: "absolute",
                    left,
                    top: postCardTop,
                    zIndex: left,
                    transition: `top ${annimationDuration}s, left ${annimationDuration}s`
                  }}
                  className={classNames(
                    `origin-card card cardv${_item}`,
                  )}
                ></span>
              )
            })
          }
          {
            successTimes === cardPacks &&
            <div className='next-game'>
              <Button type='primary' shape='round' onClick={this.onReset}>下一局</Button>
            </div>
          }
        </div>
      </div>
      {/* </div> */}
      </>
    )
  }
}

export default SpiderCard