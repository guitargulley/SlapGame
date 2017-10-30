//global variables====================================

var mario = new Player('Mario', 100, 0)
var luigi = new Player('Luigi', 100, 0)
var playerImg = document.getElementById('player-img')
var winImg = document.getElementById('win-img')
var modsArray = []
var players = []
var activePlayer = ''
players.push(mario, luigi)

var items = {
    flame: new Item('Flame', 1.5, 'Increases damage from hit by 1.5'),
    spikes: new Item('Spikes', 1.2, 'Increases damage from hit by 1.2'),
    shield: new Item('Shield', .7, 'reduces damage')
}
//Constructor functions ================================

function Player(name, health, hits, items) {
    this.name = name,
        this.health = health,
        this.hits = hits,
        this.items = []
}

function Item(name, modifier, description) {
    this.name = name,
        this.modifier = modifier,
        this.description = description
}
function hideBtn(){
    document.getElementById('itemBtns').classList.add('hidden')
}
function addBtn(){
    document.getElementById('itemBtns').classList.remove('hidden')
    modsArray.shift()
}
function play(playerName){
    var player = findPlayer(playerName)
    player.health = 100
    player.hits = 0
    document.getElementById('itemBtns').classList.remove('hidden')
    document.getElementById('playBtns').classList.remove('hidden')
    document.getElementById('game-div').classList.remove('hidden')
    document.getElementById('play').classList.add('hidden')
    if(playerName == 'Mario'){
        playerImg.src = 'images/Mario.png'
        activePlayer = 'Mario'
    }else{
        playerImg.src = 'images/Luigi.png'
        activePlayer = 'Luigi'
    }
    update(activePlayer)
}
function playAgain(){
    document.getElementById('play-again').classList.add('hidden')
    document.getElementById('play').classList.remove('hidden')
    
    
}
function showWinner(activePlayer){
    document.getElementById('itemBtns').classList.add('hidden')
    document.getElementById('playBtns').classList.add('hidden')
    document.getElementById('game-div').classList.add('hidden')
    document.getElementById('play-again').classList.remove('hidden')
    if(activePlayer == 'Mario'){
        winImg.src = 'images/luigi-win.png'
    }else{
        winImg.src = 'images/Mario-win.png'
    }
    document.getElementById('winner').innerHTML=`<h3>CONGRATULATIONS, YOU WON!!! PLAY AGAIN?</h3>`
}
//Add items into player object==========================

function giveItems(activePlayer, itemName) {
    var player = findPlayer(activePlayer)
    var item = findItems(itemName)
    player.items.push(item) 
    addMods(player)
    hideBtn()   
}

function addMods(player) {
    for (var i = 0; i < player.items.length; i++) {
        var mod = player.items[i];
        modsArray.push(mod)
    }
    return modsArray
}
function sumMods(modsArray){
    var output = 0
    for (var i = 0; i < modsArray.length; i++) {
        output += modsArray[i].modifier
        return output
    }output = 1
    return output
}

//Support functions for finding people, items============
function findItems(itemName) {
    var output = {}
    for (var name in items) {
        if (name === itemName) {
            output = items[name]
            return output
        }
    } return output
}

function findPlayer(activePlayer) {
    var output = {}
    for (var i = 0; i < players.length; i++) {
        var player = players[i]
        if (player.name === activePlayer) {
            output = player
        }
    } return output
}

// Game Play Functions ==================================
function slap(activePlayer) {
    var player = findPlayer(activePlayer)
    player.health -= 1 * sumMods(modsArray)
    player.hits += 1
    update(activePlayer)
}
function punch(activePlayer) {
    var player = findPlayer(activePlayer)
    player.health -= 5 * sumMods(modsArray)
    player.hits += 1
    update(activePlayer)   
}
function kick(activePlayer) {
    var player = findPlayer(activePlayer)
    player.health -= 10 * sumMods(modsArray)
    player.hits += 1
    update(activePlayer)   
}

//Update Screen Functions ================================
function update(activePlayer) {
    addBtn()
    var player = findPlayer(activePlayer)
    if (player.health <= 0) {
        player.health = 0
        showWinner(activePlayer)    
    }
    document.getElementById('health').innerText = player.health.toFixed(1)
    document.getElementById('hits').innerText = player.hits
    document.getElementById('name').innerText = player.name
    var player = findPlayer(activePlayer)
    player.items.splice(0)
}


