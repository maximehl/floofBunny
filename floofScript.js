/*center coord: x=210
 * top left: 90, 210
 * top right: 330, 210
 * bottom right: 380, 300
 * bottom left: 40, 210
 */

/*floof boundaries
 * actual corners
 * top left: 90, 210                80, -290
 * bottom left: 40, 300             30, -200
 * top right: 330, 210
 * bottom right: 380, 300
 *
 * left side slope: (300-210)/(40-90) = (-9/5)
 * left side equation:  (y - 210) = (-9/5)(x - 90)
 *                      (-5/9)y + (5/9)210 = x - 90
 *                      (-5/9)y + 116.6667 + 90 = x
 *                      -0.5555y + 206.6667 = x
 * right side slope: (9/5)
 * right side equation: (y - 210) = (-9/5)(x - 330)
 *                      (5/9)y - (5/9)210 = x - 330
 *                      (5/9)y - 116.6667 + 330 = x
 *                      0.5555y + 213.3333 = x
 */

var floof;
var eyeLeft;
var eyeRight;
var eyeProps;
const DOCMARGIN = 8;

$(document).ready(function(){
    floof = $("#floof");
    eyeLeft = $("#eyeLeft");
    eyeRight = $("#eyeRight");
    eyeProps = $("#eyeLeft, #eyeRight");
    propChange("bodType");
    propChange("eyeType");
    $("#thoughtContainer").css("height", detReqHeight($("#exitThought")));

    $("input, .menu").on("click", function(){
        event.stopPropagation();
    });

    $(document).mousemove(function(){
        var targetX = event.clientX - (bodWidth/2);
        var leftDist;
        if(targetX<(parseFloat(floof.css("left"))+(DOCMARGIN))){
            leftDist = (bodWidth-maxEyeDisp)-(eyeWidth/3);
            eyeLeft.css("left",leftDist);
            eyeRight.css("left",leftDist+eyeSep);
            floof.data("facing", "left");
        }else{
            leftDist = maxEyeDisp-(eyeWidth*2/3);
            eyeRight.css("left",leftDist);
            eyeLeft.css("left",leftDist-eyeSep);
            floof.data("facing", "right");
        }
    });

    $(document).on("click", function(){
        var newX = event.clientX-(bodWidth/2);
        var newY = event.clientY-(1.2*bodHeight*bodTypeRatios[bodType][5])-40;
        if(bouncing===0){
            floof.data({"x-pos":newX, "y-pos":newY});
            checkEdgeCollision(newX, newY);
        }
    });
});

function checkEdgeCollision(targetX, targetY){
    var bottomEdge = 300 - bodHeight - 3;
    var topEdge = 210 - (bodHeight*bodTypeRatios[bodType][5]);
    if(targetY>bottomEdge){
        targetY = bottomEdge;
    }else if(targetY<topEdge){
        targetY = topEdge;
    }
    var leftEdgeX = (-0.5555*(targetY+bodHeight)) + 206.6667;
    var rightEdgeX = (0.5555*(targetY+bodHeight)) + 213.3333;
    //these edges don't include offset for gaps or creature size
    leftEdgeX+=3-(bodWidth*(1-bodTypeRatios[bodType][6]));
    rightEdgeX-=(bodWidth*bodTypeRatios[bodType][6])+3;
    //now they do
    if(targetX<leftEdgeX){
        targetX = leftEdgeX;
    }else if(targetX>rightEdgeX){
        targetX = rightEdgeX;
    }
    floof.css({"left":targetX-DOCMARGIN, "top":targetY-500});
}

//height/width, border-radius, width multiplier
var eyeTypeRatios = [[8/5, [3/5], 1], [1, [1], 1.4], [5/8, [3/5], 8/5], [1.41, [2, 2, 0, 0], 1],
                    [8/5, [0.5, 0.5, "/", 1, 1], 1]];
//eye dist. from top (proportion of height), max eye movement, eyeSep (proportion of width),
// height/width ratio, border-radius, top height proportion (for room movement), side height proportion,
// width multiplier
var bodTypeRatios = [[0.65, 1, 5/8, 3/4, [.5, .5, .3, .3], 0.7, 0.95, 1],
                    [0.5, 0.85, 2/5, 1, [0.2], 0.6, 1, 0.8],
                    [0.6, 0.9, 0.6, 1, [1], 0.8, 0.8, 0.9],
                    [0.3, 1.1, 0.5, 3/2, [0.3, 0.3, .2, .2, "/", 1, 1, .2, .2], 0.7, 0.95, 0.7],
                    [0.3, 0.8, 0.4, 0.5, [1], 0.7, 0.9, 1.3],
                    [0.7, 1, 0.5, 8/5, [1, 1, .4, .4, "/", 3, 3, .4, .4], 0.8, 0.9, 0.7],
                    [0.4, 1.1, 0.7, 7/5, [2, 2, 2.5, 2.5, "/", 2, 2, 4.2, 4.2], 0.9, 0.7, 0.8]];
var bodType = 0;
var bodWidth = 40;
var bodHeight = 30;
var eyeSep = 25;
var maxEyeDisp = 40;
var setTop = 15;
var eyeWidth = 5;
var eyeType = 0;
var newName = "Floofbunny";
var eyeHeight = 8;
function propChange(propName) {
    var curCenterX = parseFloat(floof.css("left"));
    var curTop = parseFloat(floof.css("top"));
    var oldHeight = bodHeight;
    var oldWidth = bodWidth;
    var oldType = bodType;
    eyeType = parseInt($("#eyeTypeSet").val());
    eyeWidth = parseFloat($("#eyeSizeSet").val())*eyeTypeRatios[eyeType][2];
    eyeHeight = eyeWidth*eyeTypeRatios[eyeType][0];
    bodType = parseInt($("#bodTypeSet").val());
    bodWidth = parseFloat($("#bodSizeSet").val())*bodTypeRatios[bodType][7];
    bodHeight = bodWidth*bodTypeRatios[bodType][3];
    setTop = (bodHeight*bodTypeRatios[bodType][0])-(eyeHeight/2);
    maxEyeDisp = bodWidth*bodTypeRatios[bodType][1];
    eyeSep = bodWidth*bodTypeRatios[bodType][2];
    switch(propName){
        case "name":
            newName = $("#nameSet").val();
            texts = [newName + " is happy to see you!",
                newName + " bounces gently from side to side.",
                newName + " bounces gently up and down.",
                newName + " bounces gently forwards and backwards.",
                newName + " makes a soft purring noise.",
                newName + " wonders how you're feeling.",
                newName + " hopes you're having a good day.",
                newName + " is glad you have time to come hang out.",
                newName + " would smile, if " + newName + " had a mouth.",
                newName + " waits patiently.",
                newName + " loves you quite a lot.",
                newName + " thinks you look great today.",
                newName + " makes an agreeable humming noise.",
                newName + " hums gently.",
                newName + " ponders the mysteries of the universe.",
                newName + " attempts to find the square root of 41.",
                newName + " travels gradually through the fourth dimension."];
            break;
        case "bodCol":
            floof.css("background-color", $("#bodColSet").val());
            break;
        case "eyeSize":
        case "eyeType":
            eyeProps.css({"width":eyeWidth, "height":eyeHeight,
                "border-radius":multAppendPx(eyeTypeRatios[eyeType][1], eyeWidth), "top":setTop});
            eyeRight.css("top", setTop-eyeHeight);
            break;
        case "bodSize":
        case "bodType":
            var leftDist;
            if(floof.data("facing")==="left"){
                leftDist = (bodWidth-maxEyeDisp)-(eyeWidth/3);
                eyeLeft.css("left",leftDist);
                eyeRight.css("left",leftDist+eyeSep);
            }else{
                leftDist = maxEyeDisp-(eyeWidth*2/3);
                eyeRight.css("left",leftDist);
                eyeLeft.css("left",leftDist-eyeSep);
            }
            eyeLeft.css({"top":setTop});
            eyeRight.css({"top":setTop-eyeHeight});
            floof.css({"width":bodWidth, "height":bodHeight,
                "border-radius":multAppendPx(bodTypeRatios[bodType][4], bodWidth)});
            floof.css({"top":curTop+((oldHeight-bodHeight)), "left":curCenterX+((oldWidth-bodWidth)/2)});
            var newX = parseFloat(floof.data("x-pos"))+(oldWidth/2)-(bodWidth/2);
            var newY = parseFloat(floof.data("y-pos"))+(1.2*oldHeight*bodTypeRatios[oldType][5])-(1.2*bodHeight*bodTypeRatios[bodType][5]);
            floof.data({"x-pos":newX, "y-pos":newY});
            checkEdgeCollision(newX, newY);
            break;
    }
}

function multAppendPx(multRatios, thingWidth){
    var returnSettings = "";
    for(var n=0; n<multRatios.length; n++){
        if(multRatios[n]==="/"){
            returnSettings+=" / ";
            n++;
        }
        returnSettings += thingWidth*multRatios[n] + "px ";
    }
    return returnSettings;
}

(function blinkLoop(){
    var timeWait = Math.floor(Math.random()*6000)+1000;
    setTimeout(function(){
        blink();
        blinkLoop();
    }, timeWait);
}());

function blink(){
    eyeProps.css({"height":0.25*eyeHeight, "top":setTop+(eyeHeight*5/8)});
    eyeRight.css("top", setTop+(eyeHeight*3/8));
    setTimeout(function(){
        eyeProps.css({"height":eyeHeight, "top":setTop});
        eyeRight.css("top", setTop-eyeHeight);
    }, 300);
}

(function bounceLoop(){
    var timeWait = Math.floor(Math.random()*10000)+2000;
    setTimeout(function(){
        bounce();
        bounceLoop();
    }, timeWait);
}());

var bouncing = 0;
function bounce(){
    bouncing=1;
    var curTop = parseFloat(floof.css("top"));
    var curLeft = parseFloat(floof.css("left"));
    floof.css({"height":0.8*bodHeight, "width":1.2*bodWidth, "top":curTop+(0.2*bodHeight), "left":curLeft-(0.1*bodWidth)});
    setTimeout(function(){
        floof.css({"height":bodHeight, "width":bodWidth, "top":curTop, "left":curLeft});
        bouncing=0;
    }, 400);
}

(function thinkLoop(){
    var timeWait = Math.floor(Math.random()*10000)+10000;
    setTimeout(function(){
        randText();
        thinkLoop();
    }, timeWait);
}());

var currentText = 0;
var texts = ["Floofbunny is happy to see you!",
    "Floofbunny bounces gently from side to side.",
    "Floofbunny bounces gently up and down.",
    "Floofbunny bounces gently forwards and backwards.",
    "Floofbunny makes a soft purring noise.",
    "Floofbunny wonders how you're feeling.",
    "Floofbunny hopes you're having a good day.",
    "Floofbunny is glad you have time to come hang out.",
    "Floofbunny would smile, if floofbunny had a mouth."];
function randText(){
    var prevText = currentText;
    while(currentText===prevText){
        currentText = Math.floor(Math.random() * Math.floor(texts.length));
    }
    nextText(texts[currentText]);
}

var prevHeight = 70.1818-16;
function nextText(thoughtText){
    var newText = $("#enterThought");
    var oldText = $("#exitThought");
    oldText.html(newText.html());
    oldText.css({"transition":"0s", "top":0, "opacity":1});
    oldText.css("transition");
    oldText.css("transition", "0.8s ease-out");
    oldText.css("transition");
    newText.css({"transition":"0s", "top":0, "opacity":0});
    newText.css("transition");
    newText.html(thoughtText);
    var heightNeeded = detReqHeight(newText)-16;
    oldText.css({"top":((-1.1*heightNeeded)), "opacity":0});
    newText.css({"transition":"0.8s ease-out", "top":(-1*prevHeight), "opacity":1});
    $("#thoughtContainer").css("height", (heightNeeded+16));
    prevHeight = heightNeeded;
}

function detReqHeight(objNeeded){
    var clone = $(objNeeded).clone().css("height", "auto").appendTo("body");
    var heightNeeded = clone.outerHeight(true);
    clone.remove();
    return heightNeeded;
}