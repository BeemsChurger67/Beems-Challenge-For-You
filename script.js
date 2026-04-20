let lastTime = 0;
let scene = "prologue";
let transitionOpacity = 0;
const audioList = {
    menuTheme: "assets/menuTheme.mp3",
    ingameTheme: "assets/ingameTheme.mp3",
    eternalTheme: "assets/eternalTheme.mp3",
    BCFYAC: "assets/BCFYAC.mp3",
    silentBeemathon: "assets/silentBeemathon.mp3",
    beemsNeverClear: "assets/beemsNeverClear.mp3",
    electricity: "assets/electricity.mp3",
    win: "assets/win.wav",
    bonk: "assets/bonk.mp3",
    tick1: "assets/tick1.mp3",
    tick2: "assets/tick2.mp3",
    mortimerBeems: "assets/mortimerBeems.mp3",
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
let shorterKT = false;
let hyperImpurity = false;
let easyMode = false;
let visibleTimers = false;
let silentBeemathon = false;
let beemsNeverClear = false;
let speedhack = 1;
let tas = false;
let tasStats = {
    x: 50,
    y: 50,
    camOrder: [false,false,false],
    cams: [0,0,0],
    mission: "openCams",
}
let bonusMode = false;
let bcfyac = false;
document.getElementById("modesDiv").addEventListener("click", (e) => {
    if (e.target.id == "silentBeemathon") {
        scene = "ingame";
        prePatch = false;
        eternalMod = false;
        hyperImpurity = false;
        shorterKT = false;
        easyMode = false;
        oldPrePatch = false;
        document.getElementById("speedhack").value = 1;
        visibleTimers = false;
        FNATGCams = false;
        silentBeemathon = true;
        bonusMode = true;
        document.getElementById("name").textContent = "Silent Beemathon";
    }
    if (e.target.id == "beemsNeverClear") {
        scene = "ingame";
        prePatch = false;
        eternalMod = false;
        hyperImpurity = false;
        shorterKT = false;
        easyMode = false;
        document.getElementById("speedhack").value = 1;
        visibleTimers = false;
        FNATGCams = false;
        beemsNeverClear = true;
        bonusMode = true;
        document.getElementById("name").textContent = "BEEMS NEVER CLEAR";
    }
    if (e.target.id == "EEBCFY") {
        scene = "ingame";
        prePatch = false;
        eternalMod = true;
        hyperImpurity = false;
        shorterKT = false;
        easyMode = true;
        document.getElementById("speedhack").value = 1;
        visibleTimers = false;
        FNATGCams = false;
        bonusMode = true;
        document.getElementById("name").textContent = "Eternal Easy Beems's Challenge For You";
    }
    if (e.target.id == "BCFYAC") {
        scene = "ingame";
        prePatch = true;
        eternalMod = true;
        hyperImpurity = true;
        shorterKT = true;
        easyMode = false;
        document.getElementById("speedhack").value = 1;
        visibleTimers = false;
        FNATGCams = false;
        bonusMode = true;
        bcfyac = true;
        document.getElementById("name").textContent = "Eternal Easy Beems's Challenge For You";
    }
});
document.getElementById("settings").addEventListener("click", (e) => {
    if (!bonusMode) {
        if (e.target.id == "start") {scene = "ingame"}
        if (e.target.id == "settingsOpen") {
            settingsOpened = !settingsOpened;
            if (settingsOpened) {
                document.getElementById("settings").style.bottom = "0";
            } else {
                document.getElementById("settings").style.bottom = "-52vh";
            }
        }
        document.getElementById("name").textContent = "";
        if (document.getElementById("eternalMod").checked) {
            eternalMod = true;
            document.getElementById("name").textContent += "Eternal ";
        } else {
            eternalMod = false;
        }
        if (document.getElementById("easyMode").checked) {
            easyMode = true;
            document.getElementById("name").textContent += "Easy ";
        } else {
            easyMode = false;
        }
        if (document.getElementById("visibleTimers").checked) {
            visibleTimers = true;
        } else {
            visibleTimers = false;
        }
        if (document.getElementById("hyperImpurity").checked) {
            hyperImpurity = true;
            document.getElementById("name").textContent += "HYIM ";
        } else {
            hyperImpurity = false;
        }
        if (document.getElementById("shorterKT").checked) {
            shorterKT = true;
            document.getElementById("name").textContent += "SHKT ";
        } else {
            hyperImpurity = false;
        }
        document.getElementById("name").textContent += "Beems's Challenge For You";
        if (document.getElementById("prePatch").checked) {
            prePatch = true;
            document.getElementById("name").textContent += " Pre-Patch";
        } else {
            prePatch = false;
        }
    }
});
document.getElementById("next").addEventListener("click", (e) => {
    document.getElementById("dialogue").textContent = dialogue[dialogueIter];
    if (dialogueIter === 7) {
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
document.getElementById("maxModeCompleted").addEventListener("mousedown", (e) => {
    location.reload();
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
    power -= 0.1;
    shocked = true;
});
document.getElementById("bulletBeems").addEventListener("mousedown", (e) => {
    bulletBeems.spawnTimer = 0;
    bulletBeems.x = 0;
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
    "hi",
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
    if (silentBeemathon) {
        for (let i = 1; i<4; i++) {
            document.getElementById("background"+i).style.backgroundPositionX = time * i / 10 * i / 4 + "vh";
            document.getElementById("background"+i).style.backgroundPositionY = time * i / 10 + "vh";
            document.getElementById("BCFY"+i).style.transform = `translate(${-50 + Math.random() * 5 - 2.5}%,${-50 + Math.random() * 30 - 15}%)`;
        }
    } else {
        for (let i = 1; i<4; i++) {
            document.getElementById("background"+i).style.backgroundPositionX = time * i / 100 * i / 4 + "vh";
            document.getElementById("background"+i).style.backgroundPositionY = time * i / 150 + "vh";
            document.getElementById("BCFY"+i).style.transform = `translate(${-50 + Math.random() * 5 - 2.5}%,${-50 + Math.random() * 30 - 15}%)`;
        }
    }
    soundVolume += dt;
}
let doorCharacters = [];
let timerCharacters = [];
let foxyBeems = {};
let impurityBeems = {};
let mortimerBeems = {};
let camBeems = {};
let bulletBeems = {}
let diffMult = 1;
let ingameTimer = 0;
let power = 100;
let powerDrain = 0;
let phase = 0;
let shocked = false;
let playtime = 0;
let bestRun = 0;
let eternalBest = 0;
let ppBest = 0;
let BNCBest = 0;
let EEBCFYBest = 0;
let BCFYACBest = 0;
let EBCFYPPBest = 0;
let saveData = {
    playtime: playtime,
    bestRun: bestRun,
    eternalBest: eternalBest,
    ppBest: ppBest,
    BNCBest: BNCBest,
    EEBCFYBest: EEBCFYBest,
    BCFYACBest: BCFYACBest,
    EBCFYPPBest: EBCFYPPBest,
}
function tasCollide(rect1, rect2) {
    return rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.y + rect1.height > rect2.y 
}
let killerOpacity = 1.5;
let killer = "nobody lol";
let silentBeemathonTicks = [false,false,false,false];
let nightLength = 360;
function ingame(dt, time) {
    if (!firstFrame[1]) {
        killerOpacity = 1.5;
        firstFrame[0] = false;
        firstFrame[1] = true;
        firstFrame[2] = false;
        firstFrame[3] = false;
        saveData = {
            playtime: playtime,
            bestRun: bestRun,
            eternalBest: eternalBest,
            ppBest: ppBest,
            BNCBest: BNCBest,
            EEBCFYBest: EEBCFYBest,
            BCFYACBest: BCFYACBest,
            EBCFYPPBest: EBCFYPPBest,
        }
        localStorage.setItem("data", JSON.stringify(saveData));
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
        phase = 0;
        doors = [false,false,false];
        camsOpened = false;
        silentBeemathonTicks = [false,false,false,false];
        if (FNATGCams) {
            document.getElementById("openCams").style.display = "none";
            document.getElementById("fnatgCams").style.display = "block";
        } else {
            document.getElementById("openCams").style.display = "block";
            document.getElementById("fnatgCams").style.display = "none";
        }
        document.getElementById("office").style.display = "block";
        document.getElementById("cams").style.display = "none";
        speedhack = document.getElementById("speedhack").value;
        if (bcfyac) {
            sfx.BCFYAC.play();
        } else if (silentBeemathon) {
            diffMult = 1.6;
            sfx.silentBeemathon.play();
            document.getElementById("ingame").style.filter = "saturate(2) grayscale(1) contrast(2)"
        } else if (beemsNeverClear) {
            diffMult = 2;
            sfx.beemsNeverClear.play();
            nightLength = 72;
            power = 25;
            document.getElementById("lastMinute").style.display = "none";
        } else {
            if (eternalMod) {
                diffMult = 2.2;
                sfx.eternalTheme.play();
            } else {
                diffMult = 1;
                sfx.ingameTheme.play();
            }
        }
        if (easyMode) {
            for (let i = 0; i<6; i++) {
                document.getElementById("cam"+i).style.scale = 1.5;
            } 
            document.getElementById("openCams").style.transform = "translate(-50%,-50%) scale(1.5)";
            diffMult -= 0.3;
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
            moveTime: 6,
            cam: 5,
            element: document.getElementById("impurityBeems")
        }
        mortimerBeems = {
            active: false,
            killTimer: 0,
            killTime: 10,
            moveTimer: 0,
            moveTime: 5,
            cam: 0,
        };
        camBeems = {
            active: false,
            spawnTimer: 0,
            spawnTime: 5,
            killTimer: 0,
            killTime: 5,
        };
        bulletBeems = {
            active: false,
            spawnTimer: 0,
            spawnTime: 4,
            x: 0,
        }
        document.getElementById("killer").textContent = "You died to " + killer + " | Percentage: " + (ingameTimer / nightLength * 100).toFixed(2) + "%";
        ingameTimer = 0;
        for (let i = 0; i<6; i++) {
            document.getElementById("cam" + i).style.backgroundColor = "white";
        }
    }
    killerOpacity -= dt;
    document.getElementById("killer").style.opacity = killerOpacity;
    if (ppBest <= ingameTimer && prePatch && !easyMode) {
        ppBest = ingameTimer;
    }
    if (eternalBest <= ingameTimer && eternalMod && !easyMode) {
        eternalBest = ingameTimer;
    }
    if (bestRun <= ingameTimer && !easyMode) {
        bestRun = ingameTimer;
    }
    if (BNCBest <= ingameTimer && beemsNeverClear) {
        BNCBest = ingameTimer;
    }
    if (EEBCFYBest <= ingameTimer && eternalMod && easyMode) {
        EEBCFYBest = ingameTimer;
    }
    if (BCFYACBest <= ingameTimer && eternalBest && hyperImpurity && shorterKT && !easyMode) {
        BCFYACBest = ingameTimer;
    }
    playtime += dt / speedhack;
    powerDrain = 0;
    for (let i = 0; i<doors.length; i++) {
        if (doors[i]) {
            powerDrain++
        }
    }
    if (camsOpened) powerDrain++;
    power -= powerDrain * dt / 8;
    document.getElementById("silhouette").style.opacity = 0;
    if (bcfyac) {
        document.getElementById("ingame").style.filter = "contrast(2.2) saturate(2.2) sepia(1) hue-rotate(240deg)";
        for (let i = 1; i<4; i++) {
            document.getElementById("fog"+i).style.backgroundPositionX = time * i / 5 * i / 4 + "vh";
            document.getElementById("fog"+i).style.backgroundPositionY = time * i / 10 + "vh";
        }
        document.getElementById("ingame").style.rotate = Math.random()*2-1+"deg";
        if (ingameTimer >= 300) {
            document.getElementById("ingame").style.filter = "contrast(2) saturate(2) sepia(1) hue-rotate(2" + Math.random() * 50 + "deg) brightness(0.3)";
            document.getElementById("ingame").style.rotate = Math.random()*1-0.5+"deg";
        }
    } else if (beemsNeverClear) {
        document.getElementById("ingame").style.filter = "saturate(2.2) grayscale(1) contrast(2.2) brightness(0.5)";
        if (ingameTimer >= 10.4) {
            diffMult = 2.5;
            document.getElementById("ingame").style.filter = "url(#redFilter)";
            document.getElementById("transition").style.opacity = Math.random() / 10;
            document.getElementById("ingame").style.rotate = Math.random()*1-0.5+"deg";
        }
        if (ingameTimer >= 31) {
            document.getElementById("ingame").style.filter = "contrast(2.2) saturate(2.2)";
        }
        if (ingameTimer >= 31.4) {
            document.getElementById("ingame").style.filter = "url(#redFilter) url(#waveFilter)";
            speedhack = 1;
            diffMult = 2.7;
            document.getElementById("wfTurb").setAttribute("seed", Math.round(Math.random() * 1000));
        }
        if (ingameTimer >= 51.5 && ingameTimer <= 51.9) {
            transitionOpacity += dt * 2.2;
        }
        if (ingameTimer >= 51.9) {
            document.getElementById("ingame").style.filter = "";
            diffMult = 1.5;
            document.getElementById("ingame").style.rotate = "";
        }
    } else if (!silentBeemathon) {
        if (eternalMod) {
            if (ingameTimer >= 300) {phase = 4} else {phase = 3};
            document.getElementById("silhouette").style.opacity = (ingameTimer - 300) / 70;
        } else {
            if (prePatch) {
                if (easyMode) {
                    if (ingameTimer >= 20.5 && ingameTimer <= 21)         {diffMult = 1.5; diffMult-=0.3; phase = 1 } else
                    if (ingameTimer >= 40.5 && ingameTimer <= 41)         {diffMult = 2; diffMult-=0.3; phase = 2} else
                    if (ingameTimer >= 81 && ingameTimer <= 82)           {diffMult = 1; diffMult-=0.3; phase = 0} else
                    if (ingameTimer >= 101 && ingameTimer <= 102)         {diffMult = 1.5; diffMult-=0.3; phase = 1;} else
                    if (ingameTimer >= 122 && ingameTimer <= 123)         {diffMult = 2.5; diffMult-=0.3; phase = 3;} else
                    if (ingameTimer >= 141 && ingameTimer <= 142)         {diffMult = 2; diffMult-=0.3; phase = 2;} else
                    if (ingameTimer >= 161 && ingameTimer <= 162)         {diffMult = 1; diffMult-=0.3; phase = 0;} else
                    if (ingameTimer >= 20.5+161 && ingameTimer <= 21+161) {diffMult = 1.5; diffMult-=0.3; phase = 1} else
                    if (ingameTimer >= 40.5+161 && ingameTimer <= 41+161) {diffMult = 2; diffMult-=0.3; phase = 2} else
                    if (ingameTimer >= 81+161 && ingameTimer <= 82+161)   {diffMult = 1.5; diffMult-=0.3; phase = 1} else
                    if (ingameTimer >= 101+161 && ingameTimer <= 102+161) {diffMult = 1.5; diffMult-=0.3; phase = 2} else
                    if (ingameTimer >= 121+161 && ingameTimer <= 122+161) {diffMult = 2.5; diffMult-=0.3; phase = 3}
                } else {
                    if (ingameTimer >= 20.5 && ingameTimer <= 21)         {diffMult = 1.5; phase = 1 } else
                    if (ingameTimer >= 40.5 && ingameTimer <= 41)         {diffMult = 2; phase = 2} else
                    if (ingameTimer >= 81 && ingameTimer <= 82)           {diffMult = 1; phase = 0} else
                    if (ingameTimer >= 101 && ingameTimer <= 102)         {diffMult = 1.5; phase = 1;} else
                    if (ingameTimer >= 122 && ingameTimer <= 123)         {diffMult = 2.5; phase = 3;} else
                    if (ingameTimer >= 141 && ingameTimer <= 142)         {diffMult = 2; phase = 2;} else
                    if (ingameTimer >= 161 && ingameTimer <= 162)         {diffMult = 1; phase = 0;} else
                    if (ingameTimer >= 20.5+161 && ingameTimer <= 21+161) {diffMult = 1.5; phase = 1} else
                    if (ingameTimer >= 40.5+161 && ingameTimer <= 41+161) {diffMult = 2; phase = 2} else
                    if (ingameTimer >= 81+161 && ingameTimer <= 82+161)   {diffMult = 1.5; phase = 1} else
                    if (ingameTimer >= 101+161 && ingameTimer <= 102+161) {diffMult = 1.5; phase = 2} else
                    if (ingameTimer >= 121+161 && ingameTimer <= 122+161) {diffMult = 2.5; phase = 3}
                }
            } else {
                if (ingameTimer >= 20.5 && ingameTimer <= 21) {phase = 1} else
                if (ingameTimer >= 40.5 && ingameTimer <= 41) {phase = 2} else
                if (ingameTimer >= 81 && ingameTimer <= 82) {phase = 0} else
                if (ingameTimer >= 101 && ingameTimer <= 102) {phase = 1;} else
                if (ingameTimer >= 121.5 && ingameTimer <= 122.5) {phase = 3;} else
                if (ingameTimer >= 141 && ingameTimer <= 142) {phase = 2;} else
                if (ingameTimer >= 161 && ingameTimer <= 161.5) {phase = 0;} else
                if (ingameTimer >= 20.5+161 && ingameTimer <= 21+161) {phase = 1} else
                if (ingameTimer >= 40.5+161 && ingameTimer <= 41+161) {phase = 2} else
                if (ingameTimer >= 81+161 && ingameTimer <= 82+161) {phase = 1} else
                if (ingameTimer >= 101+161 && ingameTimer <= 102+161) {phase = 2} else
                if (ingameTimer >= 121+161 && ingameTimer <= 122+161) {phase = 3}
            }
        }
    } else {
        if (ingameTimer / nightLength >= 0.2 && !silentBeemathonTicks[0]) {
            phase = 1;
            diffMult = 1.7;
            mortimerBeems.active = true;
            silentBeemathonTicks[0] = true;
            transitionOpacity = 1;
            sfx.tick1.play();
        }
        if (ingameTimer / nightLength >= 0.4 && !silentBeemathonTicks[1]) {
            phase = 2;
            diffMult = 1.8;
            camBeems.active = true;
            mortimerBeems = {
                active: false,
                killTimer: 10,
                killTime: 0,
                moveTimer: 0,
                moveTime: 5,
                cam: 0,
            };
            silentBeemathonTicks[1] = true;
            transitionOpacity = 1;
            sfx.tick2.play();
            
        }
        if (ingameTimer / nightLength >= 0.6 && !silentBeemathonTicks[2]) {
            phase = 3;
            diffMult = 1.9;
            camBeems.active = false;
            camBeems = {
                active: false,
                spawnTimer: 0,
                spawnTime: 5,
                killTimer: 0,
                killTime: 5,
            };
            bulletBeems.active = true;
            silentBeemathonTicks[2] = true;
            transitionOpacity = 1;
            sfx.tick1.play();
        }
        if (ingameTimer / nightLength >= 0.8 && !silentBeemathonTicks[3]) {
            phase = 4;
            camBeems.active = true;
            mortimerBeems.active = true;
            silentBeemathonTicks[3] = true;
            transitionOpacity = 1;
            sfx.tick2.play();
            sfx.tick1.play();
        }
    }
    if (!beemsNeverClear) {
        document.getElementById("lastMinute").style.opacity = (ingameTimer - nightLength+60) / 50;
        document.getElementById("lastMinute").textContent = Math.floor(nightLength - ingameTimer);
    }
    if (prePatch && eternalMod) {
        if (easyMode) {
            diffMult = 2.2;
        } else {
            diffMult = 2.5;
        }
    }
    if (!bcfyac) {
        for (let i = 1; i<4; i++) {
            document.getElementById("fog"+i).style.backgroundPositionX = time * i / 100 * i / 4 + "vh";
            document.getElementById("fog"+i).style.backgroundPositionY = time * i / 150 + "vh";
        }
        document.getElementById("fogBg").style.filter = "";
        if (phase === 1) {
            document.getElementById("fogBg").style.filter = "hue-rotate("+time/100+"deg)";
            if (silentBeemathon) {
                document.getElementById("ingame").style.filter = "saturate(2.2) grayscale(1) contrast(2.2)";
            }
        }
        if (phase === 2) {
            document.getElementById("fogBg").style.filter = "hue-rotate("+time/33+"deg)";
            document.getElementById("ingame").style.rotate = Math.random()*1-0.5+"deg";
            if (silentBeemathon) {
                document.getElementById("ingame").style.filter = "saturate(2.4) grayscale(1) contrast(2.4)";
            }
        } 
        if (phase === 3) {
            document.getElementById("fogBg").style.filter = "hue-rotate("+time/10+"deg)";
            document.getElementById("ingame").style.rotate = Math.random()*1-0.5+"deg";
            if (silentBeemathon) {
                document.getElementById("ingame").style.filter = "saturate(2.6) grayscale(1) contrast(2.6)";
            }
            for (let i = 1; i<4; i++) {
                document.getElementById("fog"+i).style.backgroundPositionX = time * i / 10 * i / 4 + "vh";
                document.getElementById("fog"+i).style.backgroundPositionY = time * i / 25 + "vh";
            }
        }
        if (phase === 4) {
            document.getElementById("fogBg").style.filter = "hue-rotate("+time/10+"deg)";
            document.getElementById("ingame").style.rotate = Math.random()*1.5-0.75+"deg";
            if (silentBeemathon) {
                document.getElementById("ingame").style.filter = "saturate(3) grayscale(1) contrast(3)";
            } else {
                document.getElementById("ingame").style.filter = "saturate(2)";
            }
            for (let i = 1; i<4; i++) {
                document.getElementById("fog"+i).style.backgroundPositionX = time * i / 5 * i / 4 + "vh";
                document.getElementById("fog"+i).style.backgroundPositionY = time * i / 12.5 + "vh";
            }
        }
    }

    if (!eternalMod && !silentBeemathon) {
        diffMult += dt / 300;
    }
    if (!visibleTimers) {
        if (camsOpened) {
            document.getElementById("leftCharacters").style.display = "none";
        } else {
            document.getElementById("leftCharacters").style.display = "block";
        }
    } else {
        document.getElementById("leftCharacters").style.display = "block";
    }
    document.getElementById("timer").textContent = "Percentage: " + Math.floor(ingameTimer / nightLength * 100) + "%";
    document.getElementById("power").textContent = "Power: " + power.toFixed(1) + "%";
    document.getElementById("difficulty").textContent = "Difficulty: " + diffMult.toFixed(2) + "x";
    ingameTimer += dt;
    if (ingameTimer >= nightLength + 0.1) {
        saveData = {
            playtime: playtime,
            bestRun: bestRun,
            eternalBest: eternalBest,
            ppBest: ppBest,
            BNCBest: BNCBest,
            EEBCFYBest: EEBCFYBest,
            BCFYAC: BCFYACBest,
            EBCFYPPBest: EBCFYPPBest,
        }
        localStorage.setItem("data", JSON.stringify(saveData));
        scene = "win";
    }
    if (power <= 0) {
        firstFrame[1] = false;
        killer = "Power";
    }
    for (let i = 0; i<doorCharacters.length; i++) {
        const char = doorCharacters[i];
        char.moveTimer += dt * char.speed * diffMult;
        if (char.moveTimer >= char.moveTime && !doors[char.door]) {
            char.element.style.opacity = 1;
            if (shorterKT) {
                char.killTimer += dt * 1.5
            } else {
                char.killTimer += dt
            }
            if (char.killTimer >= char.killTime) {
                firstFrame[1] = false;
                killer = "Door Beems " + i; 
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
            killer = "Timer Beems CAM" + tim.cam; 
        }
        tim.element.textContent = "CAM " + tim.cam + " | " + tim.killTimer.toFixed(2) + "s";
        if (cam == tim.cam && shocked) {
            if (silentBeemathon) {
                tim.killTimer = 7 - diffMult;
            } else {
                tim.killTimer = 10 + (Math.random()*5) - diffMult*3;
            }
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
        killer = "Foxy Beems"; 
    }
    if (hyperImpurity) {
        impurityBeems.moveTimer += dt * diffMult * 1.5;
    } else {
        impurityBeems.moveTimer += dt * diffMult;
    }
    if (impurityBeems.moveTimer >= impurityBeems.moveTime) {
        impurityBeems.moveTimer = 0;
        impurityBeems.cam--;
        if (impurityBeems.cam == -1) {
            firstFrame[1] = false;
            killer = "Impurity Beems";
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
    if (mortimerBeems.active) {
        document.getElementById("mortimerBeems").style.display = "none";
        mortimerBeems.moveTimer += dt * diffMult;
        if (mortimerBeems.moveTimer >= mortimerBeems.moveTime) {
            console.log(mortimerBeems);
            if (mortimerBeems.killTimer === 0) {
                mortimerBeems.cam = Math.round(Math.random() * 5);
            }
            if (camsOpened) {
                document.getElementById("mortimerBeems").style.display = "none";
            } else {
                document.getElementById("mortimerBeems").style.display = "block";
            }
            mortimerBeems.killTimer += dt;
            if (camsOpened && mortimerBeems.cam == cam) {
                sfx.mortimerBeems.play();
                if (shocked) {
                    sfx.mortimerBeems.pause();
                    sfx.mortimerBeems.currentTime = 0;
                    mortimerBeems.moveTimer = 0;
                    mortimerBeems.killTimer = 0;
                }
            } else {
                sfx.mortimerBeems.pause();
                sfx.mortimerBeems.currentTime = 0;
            }
            if (mortimerBeems.killTimer >= mortimerBeems.killTime) {
                killer = "mortimerBeems";
                firstFrame[1] = false;
            }
        }   
    } else {
        document.getElementById("mortimerBeems").style.display = "none";
    }
    if (camBeems.active) {
        camBeems.spawnTimer += dt * diffMult;
        if (camBeems.spawnTimer >= camBeems.spawnTime) {
            if (camBeems.killTimer === 0) {
                camBeems.cam = Math.round(Math.random() * 5);
            }
            camBeems.killTimer += dt;
            document.getElementById("cam" + camBeems.cam).style.backgroundColor = "red";
            if (camBeems.cam == cam && camsOpened && shocked) {
                camBeems.spawnTimer = 0;
                camBeems.killTimer = 0;
                document.getElementById("cam" + camBeems.cam).style.backgroundColor = "white";
            }
            if (camBeems.killTimer >= camBeems.killTime) {
                killer = "camBeems";
                firstFrame[1] = false;
            }
        }
    }
    if (bulletBeems.active) {
        bulletBeems.spawnTimer += dt * diffMult;
        document.getElementById("bulletBeems").style.display = "none";
        if (bulletBeems.spawnTimer >= bulletBeems.spawnTime) {
            document.getElementById("bulletBeems").style.display = "block";
            bulletBeems.killTimer += dt;
            bulletBeems.x += dt * 33;
            document.getElementById("bulletBeems").style.left = bulletBeems.x + "%";
            if (camBeems.killTimer >= camBeems.killTime) {
                killer = "bulletBeems";
                firstFrame[1] = false;
            }
        }
    } else {
        document.getElementById("bulletBeems").style.display = "none";
    }
    document.getElementById("officeBG").style.backgroundPositionX = time / 50 + "vh";
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
function win(dt) {
    if (!firstFrame[2]) {
        firstFrame[2] = true;
        for (let key in sfx) {
            sfx[key].pause();
        }
        document.getElementById("ingame").style.display = "none";
        document.getElementById("win").style.display = "flex";
        document.getElementById("maxModeName").textContent = document.getElementById("name").textContent;
        document.getElementById("winTime").textContent = document.getElementById("playtime").textContent;
        transitionOpacity = 1.5;
    }
    transitionOpacity -= dt;
}
let firstUpdateFrame = false;
function update(time) {
    const dt = (time - lastTime) / 1000 * speedhack;
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
            win(dt);
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
    if (data.eternalBest != null) eternalBest = data.eternalBest;
    if (data.ppBest != null) ppBest = data.ppBest;
    if (data.BNCBest != null) BNCBest = data.BNCBest;
    if (data.EEBCFYBest != null) EEBCFYBest = data.EEBCFYBest;
    if (data.BCFYACBest != null) BCFYACBest = data.BCFYACBest;
    if (data.EBCFYPPBest != null) EBCFYPPBest = data.EBCFYPPBest;
    document.getElementById("EBCFYPPBestRun").textContent = "EBCFYPP: " + Math.floor(EBCFYPPBest / 360 * 100) + "%";
    document.getElementById("BCFYACBestRun").textContent = "BCFYAC: " + Math.floor(BCFYACBest / 360 * 100) + "%";
    document.getElementById("EEBCFYBestRun").textContent = "EEBCFY: " + Math.floor(EEBCFYBest / 360 * 100) + "%";
    document.getElementById("BNCBestRun").textContent = "BNC: " + Math.floor(BNCBest / 72 * 100) + "%";
    document.getElementById("normalBestRun").textContent = "BCFY: " + Math.floor(bestRun / 360 * 100) + "%";
    document.getElementById("prePatchBest").textContent = "Pre-Patch: " + Math.floor(ppBest / 360 * 100) + "%";
    document.getElementById("eternalBest").textContent = "Eternal: " + Math.floor(eternalBest / 360 * 100) + "%";
    const seconds = playtime % 60;
    const minutes = playtime / 60 % 60;
    const hours = playtime / 60 / 60;
    document.getElementById("playtime").textContent = "Playtime: " + Math.floor(hours) + (Math.floor(minutes) < 10 ? ":0" : ":") + Math.floor(minutes) + (Math.floor(seconds) < 10 ? ":0" : ":") + Math.floor(seconds);

}
loadProgress();