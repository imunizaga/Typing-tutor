// Prevent the backspace key from navigating back.
$(document).unbind('keydown').bind('keydown', function (event) {
    var doPrevent = false;
    if (event.keyCode === 8) {
        tutor.handleKeyPress(event.keyCode);
        doPrevent = true;
    }

    if (doPrevent) {
        event.preventDefault();
    }
});

$(function(){
    var content = new Content();
    var texts =   content.getText();

    tutor = new typingTutor(texts);
    tutor.initialize();
    debugBar = new debugBar()
    debug = false;
});

function capLock(e){
    var kc = e.keyCode?e.keyCode:e.which;
    var sk = e.shiftKey?e.shiftKey:((kc == 16)?true:false);
    if(((kc >= 65 && kc <= 90) && !sk)||((kc >= 97 && kc <= 122) && sk))
        $('#mayus').show();
    else
        $('#mayus').hide();
}

function debugBar(){
    var logCounter = 0;

    this.log = function(code){
        if(logCounter>15){
            $('#debug_bar').text("");
            logCounter = 0;
        }
        text = String.fromCharCode(code);
        if(debug){
            text = text + " (" + code + ")";
        }

        $('#debug_bar').append("<p>'"+text+"'</p>");
        logCounter++;
    }
}

function typingTutor(texts){
    var currentChar;
    var corrects;
    var accuracy;
    var started;

    // initialize interface
    $('i').tooltip('hide')
    $(".tip").popover('hide');


    // current text is the index of the text being displayed in the text array
    // We try to obtain it from the url of the page
    var currentText = parseInt(window.location.hash.substring(1)) - 1;

    // if the currentText is undefined
    if(currentText == undefined || isNaN(currentText)){
        // obtain the currentText from localStorage or set it to 0
        currentText = parseInt(localStorage.getItem('currentText')) || 0;
    }
    $('#current-lesson').text(currentText + 1);

    // text is the string that contains the text for the current Lesson
    var text = texts[currentText];

    // maxSeconds is the ammount of seconds the user has to complete the test
    this.maxSeconds =  parseInt(localStorage.getItem('maxSeconds') || 180);
    $('#max-minutes').val(parseInt(this.maxSeconds / 60));
    $('#max-seconds').val(this.maxSeconds % 60);

    // Set the targetAccuracy for the student
    this.targetAccuracy = localStorage.getItem('targetAccuracy') || 90;
    $('#target-accuracy').val(this.targetAccuracy);


    // set the sound on/off
    this.soundOn = JSON.parse(localStorage.getItem('soundOn')) || false;
    if(this.soundOn){
        $('#volume_off').hide();
    }
    else{
        $('#volume_on').hide();
    }
    var snd = new Audio("sounds/error.mp3");

    // map the right hand letters
    this.rightLetters = {
        h: 0, j: 0, y: 0, u: 0, n: 0, m: 0,
        i: 1, k: 1, ',': 1,
        o: 2, l: 2, '.': 2, "?": 2,
        p: 3, 'ñ': 3, '-': 3, '\n': 3, "¿": 3, "¡": 3, 'á': 3, 'é': 3,
        ' ': '4',
        'ú': 5, 'í': 6, 'ó':7 
    }

    // map the left hand letters
    this.leftLetters = {
        r: 0, f: 0, v: 0, t: 0, g: 0, b: 0,
        e: 1, d: 1, c: 1, 'é': 1,
        w: 2, s: 2, x: 2,
        q: 3, a: 3, z: 3, 'á': 3, '!': 3, 1: 3,
        '': 4
    };

    this.getHand = function(letter){
        lowerLetter = letter.toLowerCase()
        if(this.rightLetters[lowerLetter] != undefined){
            return "right";
        }
        else {
            return "left";
        }
    };

    this.updateMaxSeconds = function(){
        var minutes = parseInt($('#max-minutes').val());
        var seconds = parseInt($('#max-seconds').val());
        this.maxSeconds = minutes * 60 + seconds;
        localStorage.setItem('maxSeconds', this.maxSeconds);
    }

    this.updateTargetAccuracy = function(){
        this.targetAccuracy = parseInt($('#target-accuracy').val());
        localStorage.setItem('targetAccuracy', this.targetAccuracy);
    }

    this.volumeOn = function(){
        this.soundOn = true;
        localStorage.setItem('soundOn', this.soundOn);
        $('#volume_on').show();
        $('#volume_off').hide();
    }

    this.volumeOff = function(){
        this.soundOn = false;
        localStorage.setItem('soundOn', this.soundOn);
        $('#volume_on').hide();
        $('#volume_off').show();
    }

    this.updateImages = function(){
        /* This method returns sets the images for the righthand and the left
         * hand
         * */
        var letter = text[currentChar];
        if(letter == undefined){
            letter = "\n";
        }
        
        var rightIndex = this.rightLetters[letter.toLowerCase()];
        var leftIndex = this.leftLetters[letter.toLowerCase()];

        // if it's a capital letter
        if(/[A-Z]/.test(letter))
            if(rightIndex == undefined)
                rightIndex = 3;
            else
                leftIndex = 3;

        if(rightIndex == undefined)
            rightIndex = "";

        if(leftIndex == undefined)
            leftIndex = "";

        $("#right-hand").attr("src","img/hands-r"+ rightIndex +".png");

        $("#left-hand").attr("src","img/hands-l"+ leftIndex +".png");
    };

    this.showTips = function(){
        var $el = $('.time-tip');

        $el.popover('show');

        $('.close-time-tip').click(function(){
            $el.popover('hide');
        });

        setTimeout(function(){
            $el.popover('hide');
        }, 15000);
    }

    this.restart = function(){
        currentChar = 0;
        corrects = 0;
        accuracy = 0;
        started = false;
        this.ended = false;
        this.passed = false;
        this.words_pressed = 0;

        this.stopTimer();
        this.restartTimer();
        this.updateTimerValue();

        $('#text').text("");

        var letter = "";

        for(var i=0; i< text.length; i++)
        {
            var $text = $('#text');
            var id = "letter_" + i;
            var html = "";
            if(text[i] == "\n"){
                html += "<div class='letter right' id='" + id + "'>";
                html += "<img src='img/enter.png' class='enter'/>";
                html += "</div>";
                html += "<br>";
                $text.append(html);
                continue
            }

            if(text[i] == " "){
                letter = "&nbsp;";
            }
            else{
                letter = text[i];
            }
            var hand = this.getHand(text[i]);
            var className =  "letter " + hand;
            html += "<div class='" + className  + "' id='" + id + "'>";
            html += letter;
            html += "</div>";
            $text.append(html);
        }

        $("#letter_0").addClass("current");
        $('#bad-results').hide();
        $('#good-results').hide();
        $('#pause').hide();
        this.showTips();
        $("#my_image").attr("src","img/hands.png");
        $('#mayus').hide();
        $('#play').show();
        this.updateProgress();
    }

    this.initialize = function(){
        var inputLetter;
        var correctLetter;
        var keycode;

        $(window).keypress(function(event) {
            keycode = event.which;
            capLock(event);
            debugBar.log(keycode);
            tutor.handleKeyPress(keycode);
        });

        this.restart();
    }

    this.handleKeyPress = function(keycode){
        // while the tutor has not eneded
        keyIsEnter = (keycode == 13);
        keyIsDelete = (keycode == 8);
        if(!tutor.ended){
            var marks = (keycode == 33 || keycode == 63 || keycode == 161
                    || keycode == 191)
            var commaDotOrLine = (keycode >= 44 && keycode <= 46);

            var integer = (keycode >= 48 && keycode <= 57);

            var keyWithinLetters = ((keycode >=65 && keycode <= 122) ||
                                keycode == 241 || keycode == 209);

            var vowelWithTilde = (keycode == 225 || keycode == 233  ||
                              keycode ==237  || keycode ==243  ||
                              keycode ==250);

            if(keyWithinLetters || keyIsEnter || keycode == 32 || marks ||
                keyIsDelete || commaDotOrLine || vowelWithTilde || integer){

                this.words_pressed++;
                if(!started){
                    tutor.start();
                }

                if(keyIsDelete){
                    if(currentChar > 0){
                        // not sure if I should implemente the delete function
                    }
                }
                else{
                    $("#letter_"+ currentChar).removeClass("current");
                    var inputLetter = String.fromCharCode(keycode);
                    var correctLetter =  text.charAt(currentChar);

                    // if the typed key was the correct one
                    if((inputLetter== correctLetter) ||
                       (correctLetter == "\n" && keyIsEnter)){
                        $("#letter_"+currentChar).addClass("correct");
                        corrects++;
                    }
                    else{
                        // buffers automatically when created
                        if(this.soundOn){
                            snd.play();
                        }
                        $("#letter_"+currentChar).addClass("wrong");
                    }
                    currentChar++;
                    $("#letter_"+currentChar).addClass("current");
                    tutor.updateProgress();
                }
            }
        }
        else{
            if(keyIsEnter){
                if(tutor.passed){
                    tutor.nextLevel();
                }
                else{
                    tutor.restart();
                }
            }
            if(keyIsDelete){
                tutor.restart();
            }
        }
    }

    this.start = function(){
        started = true;
        tutor.startTimer();
        $('#pause').show();
        $('#play').hide();
    }

    this.pause = function(){
        started = false;
        tutor.pauseTimer();
        $('#pause').hide();
        $('#play').show();
    }

    this.updateEnvironment = function(){
        $('#current-lesson').text(currentText + 1);
        window.location.hash = currentText + 1;
        localStorage.setItem('currentText', currentText);
        text = texts[currentText];
        this.restart();
    }

    this.prevLevel = function(){
        if(currentText > 0){
            currentText--;
            this.updateEnvironment();
        }
    }

    this.firstLevel = function(){
        currentText = 0;
        this.updateEnvironment();
    }

    this.nextLevel = function(){
        if(currentText < texts.length - 1){
            currentText++;
            this.updateEnvironment();
        }
    }

    this.updateProgress = function(){
        var percentage = (currentChar/ text.length)*100;

        if(currentChar != 0){
            accuracy =  Math.round((corrects/ currentChar)*100);
            $("#accuracy").text(accuracy+"%");

            if(currentChar == text.length){
                this.endLesson();
            }
        }
        else{
            $("#accuracy").text("--");
        }
        this.updateImages();
    }

    this.evaluateResults = function(){
        if(accuracy < this.targetAccuracy){
            $('#bad-results').show();
            $('#slow').hide();
            $('#inaccuracy').show();
            $('.current-accuracy').text(accuracy);
            $('.target-accuracy').text(this.targetAccuracy);
        }
        else if (this.timer > this.maxSeconds){
            $('#bad-results').show();
            $('#slow').show();
            $('#inaccuracy').hide();
        }
        else{
            $('#good-results').show();
            this.passed = true;
        }
    }
    this.restartTimer = function(){
        this.start_time = new Date();
        this.pause_time = new Date();
        this.updateTimer();
    }

    this.startTimer = function(){
        var now = new Date();
        var delta = now - this.pause_time;
        var milliseconds = this.start_time.getMilliseconds() + delta;
        this.start_time.setMilliseconds(milliseconds);

        this.mode = 'play';
        this.updateTimer();
    }

    this.pauseTimer = function(){
        this.mode = 'paused';
        this.pause_time = new Date();
    }

    this.stopTimer = function(){
        this.mode = 'stop';
        this.start_time = false;
    }

    this.updateTimerValue = function(){
        var val = this.maxSeconds - this.timer;
        var time_str = format2(parseInt(val / 60)) + ':' + format2(val % 60);

        $('#time-left')[0].innerHTML = time_str;

        time_str = format2(parseInt(this.timer / 60)) + ':' + format2(this.timer % 60);
        $('#time-passed')[0].innerHTML = time_str;

        var wpm = parseInt((this.words_pressed /5) / (this.timer / 60)) || 0;
        if(!isNaN(wpm)){
            $('.js-wpm').text(wpm);
        }
    }

    this.endLesson = function(){
        this.ended=true;
        this.mode = 'stop';
        this.evaluateResults();
        // set the letter to type an enter
        currentChar = "\n";
        this.updateImages();
    }

    this.updateTimer = function(){
        this.timer = parseInt(((new Date()) - this.start_time) / 1000);
        if(this.mode!='play') return;

        if(this.timer > this.maxSeconds){
            this.endLesson();
            return;
        }
        this.updateTimerValue();

        //$('#speed')[0].innerHTML = parseInt(this.valid / (this.timer?(this.timer/60):1));

        setTimeout('tutor.updateTimer()', 50);
    }

    function format2(num){
        return ((''+num).length==2?'':'0') + num;
    }



}
