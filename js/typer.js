var tutor, debugBar;

// Prevent the backspace key from navigating back.
$(document).unbind('keydown').bind('keydown', function(event) {
    'use strict';
    var doPrevent = false;
    if (event.keyCode === 8) {
        tutor.handleKeyPress(event.keyCode);
        doPrevent = true;
    }

    if (doPrevent) {
        event.preventDefault();
    }
});

function DebugBar(debug) {
    'use strict';
    var logCounter = 0, text;

    this.log = function(code) {

        if (logCounter > 15) {
            $('#debug_bar').text('');
            logCounter = 0;
        }
        text = String.fromCharCode(code);

        if (debug) {
            text = text + ' (' + code + ')';
        }

        $('#debug_bar').append("<p>'" + text + "'</p>");
        logCounter += 1;
    };
}

function TypingTutor(texts) {
    'use strict';
    var currentChar, corrects, accuracy, started;
    // map the right hand letters
    this.rightLetters = [
        ['h', 'j', 'y', 'u', 'n', 'm'],
        ['i', 'k', ','],
        ['o', 'l', '.', '?'],
        ['p', 'ñ', '-', '\n', '¿', '¡', 'á', 'é'],
        [' '],
        ['ú'],
        ['í'],
        ['ó']
    ];

    // map the left hand letters
    this.leftLetters = [
        ['r', 'f', 'v', 't', 'g', 'b'],
        ['e', 'd', 'c', 'é'],
        ['w', 's', 'x'],
        ['q', 'a', 'z', 'á', '!', '1'],
        ['']
    ];

    this.getHand = function(letter) {
        var lowerLetter = letter.toLowerCase();
        if (this.rightLetters[lowerLetter] !== undefined) {
            return 'right';
        }
        return 'left';
    };

    this.updateMaxSeconds = function() {
        var minutes = parseInt($('#max-minutes').val(), 10), seconds;

        seconds = parseInt($('#max-seconds').val(), 10);
        this.maxSeconds = minutes * 60 + seconds;
        localStorage.setItem('maxSeconds', this.maxSeconds);
    };

    this.updateTargetAccuracy = function() {
        this.targetAccuracy = parseInt($('#target-accuracy').val(), 10);
        localStorage.setItem('targetAccuracy', this.targetAccuracy);
    };

    this.volumeOn = function() {
        this.soundOn = true;
        localStorage.setItem('soundOn', this.soundOn);
        $('#volume_on').show();
        $('#volume_off').hide();
    };

    this.volumeOff = function() {
        this.soundOn = false;
        localStorage.setItem('soundOn', this.soundOn);
        $('#volume_on').hide();
        $('#volume_off').show();
    };

    this.updateImages = function() {
        /* This method returns sets the images for the righthand and the left
         * hand
         * */
        var letter = this.text[currentChar], rightIndex, leftIndex;
        if (letter === undefined) {
            letter = '\n';
        }

        rightIndex = this.rightLetters[letter.toLowerCase()];
        leftIndex = this.leftLetters[letter.toLowerCase()];

        // if it's a capital letter
        if (/[A-Z]/.test(letter)) {
            if (rightIndex === undefined) {
                rightIndex = 3;
            } else {
                leftIndex = 3;
            }
        }

        if (rightIndex === undefined) {
            rightIndex = '';
        }

        if (leftIndex === undefined) {
            leftIndex = '';
        }

        $('#right-hand').attr('src', 'img/hands-r' + rightIndex + '.png');

        $('#left-hand').attr('src', 'img/hands-l' + leftIndex + '.png');
    };

    this.showTips = function() {
        var $el = $('.time-tip');

        $el.popover('show');

        $('.close-time-tip').click(function() {
            $el.popover('hide');
        });

        setTimeout(function() {
            $el.popover('hide');
        }, 15000);
    };

    this.restart = function() {
        var i, letter, $text, id, html, hand, className;
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

        $('#text').text('');

        letter = '';

        for (i = 0; i < this.text.length; i += 1) {
            $text = $('#text');
            id = 'letter_' + i;
            html = '';
            if (this.text[i] === '\n') {
                html += "<div class='letter right' id='" + id + "'>";
                html += "<img src='img/enter.png' class='enter'/>";
                html += '</div>';
                html += '<br>';
                $text.append(html);
                continue;
            }

            if (this.text[i] === ' ') {
                letter = '&nbsp;';
            } else {
                letter = this.text[i];
            }
            hand = this.getHand(this.text[i]);
            className = 'letter ' + hand;
            html += "<div class='" + className + "' id='" + id + "'>";
            html += letter;
            html += '</div>';
            $text.append(html);
        }

        $('#letter_0').addClass('current');
        $('#bad-results').hide();
        $('#good-results').hide();
        $('#pause').hide();
        this.showTips();

        $('#my_image').attr('src', 'img/hands.png');
        $('#mayus').hide();
        $('#play').show();
        this.updateProgress();
    };

    /*
     * transforms the array of letters in the map, into a letter dictionary.
     */
    this.reformatHandMap = function() {
        var rightLetters = {}, leftLetters = {}, i, j;

        for (i = 0; i < this.rightLetters.length; i += 1) {
            for (j = 0; j < this.rightLetters[i].length; j += 1) {
                rightLetters[this.rightLetters[i][j]] = i;
            }
        }

        for (i = 0; i < this.leftLetters.length; i += 1) {
            for (j = 0; j < this.leftLetters[i].length; j += 1) {
                leftLetters[this.leftLetters[i][j]] = i;
            }
        }

        this.rightLetters = rightLetters;
        this.leftLetters = leftLetters;
    };

    this.initialize = function() {
        var inputLetter;
        var correctLetter;
        var keycode;
        var self = this;
        var textIndex;

        this.reformatHandMap();

        // initialize interface
        $('i').tooltip('hide');
        $('.tip').popover('hide');

        // current text is the index of the text being displayed in the text
        // array. We try to obtain it from the url of the page.
        this.currentText = parseInt(window.location.hash.substring(1), 10) - 1;

        // if the currentText is undefined
        if (this.currentText === undefined || isNaN(this.currentText)) {
            // obtain the currentText from localStorage or set it to 0
            textIndex = parseInt(localStorage.getItem('currentText'), 10) || 0;
            this.currentText = textIndex;
        }
        $('#current-lesson').text(this.currentText + 1);

        // text is the string that contains the text for the current Lesson
        this.text = texts[this.currentText];

        // maxSeconds is the ammount of seconds the user has to complete the
        // test.
        this.maxSeconds = parseInt(
          localStorage.getItem('maxSeconds') || 180,
          10
        );
        $('#max-minutes').val(parseInt(this.maxSeconds / 60, 10));
        $('#max-seconds').val(this.maxSeconds % 60);

        // Set the targetAccuracy for the student
        this.targetAccuracy = localStorage.getItem('targetAccuracy') || 90;
        $('#target-accuracy').val(this.targetAccuracy);


        // set the sound on/off
        this.soundOn = JSON.parse(localStorage.getItem('soundOn')) || false;
        if (this.soundOn) {
            $('#volume_off').hide();
        } else {
            $('#volume_on').hide();
        }

        this.snd = new Audio('sounds/error.mp3');


        $(window).keypress(function(event) {
            keycode = event.which;
            self.handleCapsLock(event);
            debugBar.log(keycode);
            tutor.handleKeyPress(keycode);
        });

        this.bindEvents();
        this.restart();
    };

    this.bindEvents = function() {
        var self = this;
        $('.restart_button').click(function() {
            self.restart();
            $(this).blur();
        });

        $('#volume_on').click(function() {
            self.volumeOff();
            $(this).blur();
        });

        $('#volume_off').click(function() {
            self.volumeOn();
            $(this).blur();
        });

        $('#play').click(function() {
            self.start();
            $(this).blur();
        });

        $('#pause').click(function() {
            self.pause();
            $(this).blur();
        });

        $('#first_lvl').click(function() {
            self.firstLevel();
            $(this).blur();
        });

        $('#prev_lvl').click(function() {
            self.prevLevel();
            $(this).blur();
        });

        $('#next_lvl').click(function() {
            self.nextLevel();
            $(this).blur();
        });

        $('#next_level_button').click(function() {
            self.nextLevel();
            $(this).blur();
        });

        $('.max_seconds_select').change(function() {
            self.updateMaxSeconds();
            $(this).blur();
        });

        $('.target_accuracy_select').click(function() {
            self.updateTargetAccuracy();
            $(this).blur();
        });
    };

    this.handleCapsLock = function(e) {
        var kc; // key code
        var sk; // shift key pressed

        kc = e.keyCode || e.which;
        sk = e.shiftKey || ((kc === 16) ? true : false);

        // by default, hide the block mayusc alert
        $('#mayus').hide();

        // if the shift key is not pressed and got a capital leter;
        if ((kc >= 65 && kc <= 90) && !sk) {
          // show the block mayusc alert
          $('#mayus').show();
        }

        // if the shift key is pressed and did not get a capital leter;
        if ((kc >= 97 && kc <= 122) && sk) {
          $('#mayus').show();
        }
    };

    this.shouldHandleKey = function(keyCode) {
      var keyIsEnter;
      var marks;
      var commaDotOrLine;
      var integer;
      var keyWithinLetters;
      var vowelWithTilde;

      keyIsEnter = (keyCode === 13);

      marks = (keyCode === 33 || keyCode === 63 || keyCode === 161 ||
              keyCode === 191);
      commaDotOrLine = (keyCode >= 44 && keyCode <= 46);

      integer = (keyCode >= 48 && keyCode <= 57);

      keyWithinLetters = ((keyCode >= 65 && keyCode <= 122) ||
                          keyCode === 241 || keyCode === 209);

      vowelWithTilde = (keyCode === 225 || keyCode === 233 ||
                          keyCode === 237 || keyCode === 243 ||
                          keyCode === 250);

      return (keyWithinLetters || keyIsEnter || keyCode === 32 ||
        marks || commaDotOrLine || vowelWithTilde || integer
      );
    };

    this.handleKeyPress = function(keycode) {
        // while the tutor has not eneded
        var keyIsEnter, keyIsDelete, inputLetter, correctLetter;
        keyIsDelete = (keycode === 8);
        keyIsEnter = (keycode === 13);

        if (!tutor.ended) {

            if (this.shouldHandleKey(keycode)) {
                $('select').blur();
                this.words_pressed += 1;

                if (!started) {
                    tutor.start();
                }

                $('#letter_' + currentChar).removeClass('current');
                inputLetter = String.fromCharCode(keycode);
                correctLetter = this.text.charAt(currentChar);

                // if the typed key was the correct one
                if ((inputLetter === correctLetter) ||
                        (correctLetter === '\n' && keyIsEnter)) {
                    $('#letter_' + currentChar).addClass('correct');
                    corrects += 1;
                } else {
                    // buffers automatically when created
                    if (this.soundOn) {
                        this.snd.play();
                    }
                    $('#letter_' + currentChar).addClass('wrong');
                }
                currentChar += 1;
                $('#letter_' + currentChar).addClass('current');
                tutor.updateProgress();
            }
        } else {
            if (keyIsEnter) {
                if (tutor.passed) {
                    tutor.nextLevel();
                } else {
                    tutor.restart();
                }
            }
            if (keyIsDelete) {
                tutor.restart();
            }
        }
    };

    this.start = function() {
        started = true;
        tutor.startTimer();
        $('#pause').show();
        $('#play').hide();
    };

    this.pause = function() {
        started = false;
        tutor.pauseTimer();
        $('#pause').hide();
        $('#play').show();
    };

    this.updateEnvironment = function() {
        $('#current-lesson').text(this.currentText + 1);
        window.location.hash = this.currentText + 1;
        localStorage.setItem('currentText', this.currentText);
        this.text = texts[this.currentText];
        this.restart();
    };

    this.prevLevel = function() {
        if (this.currentText > 0) {
            this.currentText -= 1;
            this.updateEnvironment();
        }
    };

    this.firstLevel = function() {
        this.currentText = 0;
        this.updateEnvironment();
    };

    this.nextLevel = function() {
        if (this.currentText < texts.length - 1) {
            this.currentText += 1;
            this.updateEnvironment();
        }
    };

    this.updateProgress = function() {
        var percentage = (currentChar / this.text.length) * 100;

        if (currentChar !== 0) {
            accuracy = Math.round((corrects / currentChar) * 100);
            $('#accuracy').text(accuracy + '%');

            if (currentChar === this.text.length) {
                this.endLesson();
            }
        } else {
            $('#accuracy').text('--');
        }
        this.updateImages();
    };

    this.evaluateResults = function() {
        if (accuracy < this.targetAccuracy) {
            $('#bad-results').show();
            $('#slow').hide();
            $('#inaccuracy').show();
            $('.current-accuracy').text(accuracy);
            $('.target-accuracy').text(this.targetAccuracy);
        } else if (this.timer > this.maxSeconds) {
            $('#bad-results').show();
            $('#slow').show();
            $('#inaccuracy').hide();
        } else {
            $('#good-results').show();
            this.passed = true;
        }
    };

    this.restartTimer = function() {
        this.start_time = new Date();
        this.pause_time = new Date();
        this.updateTimer();
    };

    this.startTimer = function() {
        var now = new Date(), delta, milliseconds;
        delta = now - this.pause_time;
        milliseconds = this.start_time.getMilliseconds() + delta;
        this.start_time.setMilliseconds(milliseconds);

        this.mode = 'play';
        this.updateTimer();
    };

    this.pauseTimer = function() {
        this.mode = 'paused';
        this.pause_time = new Date();
    };

    this.stopTimer = function() {
        this.mode = 'stop';
        this.start_time = false;
    };

    this.updateTimerValue = function() {
        var wpm, val = this.maxSeconds - this.timer, timeStr;
        timeStr = this.formatTime(val / 60, val % 60);

        $('#time-left')[0].innerHTML = timeStr;

        timeStr = this.formatTime(this.timer / 60, this.timer % 60);
        $('#time-passed')[0].innerHTML = timeStr;

        // words per minute
        wpm = parseInt((this.words_pressed / 5) / (this.timer / 60), 10) || 0;
        if (!isNaN(wpm)) {
            $('.js-wpm').text(wpm);
        }
    };

    this.endLesson = function() {
        this.ended = true;
        this.mode = 'stop';
        this.evaluateResults();
        // set the letter to type an enter
        currentChar = '\n';
        this.updateImages();
    };

    this.updateTimer = function() {
        var self = this;
        this.timer = parseInt(((new Date()) - this.start_time) / 1000, 10);
        if (this.mode !== 'play') {
            return;
        }

        if (this.timer > this.maxSeconds) {
            this.endLesson();
            return;
        }
        this.updateTimerValue();

        setTimeout(function() {
            self.updateTimer();
        }, 50);
    };

    this.formatTime = function(minutes, seconds) {
        minutes = parseInt(minutes, 10);
        seconds = parseInt(seconds, 10);
        minutes = ((minutes.toString()).length === 2 ? '' : '0') + minutes;
        seconds = ((seconds.toString()).length === 2 ? '' : '0') + seconds;

        return minutes + ':' + seconds;
    };
}

$(document).ready(function() {
    'use strict';
    var content = new Content(), texts = content.getText();

    tutor = new TypingTutor(texts);
    tutor.initialize();
    debugBar = new DebugBar(false);
});
