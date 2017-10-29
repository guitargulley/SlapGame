//global variables====================================

var mario = new Player('Mario', 100, 0)
var luigi = new Player('Luigi', 100, 0)

var modsArray = []
var players = []
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
    update(playerName)
}
function playAgain(playerName){
    var player = findPlayer(playerName)
    document.getElementById('itemBtns').classList.remove('hidden')
    document.getElementById('playBtns').classList.remove('hidden')
    document.getElementById('game-div').classList.remove('hidden')
    document.getElementById('play-again').classList.add('hidden')
    player.health = 100
    player.hits = 0
    update(playerName)
}
function showWinner(){
    document.getElementById('itemBtns').classList.add('hidden')
    document.getElementById('playBtns').classList.add('hidden')
    document.getElementById('game-div').classList.add('hidden')
    document.getElementById('play-again').classList.remove('hidden')
    document.getElementById('winner').innerHTML=`<h3>CONGRATULATIONS, YOU WON!!! PLAY AGAIN?</h3>`
}
//Add items into player object==========================

function giveItems(playerName, itemName) {
    var player = findPlayer(playerName)
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

function findPlayer(playerName) {
    var output = {}
    for (var i = 0; i < players.length; i++) {
        var player = players[i]
        if (player.name === playerName) {
            output = player
        }
    } return output
}

// Game Play Functions ==================================
function slap(playerName) {
    var player = findPlayer(playerName)
    player.health -= 1 * sumMods(modsArray)
    player.hits += 1
    update(playerName)
}
function punch(playerName) {
    var player = findPlayer(playerName)
    player.health -= 5 * sumMods(modsArray)
    player.hits += 1
    update(playerName)   
}
function kick(playerName) {
    var player = findPlayer(playerName)
    player.health -= 10 * sumMods(modsArray)
    player.hits += 1
    update(playerName)   
}

//Update Screen Functions ================================
function update(playerName) {
    addBtn()
    var player = findPlayer(playerName)
    if (player.health <= 0) {
        player.health = 0
        showWinner()    
    }
    document.getElementById('health').innerText = player.health.toFixed(1)
    document.getElementById('hits').innerText = player.hits
    document.getElementById('name').innerText = player.name
    var player = findPlayer(playerName)
    player.items.splice(0)
}
//update(playerName)

