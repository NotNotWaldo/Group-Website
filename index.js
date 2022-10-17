
import * as test from './imgsrc/importer.js'
import background from './imgsrc/background.jpg'

let rightArrow = (
<svg width="48px" height="48px" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="48" height="48" fill="white" fill-opacity="0.01"/>
<path d="M19 12L31 24L19 36" stroke="black" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
)

let leftArrow = (
  <svg width="48px" height="48px" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="48" height="48" fill="white" fill-opacity="0.01"/>
<path d="M31 36L19 24L31 12" stroke="black" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

)

let downArrow = (
  <svg width="48px" height="48px" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="48" height="48" fill="white" fill-opacity="0.01"/>
<path d="M37 18L25 30L13 18" stroke="black" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
)

let memberList = ['test1', 'test2']

let categoryList = [
  {
    name: 'category1',
    images: ['a', 'b'],
    index: 0
  },
  {
    name: 'category2',
    images: ['c', 'd'],
    index: 1
  },
  {
    name: 'category3',
    images: ['e', 'f'],
    index: 2
  },
  {
    name: 'category4',
    images: ['c', 'b'],
    index: 3
  }
]

class App extends React.Component {
  constructor(props) {
    super(props)
  
    this.state = {
       testNum: 1,
       currCategory: 0,
       currImg: 0,
       imgWidth: 0,
       catBtnWidth: 0,
       catBtnHeight: 0
    }
    this.categorySlider = this.categorySlider.bind(this)
    this.categoryChooser = this.categoryChooser.bind(this)
    this.imageSlider - this.imageSlider.bind(this)
  }

  categorySlider(dir) {
    switch (dir) {
      case 'prev':
        if (this.state.currCategory !== 0) {
          this.setState(state => ({
            currCategory: state.currCategory - 1
          }))
        }
        break;
      case 'next':
        if (this.state.currCategory < categoryList.length - 1) {
          this.setState(state => ({
            currCategory: state.currCategory + 1
          }))
        }
    }
  }

  categoryChooser(num) {
    setTimeout(() => {
      this.setState(state => ({
        currCategory: num,
        currImg: 0
      }))
    }, 350);
    
    let imgElem = document.querySelector('#currImg')
    if (/catBtnAct/.test(imgElem.className)) {
      imgElem.classList = ''
      setTimeout(() => {
        imgElem.className = 'catBtnAct'
      }, 0);
    } else {
      imgElem.className = 'catBtnAct'
    }
  }

  catChoiceAct() {
    let elem = document.querySelector('#categoryList')
    if (/catBtnAct/.test(elem.className)) {
      elem.className = ''
    } else {
      elem.className = 'catBtnAct'
    }
  }

  imageSlider(dir) {
    switch (dir) {
      case 'prev':
        if (this.state.currImg !== 0) {
          this.setState(state => ({
            currImg: state.currImg - 1
          }))
        }
        break;
      case 'next':
        if (this.state.currImg < categoryList[this.state.currCategory].images.length - 1) {
          this.setState(state => ({
            currImg: state.currImg + 1
          }))
        }
    }
    let elem = document.querySelector(`#${dir}Btn`)
    if (/imgBtnAct/.test(elem.className)) {
      elem.className = elem.className.slice(0, elem.className.length - 9)
      setTimeout(() => {
        elem.className = elem.className.concat(' imgBtnAct')
      }, 0);
    } else {
      elem.className = elem.className.concat(' imgBtnAct')
      
    }
    
  }

  componentDidMount() {
    let imgCatEx = document.querySelector('.images')
    let imgWidthFinal = imgCatEx.clientWidth
    let catListBtn = document.querySelector('#categoryListBtn')
    this.setState({
      catBtnWidth: catListBtn.clientWidth,
      catBtnHeight: catListBtn.clientHeight,
      imgWidth: imgWidthFinal
    })
    
  }

  render() {
    return (
      <>
        <div id='nav'>
          <div id='mainNav'>  
            <div id='navBtns'>
              
                <a className='navBtn' href='#hero'>Home</a>
                <a className='navBtn' href='#images'>Gallery</a>
                <a className='navBtn' href='#about'>About</a>
              
            </div>
            <div id='logo'>
              <h1>LOGO HERE LMAO</h1>
            </div>
          </div>  
        </div>

        <div id='hero'>
          <img src={background} id='background' alt='test'/>
          <div id='mask'></div>
          <h1>Introduction</h1>
          <h3>Put Desc here lol</h3>
        </div>

        <div id='breaker'>

        </div>

        <div id='images'>

          {/*<div id='imgBtns'>
            <div onClick={() => this.categorySlider('prev')}>Prev</div>
            <div onClick={() => this.categorySlider('next')}>Next</div>
          </div>*/}

          <div id='catBtns'>
            <div id='imageBtns'>
              <div id='next' className='leImgBtn'>
                <h5>Prev Img</h5>
                <div className='svgCon' id='prevBtn' onClick={() => this.imageSlider('prev')}>{leftArrow}</div>
              </div>
              <div id='prev' className='leImgBtn'>
                <h5>Next Img</h5>
                <div className='svgCon' id='nextBtn' onClick={() => this.imageSlider('next')}>{rightArrow}</div>
              </div>

            </div>
            
            <div onClick={this.catChoiceAct} id='categoryListBtn'>
              <div className='btn'>
                <h3>Choose Category</h3>
                <div>{downArrow}</div>
              </div>
              <div className='catBtnAct' id='categoryList'>
                {categoryList.map(cat => {
                  return (
                    <div className='catItem' style={{height: this.state.catBtnHeight}} onClick={() => this.categoryChooser(cat.index)}>{cat.name}</div>
                  )
                })}
              </div>
            </div>
          </div>

          <div id='current'>
            <h3>{categoryList[this.state.currCategory].name}</h3>
            <div id='imgSlide'>
              <div id='fade'></div>
              <div id='currImg' style={{left: `calc(${ -(this.state.currImg * 100)}% - ${this.state.currImg * (this.state.imgWidth)}px + 50% - ${this.state.imgWidth / 2}px)`, gridTemplateColumns: `repeat(${categoryList[this.state.currCategory].images.length}, ${this.state.imgWidth}px)`}}>
              {categoryList[this.state.currCategory].images.map(curr => (<img style={{objectFit: 'cover'}} className='images' src={test[curr]}/>))}
              </div>
            </div>
          </div>
        </div>
        <hr></hr>
        <div id='about'>
          <div className='desc'>
            <h4>About this website:</h4>
            <p>This is the website created by group 2 for their project in EMPTECH. Didn't used any website builder lmao</p>
          </div>

          <div className='members'>
            <h5>Members:</h5>
            <div id='membersList'>
              {memberList.map(member => {
                return (
                  <p>{member}</p>
                )
              })}
            </div>
          </div>
        </div>
        
      </>
    )
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />)


/*
FOR DELETION:
    this.testEvent = this.testEvent.bind(this)

{imageList.map(img => <img src='/NotNorProjs/groupwebsite/src/imgsrc/HARD1.jpg' alt='test' />)}
 testEvent(num) {
    let newNum = parseInt(num)
    console.log(newNum)
    this.setState(state => ({
      testNum: state.testNum + newNum
    }))
  }
<div onClick={() => {this.testEvent('30')}}>
        {this.state.testNum}, click to add
        </div>

*/