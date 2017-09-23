(function() {
  var rangeX = document.getElementById('rotateX');
  var rangeY = document.getElementById('rotateY');
  var rangeZ = document.getElementById('rotateZ');
  var animateCb = document.getElementById('makeAnimation');
  var mainDiv = document.getElementById('main');

  rangeX.addEventListener('change', function(){ rotateCube(); });
  rangeY.addEventListener('change', function(){ rotateCube(); });
  rangeZ.addEventListener('change', function(){ rotateCube(); });
  animateCb.addEventListener('change', function(){
    if(animateCb.checked){
      mainDiv.className += 'animate';
      rangeX.disabled = rangeY.disabled = rangeZ.disabled = true;
    }
    else{
      mainDiv.className = '';
      rangeX.disabled = rangeY.disabled = rangeZ.disabled = false;
    }
  });

  function rotateCube(){
   mainDiv.style.webkitTransform =
   'rotateX(' + rangeX.value + 'deg)' +
   'rotateY(' + rangeY.value + 'deg)' +
   'rotateZ(' + rangeZ.value + 'deg)';

   rangeX.parentNode.children[0].children[0].innerText = rangeX.value + ' deg';
   rangeY.parentNode.children[2].children[0].innerText = rangeY.value + ' deg';
   rangeZ.parentNode.children[4].children[0].innerText = rangeZ.value + ' deg';
 }
})();