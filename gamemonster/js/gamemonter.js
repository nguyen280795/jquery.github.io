var $headerCanvas = $('#headerCanvas');
var $bodyCanvas = $('#bodyCanvas');

var headerCtx = headerCanvas.getContext("2d");
var bodyCtx = bodyCanvas.getContext("2d");

var lastUpdateTime = Date.now();

var windows = window;
requestAnimationFrame = windows.requestAnimationFrame || windows.webkitRequestAnimationFrame || windows.msRequestAnimationFrame || windows.mozRequestAnimationFrame;

var FPS = 144;
var TICKS = 1000 / FPS;

var scoreNumber = 0;
var highScore = 0;
var heartNumber = 5;
var speedNumber = 1;
var monsterNumber = 1;
var boomNumber = 3;
var stopNumber = 3;

var boolStop = false;
var boolPause = false;
var boolBoom = true;
var startgame = true;

if (typeof(Storage) !== "undefined")
    localStorage.setItem('highScore', highScore);

// var myArray = [0, 210, 420];
// var rand1 = myArray[Math.floor(Math.random() * myArray.length)];
// var rand2 = myArray[Math.floor(Math.random() * myArray.length)];
// var rand3 = rand1;
// var rand4 = rand2;

var listBlood = new Array();

//===================>Start create img<===================//
var heartImage = new Image();
heartImage.src = "img/heart.png";

var boomImage = new Image();
boomImage.src = "img/boom.gif";

var pauseImage = new Image();
pauseImage.src = "img/pause.png";

var restartImage = new Image();
restartImage.src = "img/restart.png";

var bloodImage = new Image();
bloodImage.src = "img/blood.png";

var stopImage = new Image();
stopImage.src = "img/stop.png";

var monsterImage = new Image();
monsterImage.src = "img/monster.gif";
monsterImageSize = {
    width: 80,
    height: 80
};

var bgImage = new Image();
bgImage.src = "img/background.jpg";
//===================>End create img<===================//

//===================>Start create prototype monster<===================//
function Monster(beginX, beginY, endX, endY, startX, startY, stopX, stopY, speed, show, click, dieX, dieY) {
    this.beginX = beginX;
    this.beginY = beginY;
    this.endX = endX;
    this.endY = endY;
    this.startX = startX;
    this.startY = startY;
    this.stopX = stopX;
    this.stopY = stopY;
    this.speed = speed;
    this.show = show;
    this.click = click;
    this.dieX = dieX;
    this.dieY = dieY;
}
//===================>End create prototype monster<===================//

//===================>Start create monster<===================//
var Monster1 = new Monster(0, 0, 120, 120, 0, 0, 120, 120, speedNumber, false, false, 0, 0);
var Monster2 = new Monster(210, 0, 210, 120, 210, 0, 210, 120, speedNumber, false, false, 0, 0);
var Monster3 = new Monster(420, 0, 300, 120, 420, 0, 300, 120, speedNumber, false, false, 0, 0);
var Monster4 = new Monster(420, 210, 300, 210, 420, 210, 300, 210, speedNumber, false, false, 0, 0);
var Monster5 = new Monster(420, 420, 300, 300, 420, 420, 300, 300, speedNumber, false, false, 0, 0);
var Monster6 = new Monster(210, 420, 210, 300, 210, 420, 210, 300, speedNumber, false, false, 0, 0);
var Monster7 = new Monster(0, 420, 120, 300, 0, 420, 120, 300, speedNumber, false, false, 0, 0);
var Monster8 = new Monster(0, 210, 120, 210, 0, 210, 120, 210, speedNumber, false, false, 0, 0);
// if (rand1 === 210 && rand2 === 210) {
//     var Monster9 = new Monster(0, 0, 210, 210, 0, 0, 210, 210, speedNumber, false, false, 0, 0);
//     console.log("else 9");
// }
// else {
//     Monster9 = new Monster(rand3, rand4, 210, 210, rand3, rand4, 210, 210, speedNumber, false, false, 0, 0);
//     console.log("else 9");
// }
//===================>End create monster<===================//

//===================>Start load screen game<===================//
function loadScreen() {
    headerCtx.clearRect(0, 0, headerCanvas.width, headerCanvas.height);
    headerCtx.fillStyle = "#19B80A";
    headerCtx.font = "20px Arial";
    headerCtx.fillText("Score: " + scoreNumber, 10, 30);
    headerCtx.fillText("Heart: ", 10, 60);
    var Xposition = 0;
    for (var i = 0; i < heartNumber; i++) {
        headerCtx.drawImage(heartImage, (70 + Xposition), 45, 20, 20);
        Xposition += 20;
    }
    headerCtx.fillText("Speed: " + speedNumber, 10, 90);
    headerCtx.fillText("Random Monster: " + monsterNumber, 300, 30);
    headerCtx.drawImage(boomImage, 290, 60, 50, 40);
    headerCtx.drawImage(stopImage, 350, 60, 40, 40);
    headerCtx.drawImage(pauseImage, 400, 60, 40, 40);
    headerCtx.drawImage(restartImage, 450, 60, 40, 40);
    headerCtx.fillStyle = "#FFFFFF";
    headerCtx.font = "35px Arial";
    headerCtx.fillText(boomNumber, 300, 75);
    headerCtx.fillText(stopNumber, 360, 75);

    bodyCtx.clearRect(0, 0, bodyCanvas.width, bodyCanvas.height);
    bodyCtx.drawImage(bgImage, 0, 0, bodyCanvas.width, bodyCanvas.height);

    updateBlood();

    if (Monster1.show)
        bodyCtx.drawImage(monsterImage, Monster1.startX, Monster1.startY, monsterImageSize.width, monsterImageSize.height);
    if (Monster2.show)
        bodyCtx.drawImage(monsterImage, Monster2.startX, Monster2.startY, monsterImageSize.width, monsterImageSize.height);
    if (Monster3.show)
        bodyCtx.drawImage(monsterImage, Monster3.startX, Monster3.startY, monsterImageSize.width, monsterImageSize.height);
    if (Monster4.show)
        bodyCtx.drawImage(monsterImage, Monster4.startX, Monster4.startY, monsterImageSize.width, monsterImageSize.height);
    if (Monster5.show)
        bodyCtx.drawImage(monsterImage, Monster5.startX, Monster5.startY, monsterImageSize.width, monsterImageSize.height);
    if (Monster6.show)
        bodyCtx.drawImage(monsterImage, Monster6.startX, Monster6.startY, monsterImageSize.width, monsterImageSize.height);
    if (Monster7.show)
        bodyCtx.drawImage(monsterImage, Monster7.startX, Monster7.startY, monsterImageSize.width, monsterImageSize.height);
    if (Monster8.show)
        bodyCtx.drawImage(monsterImage, Monster8.startX, Monster8.startY, monsterImageSize.width, monsterImageSize.height);
    // if (Monster9.show)
    //     bodyCtx.drawImage(monsterImage, Monster9.startX, Monster9.startY, monsterImageSize.width, monsterImageSize.height);

    if (boolPause)
        SetDefalult("PAUSE!!");
}
//===================>End load screen game<===================//

//===================>Start create function refresh<===================//
function refreshMonster(monster) {
    monster.show = false;
    monster.startX = monster.beginX;
    monster.startY = monster.beginY;
    monster.stopX = monster.endX;
    monster.stopY = monster.endY;
    monster.speed = speedNumber;
}
//===================>End create function refresh<===================//

//===================>Start create function randon monster<===================//
function randomMonster() {
    if (!Monster1.show)
        refreshMonster(Monster1);
    if (!Monster2.show)
        refreshMonster(Monster2);
    if (!Monster3.show)
        refreshMonster(Monster3);
    if (!Monster4.show)
        refreshMonster(Monster4);
    if (!Monster5.show)
        refreshMonster(Monster5);
    if (!Monster6.show)
        refreshMonster(Monster6);
    if (!Monster7.show)
        refreshMonster(Monster7);
    if (!Monster8.show)
        refreshMonster(Monster8);
    // if (!Monster9.show)
    //     refreshMonster(Monster8);
    var value = Math.floor((Math.random() * 8) + 1);
    switch (value) {
        case 1:
            if (!Monster1.show)
                Monster1.show = true;
            break;
        case 2:
            if (!Monster2.show)
                Monster2.show = true;
            break;
        case 3:
            if (!Monster3.show)
                Monster3.show = true;
            break;
        case 4:
            if (!Monster4.show)
                Monster4.show = true;
            break;
        case 5:
            if (!Monster5.show)
                Monster5.show = true;
            break;
        case 6:
            if (!Monster6.show)
                Monster6.show = true;
            break;
        case 7:
            if (!Monster7.show)
                Monster7.show = true;
            break;
        case 8:
            if (!Monster8.show)
                Monster8.show = true;
            break;
        // case 9:
        //     if (!Monster9.show)
        //         Monster9.show = true;
        //     break;
    }
}
//===================>End create function random monster<===================//

//===================>Start create function monster move<===================//
function updateMonster(monster) {
    monster.click = true;
    if (monster.startX === monster.stopX && monster.startY === monster.stopY) {
        monster.startX = monster.stopX;
        monster.startY = monster.stopY;
        monster.stopX = monster.beginX;
        monster.stopY = monster.beginY;
    } else {
        if (monster.startX === monster.stopX) {

        } else {
            if (monster.startX < monster.stopX) {
                monster.startX += monster.speed;
            }
            else {
                monster.startX -= monster.speed;

            }
        }
        if (monster.startY === monster.stopY) {

        } else {
            if (monster.startY < monster.stopY) {
                monster.startY += monster.speed;
            }
            else {
                monster.startY -= monster.speed;
            }
        }
    }
    if (monster.startX === monster.beginX && monster.startY === monster.beginY) {
        monster.show = false;
        if (heartNumber > 0 && scoreNumber === 0) {
            heartNumber -= 1;
        }
        else {
            heartNumber -= 1;
            scoreNumber -= 10;
        }
        randomMonster();
    }
}
//===================>End create function monster move<===================//

//===================>Start create event click body<===================//
bodyCanvas.addEventListener("click", function (e) {
    if (boolPause === false) {
        var cursorX = e.pageX - this.offsetLeft;
        var cursorY = e.pageY - this.offsetTop;
    }

    if (startgame === false && boolStop === false) {
        cursorX = 0;
        cursorY = 0;
    }

    if (boolPause === false) {
        if (Monster1.show)
            clickMonster(Monster1, cursorX, cursorY);
        if (Monster2.show)
            clickMonster(Monster2, cursorX, cursorY);
        if (Monster3.show)
            clickMonster(Monster3, cursorX, cursorY);
        if (Monster4.show)
            clickMonster(Monster4, cursorX, cursorY);
        if (Monster5.show)
            clickMonster(Monster5, cursorX, cursorY);
        if (Monster6.show)
            clickMonster(Monster6, cursorX, cursorY);
        if (Monster7.show)
            clickMonster(Monster7, cursorX, cursorY);
        if (Monster8.show)
            clickMonster(Monster8, cursorX, cursorY);
    }

    if (boolStop) {
        if (Monster1.show)
            executeActionStop(Monster1, cursorX, cursorY);
        if (Monster2.show)
            executeActionStop(Monster2, cursorX, cursorY);
        if (Monster3.show)
            executeActionStop(Monster3, cursorX, cursorY);
        if (Monster4.show)
            executeActionStop(Monster4, cursorX, cursorY);
        if (Monster5.show)
            executeActionStop(Monster5, cursorX, cursorY);
        if (Monster6.show)
            executeActionStop(Monster6, cursorX, cursorY);
        if (Monster7.show)
            executeActionStop(Monster7, cursorX, cursorY);
        if (Monster8.show)
            executeActionStop(Monster8, cursorX, cursorY);
        // if (MonsterNine.show)
        //     executeActionStop(MonsterNine, cursorX, cursorY);
        loadScreen();
    }
    if (heartNumber <= 0) {
        SetDefalult_GameOver();
    }
});
//===================>End create event click body<===================//

//===================>Start create function click monster<===================//
function clickMonster(monster, cursorX, cursorY) {
    if (monster.click) {
        if (cursorX >= monster.startX && cursorX <= monster.startX + monsterImageSize.width && cursorY >= monster.startY && cursorY <= monster.startY + monsterImageSize.height) {
            scoreNumber += 10;
            addHeart();
            monster.click = false;
            monster.show = false;
            monster.dieX = monster.startX;
            monster.dieY = monster.startY;
            addElementBlood(monster.dieX, monster.dieY);
            for (var i = 0; i < monsterNumber; i++)
                randomMonster();
        }
        else {
            // if (boolPause === false) {
            //     heartNumber -= 1;
            //     scoreNumber -= 10;
            //     // if (heartNumber > 0 && scoreNumber === 0) {
            //     //     // heartNumber -= 1;
            //     //
            //     //     console.log("aaa");
            //     // }
            //     // else {
            //     //     // heartNumber -= 1;
            //     //     console.log("bbb");
            //     //     scoreNumber -= 10;
            //     //     if (scoreNumber <= 0) {
            //     //         scoreNumber = 0;
            //     //     }
            //     // }
            // }
        }
    }
}
//===================>End create function click monster<===================//

//===================>Start create function add blood<===================//
function addElementBlood(initX, initY) {
    Blood = {
        initX: initX,
        initY: initY
    };
    listBlood[listBlood.length] = Blood;
}
//===================>End create function add blood<===================//

//===================>Start create function update blood<===================//
function updateBlood() {
    if (listBlood.length > 0) {
        for (var i = 0; i < listBlood.length; i++) {
            bodyCtx.drawImage(bloodImage, listBlood[i].initX, listBlood[i].initY)
        }
    }
}
//===================>End create function updateb lood<===================//

//===================>Start create function main<===================//
function main() {
    var NOW = Date.now();
    var differentTime = NOW - lastUpdateTime;
    if (differentTime >= TICKS) {
        loadScreen();
        createLevel();
        if (Monster1.show)
            updateMonster(Monster1);
        if (Monster2.show)
            updateMonster(Monster2);
        if (Monster3.show)
            updateMonster(Monster3);
        if (Monster4.show)
            updateMonster(Monster4);
        if (Monster5.show)
            updateMonster(Monster5);
        if (Monster6.show)
            updateMonster(Monster6);
        if (Monster7.show)
            updateMonster(Monster7);
        if (Monster8.show)
            updateMonster(Monster8);
        // if (Monster9.show)
        //     updateMonster(Monster9);
    }
    if (heartNumber <= 0) {
        var temp = parseInt(localStorage.getItem('highScore'));
        if (temp < scoreNumber)
            localStorage.setItem('highScore', scoreNumber);
        SetDefalult_GameOver();
    }
    if (startgame)
        requestAnimationFrame(main);
}
//===================>End create function main<===================//

//===================>Start create function level<===================//
function createLevel() {
    var level = Math.floor(scoreNumber / 100);
    switch (level) {
        case 1:
            speedNumber = 1;
            monsterNumber = 1;
            break;
        case 2:
            speedNumber = 1;
            monsterNumber = 3;
            break;
        case 3:
            speedNumber = 2;
            monsterNumber = 4;
            break;
        case 4:
            speedNumber = 2;
            monsterNumber = 5;
            break;
        case 5:
            speedNumber = 3;
            monsterNumber = 5;
            break;
        case 6:
            speedNumber = 3;
            monsterNumber = 6;
            break;
        case 7:
            speedNumber = 4;
            monsterNumber = 7;
            break;
        case 8:
            speedNumber = 4;
            monsterNumber = 8;
            break;
    }
}
//===================>End create function level<===================//

//===================>Start create function GameOver<===================//
function SetDefalult_GameOver() {
    startgame = false;

    bodyCtx.fillStyle = '#FFFFFF';
    bodyCtx.font = '40px Arial';
    bodyCtx.fillText('Game Over!!', 130, 200);

    bodyCtx.fillStyle = '#5bfa3f';
    bodyCtx.font = '20px Arial';
    bodyCtx.fillText('Score: ' + scoreNumber, 130, 240);
    bodyCtx.fillText('High Score: ' + localStorage.getItem('highScore'), 130, 280);
}
//===================>End create function GameOver<===================//

//===================>Start create function add heart<===================//
function addHeart() {
    if (scoreNumber !== 0 && scoreNumber % 100 === 0 && heartNumber < 5) {
        heartNumber++;
    }
}
//===================>End create function add heart<===================//

//===================>Start event click header <===================//
headerCanvas.addEventListener('click', function (e) {
    var cursorX = e.pageX - this.offsetLeft;
    var cursorY = e.pageY - this.offsetTop;

    //Button Restart
    if (cursorX > 450 && cursorX < 490 && cursorY > 60 && cursorY < 100) {
        bodyCtx.clearRect(0, 0, bodyCtx.width, bodyCtx.height);
        restart();

    }

    //fix event pause
    if (heartNumber <= 0 || boolStop) {
        cursorX = 0;
        cursorY = 0;
    }

    // Button Boom
    if (cursorX > 290 && cursorX < 340 && cursorY > 60 && cursorY < 100) {
        if (boolBoom) {
            executeActionBoom();
            boomNumber--;
            if (boomNumber <= 0) {
                boolBoom = false;
            }
        }
    }

    //Button Stop
    if (cursorX > 350 && cursorX < 390 && cursorY > 60 && cursorY < 100) {
        boolPause = false;
        if (stopNumber > 0) {
            if (startgame) {
                startgame = false;
                boolStop = true;
                stopNumber--;
            }
            setTimeout(function () {
                startgame = true;
                main();
                boolStop = false;
            }, 3000)
        }
    }

    //Button Pause
    if (cursorX > 400 && cursorX < 440 && cursorY > 60 && cursorY < 100) {
        boolStop = false;
        if (startgame) {
            startgame = false;
            boolPause = true;
        } else {
            startgame = true;
            boolPause = false;
            main();
        }
    }
});
//===================>End event click header <===================//

//===================>Start function restart <===================//
function restart() {
    if (boolPause || startgame === false) {
        load();
        main();
    }
    else {
        load();
    }
}

function load() {
    speedNumber = 1;
    scoreNumber = 0;
    monsterNumber = 1;
    heartNumber = 5;
    boomNumber = 3;
    stopNumber = 3;
    boolPause = false;
    boolBoom = true;
    boolStop = false;
    startgame = true;
    listBlood = new Array();
    refreshMonster(Monster1);
    refreshMonster(Monster2);
    refreshMonster(Monster3);
    refreshMonster(Monster4);
    refreshMonster(Monster5);
    refreshMonster(Monster6);
    refreshMonster(Monster7);
    refreshMonster(Monster8);
    randomMonster();
}
//===================>End function restart <===================//

//===================>Start function show info <===================//
function SetDefalult(string) {
    bodyCtx.fillStyle = '#FFFFFF';
    bodyCtx.font = '50px Arial';
    bodyCtx.fillText(string, 180, 240);
}
//===================>End function show info <===================//

//===================>Start function executeActionBoom <===================//
function executeActionBoom() {
    if (Monster1.show)
        boomForMonster(Monster1);
    if (Monster2.show)
        boomForMonster(Monster2);
    if (Monster3.show)
        boomForMonster(Monster3);
    if (Monster4.show)
        boomForMonster(Monster4);
    if (Monster5.show)
        boomForMonster(Monster5);
    if (Monster6.show)
        boomForMonster(Monster6);
    if (Monster7.show)
        boomForMonster(Monster7);
    if (Monster8.show)
        boomForMonster(Monster8);
    // if (MonsterNine.show)
    //     boomForMonster(MonsterNine);
    for (var i = 0; i < monsterNumber; i++) {
        randomMonster();
    }
}
//===================>End function executeActionBoom <===================//

//===================>Start function boomForMonster <===================//
function boomForMonster(monster) {
    scoreNumber += 10;
    monster.show = false;
    monster.click = false;
    addElementBlood(monster.startX, monster.startY);
}
//===================>End function boomForMonster <===================//

//===================>Start function executeActionStop <===================//
function executeActionStop(monster, cursorX, cursorY) {
    if (monster.click) {
        if (cursorX > monster.startX && cursorX < monster.startX + monsterImageSize.width && cursorY > monster.startY && cursorY < monster.startY + monsterImageSize.height) {
            scoreNumber += 10;
            monster.click = false;
            monster.show = false;
        }
    }
}
//===================>Start function executeActionStop <===================//

main();
randomMonster();