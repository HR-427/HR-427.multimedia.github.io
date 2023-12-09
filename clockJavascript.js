var soundOne = new Audio('clockSound.mp3');
var soundTwo = new Audio('gameShowTick.mp3');
var soundThree = new Audio('grandfatherClock.mp3');
var soundFour = new Audio('quirkyTickingSound.mp3');

function mysteryOne()
{
    soundTwo.pause();
    soundTwo.currentTime = 0; 
    soundThree.pause();
    soundThree.currentTime = 0; 
    soundFour.pause(); 
    soundFour.currentTime = 0; 
    soundOne.play(); 
    soundOne.loop = true; 
}

function mysteryTwo()
{
    soundOne.pause(); 
    soundOne.currentTime = 0; 
    soundThree.pause(); 
    soundThree.currentTime = 0;
    soundFour.pause(); 
    soundFour.currentTime = 0; 
    soundTwo.play();
    soundTwo.loop = true; 
}

function mysteryThree()
{
    soundOne.pause(); 
    soundOne.currentTime = 0; 
    soundTwo.pause(); 
    soundTwo.currentTime = 0;
    soundFour.pause(); 
    soundFour.currentTime = 0;
    soundThree.playbackRate = 3.5; 
    soundThree.play();
    soundThree.loop = true; 
}

function mysteryFour()
{
    soundOne.pause(); 
    soundOne.currentTime = 0; 
    soundTwo.pause(); 
    soundTwo.currentTime = 0;;
    soundThree.pause(); 
    soundThree.currentTime = 0;
    soundFour.playbackRate = 0.5; 
    soundFour.play(); 
    soundFour.loop = true; 
}

function pauseSound()
{
    soundOne.pause(); 
    soundTwo.pause();
    soundThree.pause(); 
    soundFour.pause(); 
    soundOne.currentTime = 0; 
    soundTwo.currentTime = 0; 
    soundThree.currentTime = 0; 
    soundFour.currentTime = 0; 
}

function goBack()
{
    history.back();
}

function goForward()
{
    history.go(1); 
}


$(document).ready(function ()
{
    setInterval(function ()
    {

        var seconds = new Date().getSeconds();
        var sdegree = seconds * 6;
        var srotate = "rotate(" + sdegree + "deg)";

        var mins = new Date().getMinutes(); 
        var mdegree = mins * 6;
        var mrotate = "rotate(" + mdegree + "deg)";

        var hour = new Date().getHours(); 
        var hdegree = hour*30+mins/2;
        var hrotate = "rotate(" + hdegree + "deg)";


        $("#secondHand").css({"transform": srotate
        });
        $("#minuteHand").css({"transform": mrotate
        });
        $("#hourHand").css({"transform": hrotate
        });
    }, 1000);
});

