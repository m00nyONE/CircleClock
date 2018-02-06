//CircleClock by m00ny

var showWatchHands = false;
var enableSliding = true;

function setup() {

    size = createSlider(325,1200,325,10);
    size.position(10,10);

    createCanvas(800,800);
    angleMode(DEGREES);

    hrRed = createSlider(0,255,160,1);
    hrGreen = createSlider(0,255,11,1);
    hrBlue = createSlider(0,255,88,1);

    minRed = createSlider(0,255,60,1);
    minGreen = createSlider(0,255,13,1);
    minBlue = createSlider(0,255,216,1);

    secRed = createSlider(0,255,219,1);
    secGreen = createSlider(0,255,124,1);
    secBlue = createSlider(0,255,8,1);

    checkboxSliding = createCheckbox('show slide effect',true);
    checkboxSliding.changed(showSliding);

    hideOptions(); // COMMENT TO ENABLE PLAYGROUND MODE
}

function draw() {

    clocksize = size.value();

    var offset = 15;

    hrRed.position(width + offset, 0 + offset);
    hrGreen.position(width + offset, 15 + offset);
    hrBlue.position(width + offset, 30 + offset);

    minRed.position(width + offset, 60 + offset);
    minGreen.position(width + offset, 75 + offset);
    minBlue.position(width + offset, 90 + offset);

    secRed.position(width + offset, 120 + offset);
    secGreen.position(width + offset, 135 + offset);
    secBlue.position(width + offset, 150 + offset);

    frameRate(30);

    //rainbowClock(); //UNCOMMENT TO ENABLE RAINBOW MODE - WARNING !! FAST FLASHING LIGHTS

    background(0);
    translate(width/2,height/2);
    rotate(-90);

    let hr = hour();
    let min = minute();
    let sec = second();
    var d = new Date();
    var mil = d.getMilliseconds();
    noFill();

    strokeWeight(map(10,0,clocksize,0,height));
    stroke (secRed.value(), secGreen.value(), secBlue.value());
    let degMilliseconds = map(mil, 0, 1000 , 0, 6);
    let degSeconds = map(sec, 0, 60, 0, 360);
    if ( enableSliding ) {
        arc( 0, 0, map(300,0,clocksize,0,width), map(300,0,clocksize,0,height), 0, degSeconds + degMilliseconds);
    }else {
        if (sec % 60 !== 0) {
            arc( 0, 0, map(300,0,clocksize,0,width), map(300,0,clocksize,0,height), 0, degSeconds);
        }else {
            point(map(300/2,0,clocksize,0,height),0)
        }
    }
    if ( showWatchHands ) {
        push();
        if ( enableSliding ) {
            rotate(degSeconds + degMilliseconds);
        }else {
            rotate(degSeconds);
        }
        line( 0, 0, map(100,0,clocksize,0,height), 0);
        pop();
    }

    strokeWeight(map(10,0,clocksize,0,height));
    stroke (minRed.value(), minGreen.value(), minBlue.value());
    let degMinutes = map(min, 0, 60, 0, 360);
    if ( enableSliding ) {
        arc(0, 0, map(275, 0, clocksize, 0, width), map(275, 0, clocksize, 0, height), 0, degMinutes + degSeconds / 60);
    }else {
        if (min % 60 !== 0) {
            arc( 0, 0, map(275,0,clocksize,0,width), map(275,0,clocksize,0,height), 0, degMinutes );
        }else {
            point(map(275/2,0,clocksize,0,height) , 0)
        }
    }
    if ( showWatchHands ) {
        push();
        if ( enableSliding ) {
            rotate(degMinutes + degSeconds / 60);
        }else {
            rotate(degMinutes);
        }
        line( 0, 0, map(75,0,clocksize,0,height), 0);
        pop();
    }

    strokeWeight(map(10,0,clocksize,0,height));
    stroke (hrRed.value(), hrGreen.value(), hrBlue.value());
    let degHours = map(hr % 12 , 0, 12, 0, 360);
    if (hr + min % 12 !== 0) {
        arc( 0, 0, map(250,0,clocksize,0,width), map(250,0,clocksize,0,height), 0, degHours + ( 0.5 * min));
    }else {
        point(map(250/2,0,clocksize,0,height),0)
    }
    if ( showWatchHands ) {
        push();
        rotate(degHours + ( 0.5 * min));
        line( 0, 0, map(50,0,clocksize,0,height), 0);
        pop();
    }

    stroke(0);
    strokeWeight(map(20,0,clocksize,0,height));
    point(0,0);
}

//MAKE THE CLOCK FIT TO THE SCREEN
$(function() {
    $(window).resize(function() {
        var area = $('#body');
        $('#body').css({
            'margin-top'  : '-' + Math.round(area.height() / 2) + 'px',
            'margin-left' : '-' + Math.round(area.width() / 2) + 'px',
        });
    }).trigger('resize');
});

// FUNCTIONS FOR DEBUGGING & TOGGLES
function mouseClicked() {
    if (showWatchHands === false) {
        showWatchHands = true;
    } else {
        showWatchHands = false;
    }
}
function showSliding()
{
    if (this.checked()) {
        enableSliding = true;
    } else {
        enableSliding = false;
    }
}
function hideOptions()
{
    size.hide();
    hrRed.hide();
    hrGreen.hide();
    hrBlue.hide();
    minRed.hide();
    minGreen.hide();
    minBlue.hide();
    secRed.hide();
    secGreen.hide();
    secBlue.hide();
    checkboxSliding.hide();
}
function rainbowClock()
{
    hrRed.value(random(0,255));
    hrGreen.value(random(0,255));
    hrBlue.value(random(0,255));
    minRed.value(random(0,255));
    minGreen.value(random(0,255));
    minBlue.value(random(0,255));
    secRed.value(random(0,255));
    secGreen.value(random(0,255));
    secBlue.value(random(0,255));
}
