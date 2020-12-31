var Links = {
  setColor:function(color){
    // var alist = document.querySelectorAll('a');
    // var i = 0;
    // while(i<alist.length){
    //   alist[i].style.color = color;
    //   i++;
    // }
    //위와 똑같은 역할
    $('a').css('color',color);
  }
}
var Body = {
  setColor:function(color){
    //document.querySelector('body').style.color = color;
    $('body').css('color', color);
  },
  setBackgroundColor:function(color){
    //document.querySelector('body').style.backgroundColor = color;
    $('body').css('backgroundColor', color);
  }
}
function nightDayHandler(self){
  var target = document.querySelector('body');
  var nav = $('.nav');
  if(self.value === 'night'){
    Body.setBackgroundColor('black');
    Body.setColor('white');
    self.value = 'day';
    nav.css('background-color', '#FF6D33');
    Links.setColor('#FFF433');
  } else{
    Body.setBackgroundColor('white');
    Body.setColor('black');
    self.value = 'night';
    nav.css('background-color', '#D0EC82');
    Links.setColor('#257891');
  }
}
