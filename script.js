let lastTime = 0;
let scene = "prologue";
let transitionOpacity = 0;
const audioList = {
    menuTheme: "assets/menuTheme.mp3",
    ingameTheme: "assets/ingameTheme.mp3",
    electricity: "assets/electricity.mp3",
    win: "assets/win.wav",
    bonk: "assets/bonk.mp3",
}
let sfx = {};
let globalVolume = 0;
let soundVolume = globalVolume;
for (let key in audioList) {
    sfx[key] = new Audio(audioList[key]);
}
let settingsOpened = false;
let eternalMod = false;
let FNATGCams = false;
let prePatch = false;
document.getElementById("settings").addEventListener("click", (e) => {
    if (e.target.id == "start") {scene = "ingame"}
    if (e.target.id == "settingsOpen") {
        settingsOpened = !settingsOpened;
        if (settingsOpened) {
            document.getElementById("settings").style.bottom = "0";
        } else {
            document.getElementById("settings").style.bottom = "-52vh";
        }
    }
    if (document.getElementById("eternalMod").checked) 
        eternalMod = true;
    else 
        eternalMod = false;
    if (document.getElementById("FNATG").checked) {
        FNATGCams = true;
    } else {
        FNATGCams = false;
    }
    if (document.getElementById("prePatch").checked) {
        prePatch = true;
    } else {
        prePatch = false;
    }
});
document.getElementById("next").addEventListener("click", (e) => {
    document.getElementById("dialogue").textContent = dialogue[dialogueIter];
    if (dialogueIter === 6) {
        document.getElementById("BCFYText").style.display = "block";
        transitionOpacity = 1;
        document.getElementById("prologue").style.filter = "url(#red)";
    } else {
        document.getElementById("prologue").style.filter = "";
        document.getElementById("BCFYText").style.display = "none";
    }
    if (dialogueIter >= dialogue.length) {
        scene = "ingame";
    }
    dialogueIter++;
});
let hoveringOverCams = false;
let hoveringFrame = false;
document.getElementById("fnatgCams").addEventListener("mouseenter", (e) => {
    hoveringOverCams = true;
});
document.getElementById("fnatgCams").addEventListener("mouseleave", (e) => {
    hoveringOverCams = false;
});
window.addEventListener("mousedown", (e) => {
    console.log(e.target.id);
});
document.getElementById("clickme").addEventListener("click", (e) => {
    requestAnimationFrame(update);
    document.getElementById("prologue").style.display = "block";
    document.getElementById("interact").style.display = "none";
    document.getElementById("transition").style.opacity = 1.5;
    transitionOpacity = 1.5;
    soundVolume = -0.5;
    sfx.menuTheme.play();
});
function updateDoors() {
    for (let i = 0; i<3; i++) {
        if (doors[i]) {
            document.getElementById("door" + (i+1)).style.filter = "";
        } else {
            document.getElementById("door" + (i+1)).style.filter = "brightness(0)";
        }
    }
}
let doors = [false, false, false];
updateDoors();
document.getElementById("doors").addEventListener("mousedown", (e) => {
    if (e.target.dataset.value == undefined) return;
    doors[e.target.dataset.value] = !doors[e.target.dataset.value];
    updateDoors();
});
let cam = 0;
let camsOpened = false;
document.getElementById("camButtons").addEventListener("mousedown", (e) => {
    if (e.target.dataset.cam == undefined) return;
    cam = e.target.dataset.cam;
    document.getElementById("camBackground").style.backgroundImage = "url(assets/cam"+cam+".png)";
});
document.getElementById("shockButton").addEventListener("mousedown", () => {
    sfx.electricity.pause();
    sfx.electricity.currentTime = 0;
    sfx.electricity.play();
    transitionOpacity = 0.5;
    power -= 0.25;
    shocked = true;
});
document.getElementById("openCams").addEventListener("mousedown", () => {
    camsOpened = !camsOpened;
    if (camsOpened) {
        document.getElementById("office").style.display = "none";
        document.getElementById("cams").style.display = "block";
    } else {
        document.getElementById("office").style.display = "block";
        document.getElementById("cams").style.display = "none";
    }
});
let dialogueIter = 0;
const dialogue = [
    "your back lol",
    "why lol",
    "wtf are you doing",
    "well",
    "now you gotta do this...",
    "thats next....",
    "¨",
    "thats right now",
    "are you ready?",
    "good luck..",
    "wait no",
    "bad luck..",
    "noob",
    ":p",
    "",
    "OH YEAH",
    "forgot about me needing to explain the characters",
    "so",
    "you have beems",
    "he appears in the doors, click them to close them",
    "then you have beems",
    "theres timers on the left of the office and you gotta shock the correct cam before the timer ends and cams have to be opened",
    "then you have beems",
    "shock cam 3 to make him go back pretty simple",
    "then you have beems",
    "he spawns in cam 5 and goes to 5>4>3>2>1>0 thats the order and you have to shock him. hes like impurity from FNATI but dumb however he will traverse",
    "that should be it",
    "well",
    "idk bad luck beating it idk",
    "...",
    "oh yeah if you run out of power your done for btw",
    "alright go for it man....",
];
let firstFrame = [false, false, false, false];
function prologue(dt, time) {
    if (!firstFrame[0]) {
        firstFrame[0] = true;
        firstFrame[1] = false;
        firstFrame[2] = false;
        firstFrame[3] = false;
    }
    transitionOpacity -= dt;
    for (let i = 1; i<4; i++) {
        document.getElementById("background"+i).style.backgroundPositionX = time * i / 100 * i / 4 + "vh";
        document.getElementById("background"+i).style.backgroundPositionY = time * i / 150 + "vh";
        document.getElementById("BCFY"+i).style.transform = `translate(${-50 + Math.random() * 5 - 2.5}%,${-50 + Math.random() * 30 - 15}%)`;
    }
    soundVolume += dt;
}
let doorCharacters = [];
let timerCharacters = [];
let foxyBeems = {};
let impurityBeems = {};
let diffMult = 1;
let ingameTimer = 0;
let power = 100;
let powerDrain = 0;
let phase = 0;
let shocked = false;
let playtime = 0;
let bestRun = 0;
let saveData = {
    playtime: playtime,
    bestRun: bestRun,
}
function ingame(dt, time) {
    if (!firstFrame[1]) {
        firstFrame[0] = false;
        firstFrame[1] = true;
        firstFrame[2] = false;
        firstFrame[3] = false;
        saveData = {
            playtime: playtime,
            bestRun: bestRun,
        }
        localStorage.setItem("data", JSON.stringify(saveData));
        ingameTimer = 0;
        document.getElementById("prologue").style.display = "none";
        document.getElementById("ingame").style.display = "block";
        for (let key in sfx) {
            sfx[key].currentTime = 0;
            sfx[key].pause();
        }
        for (let i = 0; i<3; i++) {
            document.getElementById("door" + (i+1)).style.filter = "brightness(0)";
        }
        transitionOpacity = 1.1;
        soundVolume = -0.1;
        power = 100;
        sfx.ingameTheme.play();
        phase = 0;
        doors = [false,false,false];
        camsOpened = false;
        if (FNATGCams) {
            document.getElementById("openCams").style.display = "none";
            document.getElementById("fnatgCams").style.display = "block";
        } else {
            document.getElementById("openCams").style.display = "block";
            document.getElementById("fnatgCams").style.display = "none";
        }
        document.getElementById("office").style.display = "block";
        document.getElementById("cams").style.display = "none";
        if (eternalMod) {
            diffMult = 2.2;
        } else {
            diffMult = 1;
        }
        doorCharacters = [
            {
                moveTimer: 0,
                moveTime: 8,
                killTimer: 0,
                killTime: 2.5,
                leaveTimer: 0,
                leaveTime: 1,
                door: 0,
                speed: Math.random() + 0.5,
                element: document.getElementById("doorCharacter1")
            },
            {
                moveTimer: 0,
                moveTime: 10,
                killTimer: 0,
                killTime: 2.5,
                leaveTimer: 0,
                leaveTime: 1,
                door: 1,
                speed: Math.random() + 0.5,
                element: document.getElementById("doorCharacter2")
            },
            {
                moveTimer: 0,
                moveTime: 12,
                killTimer: 0,
                killTime: 2.5,
                leaveTimer: 0,
                leaveTime: 1,
                door: 2,
                speed: Math.random() + 0.5,
                element: document.getElementById("doorCharacter3")
            },
        ];
        timerCharacters = [
            {
                killTimer: 10 + (Math.random()*5) - diffMult*3,
                cam: Math.round(Math.random()*5),
                element: document.getElementById("timer1")
            },
            {
                killTimer: 10 + (Math.random()*5) - diffMult*3,
                cam: Math.round(Math.random()*5),
                element: document.getElementById("timer2")
            },
            {
                killTimer: 10 + (Math.random()*5) - diffMult*3,
                cam: Math.round(Math.random()*5),
                element: document.getElementById("timer3")
            },
        ];
        foxyBeems = {
            killTimer: 0,
            killTime: 15,
            eye: false,
            element: document.getElementById("foxyBeems")
        };
        impurityBeems = {
            moveTimer: 0,
            moveTime: 10,
            cam: 5,
            element: document.getElementById("impurityBeems")
        }
    }
    powerDrain = 0;
    for (let i = 0; i<doors.length; i++) {
        if (doors[i]) {
            powerDrain++
        }
    }
    if (bestRun <= ingameTimer) {
        bestRun = ingameTimer;
    }
    playtime += dt;
    if (camsOpened) powerDrain++;
    power -= powerDrain * dt / 4;
    if (prePatch) {
        if (ingameTimer >= 20.5 && ingameTimer <= 21)         {diffMult = 1.5; phase = 1 } else
        if (ingameTimer >= 40.5 && ingameTimer <= 41)         {diffMult = 2; phase = 2} else
        if (ingameTimer >= 81 && ingameTimer <= 82)           {diffMult = 1; phase = 0} else
        if (ingameTimer >= 101 && ingameTimer <= 102)         {diffMult = 1.5; phase = 1;} else
        if (ingameTimer >= 121 && ingameTimer <= 122)         {diffMult = 2.5; phase = 3;} else
        if (ingameTimer >= 141 && ingameTimer <= 142)         {diffMult = 2; phase = 2;} else
        if (ingameTimer >= 161 && ingameTimer <= 162)         {diffMult = 1.5; phase = 0;} else
        if (ingameTimer >= 20.5+161 && ingameTimer <= 21+161) {diffMult = 2; phase = 1} else
        if (ingameTimer >= 40.5+161 && ingameTimer <= 41+161) {diffMult = 2.5; phase = 2} else
        if (ingameTimer >= 81+161 && ingameTimer <= 82+161)   {diffMult = 2; phase = 1} else
        if (ingameTimer >= 101+161 && ingameTimer <= 102+161) {diffMult = 2; phase = 2} else
        if (ingameTimer >= 121+161 && ingameTimer <= 122+161) {diffMult = 3; phase = 3}
    } else {
        if (ingameTimer >= 20.5 && ingameTimer <= 21) {phase = 1} else
        if (ingameTimer >= 40.5 && ingameTimer <= 41) {phase = 2} else
        if (ingameTimer >= 81 && ingameTimer <= 82) {phase = 0} else
        if (ingameTimer >= 101 && ingameTimer <= 102) {phase = 1;} else
        if (ingameTimer >= 121 && ingameTimer <= 122) {phase = 3;} else
        if (ingameTimer >= 141 && ingameTimer <= 142) {phase = 2;} else
        if (ingameTimer >= 161 && ingameTimer <= 162) {phase = 0;} else
        if (ingameTimer >= 20.5+161 && ingameTimer <= 21+161) {phase = 1} else
        if (ingameTimer >= 40.5+161 && ingameTimer <= 41+161) {phase = 2} else
        if (ingameTimer >= 81+161 && ingameTimer <= 82+161) {phase = 1} else
        if (ingameTimer >= 101+161 && ingameTimer <= 102+161) {phase = 2} else
        if (ingameTimer >= 121+161 && ingameTimer <= 122+161) {phase = 3}
    }
    document.getElementById("fogBg").style.filter = "";
    if (phase === 1) {
        document.getElementById("fogBg").style.filter = "hue-rotate("+time/100+"deg)";
    }
    if (phase === 2) {
        document.getElementById("fogBg").style.filter = "hue-rotate("+time/33+"deg)";
        document.getElementById("ingame").style.rotate = Math.random()*1-0.5+"deg";
    } 
    if (phase === 3) {
        document.getElementById("fogBg").style.filter = "hue-rotate("+time/10+"deg)";
        document.getElementById("ingame").style.rotate = Math.random()*2-1+"deg";
    }
    if (phase === 4) {
        document.getElementById("fogBg").style.filter = "hue-rotate("+time/10+"deg)";
        document.getElementById("ingame").style.rotate = Math.random()*3-1.5+"deg";
        document.getElementById("ingame").style.filter = "saturate(2)";
    }
    if (!eternalMod) {
        diffMult += dt / 300;
    } else {
        phase = 4;
    }
    document.getElementById("timer").textContent = "Percentage: " + Math.floor(ingameTimer / 360 * 100) + "%";
    document.getElementById("power").textContent = "Power: " + power.toFixed(1) + "%";
    document.getElementById("difficulty").textContent = "Difficulty: " + diffMult.toFixed(2) + "x";
    ingameTimer += dt;
    if (ingameTimer >= 360) {
        scene = "win";
    }
    if (power <= 0) {
        firstFrame[1] = false;
    }
    for (let i = 0; i<doorCharacters.length; i++) {
        const char = doorCharacters[i];
        char.moveTimer += dt * char.speed * diffMult;
        if (char.moveTimer >= char.moveTime && !doors[char.door]) {
            char.element.style.opacity = 1;
            char.killTimer += dt;
            if (char.killTimer >= char.killTime) {
                firstFrame[1] = false;
            }
        } else {
            char.element.style.opacity = 0;
        }
        if (doors[char.door] && char.moveTimer >= char.moveTime) {
            char.leaveTimer += dt * diffMult;
            if (char.leaveTimer >= char.leaveTime) {
                char.moveTimer = 0;
                char.killTimer = 0;
                char.leaveTimer = 0;
                char.speed = Math.random() + 0.5;
                sfx.bonk.pause();
                sfx.bonk.currentTime = 0;
                sfx.bonk.play();
            }
        }
    }
    for (let i = 0; i<timerCharacters.length; i++) {
        const tim = timerCharacters[i];
        tim.killTimer -= dt;
        if (tim.killTimer < 0) {
            firstFrame[1] = false;
        }
        tim.element.textContent = "CAM " + tim.cam + " | " + tim.killTimer.toFixed(2) + "s";
        if (cam == tim.cam && shocked) {
            tim.killTimer = 7 + (Math.random()*3) - diffMult*2;
            tim.cam = Math.round(Math.random()*5);
        }
    }
    foxyBeems.killTimer += dt * diffMult;
    if (cam == 3 && shocked) {
        foxyBeems.killTimer /= 3;
    }
    if (cam == 3) {
        foxyBeems.element.style.transform = "translate(-50%,-50%) scale(" + foxyBeems.killTimer / 5 + ")";
        foxyBeems.element.style.display = "block";
    } else {
        foxyBeems.element.style.display = "none";
    }
    if (foxyBeems.killTimer >= foxyBeems.killTime) {
        firstFrame[1] = false;
    }
    impurityBeems.moveTimer += dt * diffMult;
    if (impurityBeems.moveTimer >= impurityBeems.moveTime) {
        impurityBeems.moveTimer = 0;
        impurityBeems.cam--;
        if (impurityBeems.cam == -1) {
            firstFrame[1] = false;
        }
    }
    if (impurityBeems.cam == cam && camsOpened) {
        impurityBeems.element.style.display = "block";
        if (shocked) {
            impurityBeems.moveTimer = 0;
            impurityBeems.cam++;
            if (impurityBeems.cam > 5) {
                impurityBeems.cam = 5;
            }
        }
    } else {
        impurityBeems.element.style.display = "none";
    }
    document.getElementById("officeBG").style.backgroundPositionX = time / 50 + "vh";
    for (let i = 1; i<4; i++) {
        document.getElementById("fog"+i).style.backgroundPositionX = time * i / 100 * i / 4 + "vh";
        document.getElementById("fog"+i).style.backgroundPositionY = time * i / 150 + "vh";
    }
    transitionOpacity -= dt / 2;
    soundVolume += dt / 2;
    shocked = false;
    if (FNATGCams) {
        if (hoveringOverCams) {
            if (!hoveringFrame) {
                camsOpened = !camsOpened;
            }
            hoveringFrame = true;
        } else {
            hoveringFrame = false;
        }
        if (camsOpened) {
            document.getElementById("office").style.display = "none";
            document.getElementById("cams").style.display = "block";
        } else {
            document.getElementById("office").style.display = "block";
            document.getElementById("cams").style.display = "none";
        }
    }
}
let firstUpdateFrame = false;
function update(time) {
    const dt = (time - lastTime) / 1000;
    lastTime = time;
    if (firstUpdateFrame) {
        globalVolume = soundVolume;
        if (globalVolume >= 1) {
            globalVolume = 1;
        } else if (globalVolume <= 0) {
            globalVolume = 0;
        }
        for (let key in sfx) {
            sfx[key].volume = globalVolume
        }
        if (scene == "prologue") {
            prologue(dt, time);
        } else if (scene == "ingame") {
            ingame(dt, time);
        } else if (scene == "win") {
            document.getElementById("ingame").style.display = "none";
            document.getElementById("win").style.display = "block";
            sfx.win.play();
        }
    }
    document.getElementById("transition").style.opacity = transitionOpacity;
    firstUpdateFrame = true;
    requestAnimationFrame(update);
}
function loadProgress() {
    const data = JSON.parse(localStorage.getItem("data"));
    if (data == null) return;
    if (data.playtime != null) playtime = data.playtime;
    if (data.bestRun != null) bestRun = data.bestRun;
    document.getElementById("bestRun").textContent = "Best Run: " + Math.floor(bestRun / 360 * 100) + "%";
    const seconds = playtime % 60;
    const minutes = playtime / 60 % 60;
    const hours = playtime / 60 / 60;
    document.getElementById("playtime").textContent = "Playtime: " + Math.floor(hours) + (Math.floor(minutes) < 10 ? ":0" : ":") + Math.floor(minutes) + (Math.floor(seconds) < 10 ? ":0" : ":") + Math.floor(seconds);

}
loadProgress();