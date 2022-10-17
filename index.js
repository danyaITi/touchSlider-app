const wrapper  = document.querySelector('.wrapper')
const sliders = Array.from(document.querySelectorAll('.slider'))

const goNext = document.querySelector('.slider-btn')
const toHome = document.querySelector('.home-img')

const openModal = document.querySelector('.btn-modal')
const sliderBox = document.querySelector('.slider-modal')
const mainImg = document.querySelector('.main-img')

let isDragging = false, startPositionition=0, currentTranslate= 0, prevTranslate = 0, animationID = 0, currentIndex = 0

sliders.forEach((slider,index) => {

  slider.addEventListener('touchstart', touchStart(index))
  slider.addEventListener('touchend', touchEnd)
  slider.addEventListener('touchmove', touchMove)

  slider.addEventListener('mousedown', touchStart(index))
  slider.addEventListener('mouseup', touchEnd)
  slider.addEventListener('mousemove', touchMove)
  slider.addEventListener('mouseleave', touchEnd)
})


window.addEventListener('resize', setPositionByIndex) 

goNext.addEventListener('click', function(){
  currentTranslate = 1 * -window.innerWidth
  prevTranslate = currentTranslate
  setSliderPosition()
  currentIndex=1
})

toHome.addEventListener('click',function(){
  currentTranslate = 0 * -window.innerWidth
  prevTranslate = currentTranslate
  setSliderPosition()
  currentIndex=0
})

openModal.addEventListener('click', function(){
  sliderBox.classList.add('openModal');
  mainImg.style.visibility = 'hidden';
  openModal.style.visibility = 'hidden';
})


function getPosition(event){
  return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX
}

function touchStart(index){
  return function(event){
    currentIndex = index
    startPosition = getPosition(event)
    isDragging = true;
    animationID = requestAnimationFrame(animation)
  }
}

function touchMove(event){
  if(isDragging){
    const currentPos = getPosition(event)
    currentTranslate = prevTranslate + currentPos - startPosition
  }
}

function touchEnd(){
  cancelAnimationFrame(animationID)
  isDragging = false

  const movedBy = currentTranslate - prevTranslate

  if(movedBy < -100 && currentIndex < sliders.length - 1){
    currentIndex += 1
  }

  if(movedBy > 100 && currentIndex > 0){
    currentIndex -= 1
  }

  setPositionByIndex()

  cancelAnimationFrame(animationID)
}

function animation(){
  setSliderPosition()

  if(isDragging){
    requestAnimationFrame(animation)
  }
}

function setPositionByIndex(){
  currentTranslate = currentIndex * -window.innerWidth
  prevTranslate = currentTranslate
  setSliderPosition()  
}

function setSliderPosition(){
  wrapper.style.transform = `translateX(${currentTranslate}px)`
}  