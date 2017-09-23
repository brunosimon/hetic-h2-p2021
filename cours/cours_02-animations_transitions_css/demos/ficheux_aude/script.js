console.log('hello');
var sound = 0

function playmusic () {
	console.log("music!!!");
	sound = sound+1;
	var music1 = document.getElementById("mus1");
	var phone = document.getElementById("phone");
	var note1 = document.getElementById("note1");
	var note2 = document.getElementById("note2");
	var item1 = document.getElementById("item1");
	var item2 = document.getElementById("item2");
	var item3 = document.getElementById("item3");
	var item4 = document.getElementById("item4");
	var item5 = document.getElementById("item5");
	var item6 = document.getElementById("item6");
	var playpause = document.getElementById("playpause");

	if (sound%2==1) {
    	music1.play();
    	phone.className = "phone onplay";
    	note1.className = "note onplay";
    	note2.className = "note2 onplay";
    	item1.className ="rectangle item-1 onplay";
    	item2.className ="rectangle item-2 onplay";
    	item3.className ="rectangle item-3 onplay";
    	item4.className ="rectangle item-4 onplay";
    	item5.className ="rectangle item-5 onplay";
    	item6.className ="rectangle item-6 onplay";
    	playpause.className ="pause";
	}
	else {
		music1.pause();
		phone.className = "phone";
		note1.className = "note";
    	note2.className = "note2";
    	item1.className ="rectangle item-1"
    	item2.className ="rectangle item-2"
    	item3.className ="rectangle item-3"
    	item4.className ="rectangle item-4"
    	item5.className ="rectangle item-5"
    	item6.className ="rectangle item-6"
    	playpause.className ="play";
	}
}
