//Version 1.4
debug = 1
money = [0];
moneyPowerItems = [1];
thoughts = [0];
thoughtPowerItems = [1];
TactualizeMult = [];
TstudyMult = [];
TlearnMult = [];
TconscMult = [];
job1Price = [];
Tmultiple = [];
actualizeNum = [];
studyNum = [];
learnNum = [];
multiple = [];
priceinfo = [];
moneyTotal = [];
thoughtsTotal = [];
conscLevel = [0]; 
conscLevelFrac = [0];
conscLim = [0];
if (debug == 1) {
    thoughts.push(100000)
    thoughtsTotal.push(100000)
    thoughtTapAdd(1000)
} 
function conscUp() {                                 //adds 1/x to the fraction of consc level, makes next consc level harder if completed
    conscLevelFrac[0] += 1
    if (conscLevelFrac[0] >= conscLim[0]) {
        conscLevelFrac[0] = 0
        conscLim[0] += 5 
        conscLevel[0] += 1 
        console.log(conscLevel)
    } 
}
function thoughtTap() {
    let tapPower = thoughtPowerItems.reduce(function(a, b) { //reduces tapPower list, adds tapPower to thoughts, then reduces thoughts for total
        return a + b;
    }, 0);      
    thoughts.push(tapPower);
    thoughtsTotal.push(tapPower)
}
function thoughtTapAdd(x) {
    return thoughtPowerItems.push(x); //adds given value to tapPower list
}
function moneyTap() {
    let tapPower = moneyPowerItems.reduce(function(a, b) { 
        return a + b;
    }, 0);      
    money.push(tapPower);
    moneyTotal.push(tapPower)
}
function thoughtTapAdd(x) {
    return thoughtPowerItems.push(x); 
}
function pricetest(x, y, z) {  //accesses price for different upgrades
    priceTPowerName = [x, y, z] 
    if (priceTPowerName[2] == 'job1') {
        Tmultiple = job1Price
        TmultipleBackup = Tmultiple;
    }
    if (priceTPowerName[2] == 'consc') {
        Tmultiple = TconscMult
        TmultipleBackup = Tmultiple;
    }
    if (priceTPowerName[2] == 'study') {
        Tmultiple = TstudyMult;
        TmultipleBackup = Tmultiple;
    }
    if (priceTPowerName[2] == 'actualize') { 
        Tmultiple = TactualizeMult;
        TmultipleBackup = Tmultiple;
    }
    if (priceTPowerName[2] == 'learn') { 
        Tmultiple = TlearnMult;
        TmultipleBackup = Tmultiple;
    }
    sum = Tmultiple.reduce(function(a, b) {
        return a + b;
    }, 0);
    Tsubtracted = thoughts.reduce(function(a, b) { //replaces thoughts with (thoughts - price)
        return a + b;
    }, 0) - sum * priceTPowerName[0] - (priceTPowerName[0] * 3);
    console.log("T-SUBTRACTED "+ Tsubtracted);
    priceinfo = [sum * priceTPowerName[0] + (priceTPowerName[0] * 3)] // i dont know exactly what this does, but it may or may not work
    if (Tsubtracted < 0) { //doesn't purchase if not enough thoughts
        Tmultiple = [TmultipleBackup];
        document.getElementById("warning").innerHTML = "You do not have the thoughts to attain this.";
    }else {
        document.getElementById("warning").innerHTML = "";
        Tmultiple.push(3)
        if (priceTPowerName[2] == 'job1') {
            job1Price = Tmultiple;          
            show('money', 0)
            setInterval(displayMoney, 1)
            hide('job1')
        }
        if (priceTPowerName[2] == 'consc') {
            TconscMult = Tmultiple;
            conscUp()
        }
        if (priceTPowerName[2] == 'learn') {    //saves new multiple value, adds 1 to item count 
            TlearnMult = Tmultiple;
            learnNum.push(1)        
        }
        if (priceTPowerName[2] =='actualize') {
            TactualizeMult = Tmultiple;
            actualizeNum.push(1)
        }
        if (priceTPowerName[2] =='study') {
            TstudyMult = Tmultiple;
            studyNum.push(1)
        }
        thoughts = [];
        thoughts.push(Tsubtracted);
        thoughtTapAdd(priceTPowerName[1]);       
    }
}
function displayThoughts() {
    document.getElementById("currentThoughts").innerHTML = thoughts.reduce(function(a, b) {
        return a + b;
    }, 0);
}
function displayMoney() {
    document.getElementById("currentMoney").innerHTML = '$' + money.reduce(function(a, b) {
        return a + b;
    }, 0);
}
function activeUpgradeInfo(type) {                  //ACTIVE//
    document.getElementById("info").innerHTML = "cost: " + priceinfo;
    if (type == 'consc') {
        document.getElementById("info2").innerHTML = "Level: " + (conscLevel[0]) + " | " + conscLevelFrac[0] + '/' + conscLim[0]
        document.getElementById("info").innerHTML = "cost: " + priceinfo;
    }
}
function passiveInfo(name, type, info) {                                        
    nameTypeInfo = [name, type, info]
    document.getElementById("name").innerHTML = (nameTypeInfo[0]);
    if ((nameTypeInfo[1]) == 'upgrade') {
        document.getElementById("info").innerHTML = "cost: " + priceinfo;
        document.getElementById("info2").innerHTML = (nameTypeInfo[2])              //PASSIVE//
    }
    if ((nameTypeInfo[0]) == 'consciousness') {
        document.getElementById("info").innerHTML = "cost: " + priceinfo
        document.getElementById("info2").innerHTML = "Level: " + (conscLevel[0]) + " | " + conscLevelFrac[0] + '/' + conscLim[0]}
    if ((nameTypeInfo[0]) == 'Think') {
        document.getElementById("info2").innerHTML = "thoughts per tap: " + thoughtPowerItems.reduce(function(a, b) {
        return a + b;
        }, 0);}
    if ((nameTypeInfo[1] == 'ach')) {document.getElementById("info").innerHTML = (nameTypeInfo[2])}
    }
function popupclear() {
    document.getElementById("name").innerHTML = ' ';
    document.getElementById("warning").innerHTML = ' ';
    document.getElementById("info").innerHTML = ' ';
    document.getElementById("info2").innerHTML = ' ';
}
setInterval(displayThoughts, 1);
setInterval(show, 5, 'learn', 10);                 
setInterval(show, 5, 'study', 100); 
setInterval(show, 5, 'actualize', 600);
setInterval(job1Hide, 5)
setInterval(acheive, 5, 'thoughts1', 'thoughtsTotal', 1);
setInterval(acheive, 5, 'thoughts2', 'thoughtsTotal', 4000);
setInterval(acheive, 5, 'thoughts3', 'thoughtsTotal', 25000);
setInterval(acheive, 5, 'consc1', 'conscLevel', 2);
setInterval(acheive, 5, 'consc2', 'conscLevel', 3);
function job1Hide() {
    if (moneyTotal.reduce(function(a, b) {return a + b;}, 0) > 0) {
        hide('job1')
    } else if(thoughtsTotal.reduce(function(a, b) {return a + b;}, 0) > 100) {
        show('job1', 0)
    }
}
function hide(name) {document.getElementById(name).style.visibility = 'hidden'}
function show(name, bound) {
    nameBound = [name, bound];
    total = thoughtsTotal.reduce(function(a, b) {
        return a + b;
    }, 0);
    if (total > (nameBound[1])) {document.getElementById((nameBound[0])).style.visibility = 'visible'}
}
function acheive(name, method, bound) { 
    qualities = [name, method, bound]
    if ((qualities[1]) == 'thoughtsTotal') {
        total = thoughtsTotal.reduce(function(a, b) {
           return a + b;
        }, 0);
        if (total >= (qualities[2])) {document.getElementById((qualities[0])).style.visibility = 'visible'}
    }
        if ((qualities[1]) == 'learnNu)m') {if (learnNum.length >= (qualities[2])) {
            document.getElementById((qualities[0])).style.visibility = 'visible'}}
        if ((qualities[1]) == 'conscLevel') {if (conscLevel[0] >= (qualities[2])) {
            document.getElementById((qualities[0])).style.visibility = 'visible'}}
}
