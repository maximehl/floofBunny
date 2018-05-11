/*center coord: x=210
 * top left: 90, 210
 * top right: 330, 210
 * bottom right: 380, 300
 * bottom left: 40, 210
 */

/*floof boundaries
 * top left: 85, 195
 * bottom left: 44, 271
 * bottom right: 336, 271
 * top right: 295, 195
 * left side slope: (195-271)/(85-44) = (-76/41)
 * left side equation:  (y - 195) = (-76/41)(x - 85)
 *                      (-41/76)y + 105.1974 + 85 = x
 *                      -0.5395y + 190.1974 = x
 * right side slope: (195-271)/(295-336) = (76/41)
 * right side equation: (y - 195) = (76/41)(x - 295)
 *                      (41/76)y - 105.1974 + 295 = x
 *                      0.5395y + 189.8026 = x
 */

$(document).ready(function(){
    $(document).mousemove(function(){
        var floof = $("#floof");
        var targetX;
        if(floof.attr("src")==="floofbunny-left.png"){
            targetX = event.clientX - 15;
        }else{
            targetX = event.clientX - 25;
        }
        if(targetX<parseInt(floof.css("left"))){
            floof.attr("src", "floofbunny-left.png");
        }else{
            floof.attr("src", "floofbunny-right.png");
        }
    });

    $(document).on("click", function(){
        var floof = $("#floof");
        var targetX;
        if(floof.attr("src")==="floofbunny-left.png"){
            targetX = event.clientX - 15;
        }else{
            targetX = event.clientX - 25;
        }
        var targetY = event.clientY - 25;
        if(targetY>271){
            targetY = 271;
        }else if(targetY<195){
            targetY = 195;
        }
        var leftEdgeX = (-0.5395*targetY) + 190.1974;
        var rightEdgeX = (0.5395*targetY) + 189.8026;
        if(targetX<leftEdgeX){
            targetX = leftEdgeX;
        }else if(targetX>rightEdgeX){
            targetX = rightEdgeX;
        }
        floof.css({"left":targetX, "top":targetY});
    });
});

function randText(){
    var texts = ["Floofbunny is happy to see you!",
        "Floofbunny bounces gently from side to side.",
        "Floofbunny bounces gently up and down.",
        "Floofbunny bounces gently forwards and backwards.",
        "Floofbunny makes a soft purring noise.",
        "Floofbunny wonders how you're feeling.",
        "Floofbunny hopes you're having a good day.",
        "Floofbunny is glad you have time to come hang out.",
        "Floofbunny would smile, if floofbunny had a mouth."];
    nextText(texts[Math.floor(Math.random() * Math.floor(texts.length))]);
}

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
    oldText.css({"top":"-3.3em", "opacity":0});
    newText.css({"transition":"0.8s ease-out", "top":"-3em", "opacity":1});
}