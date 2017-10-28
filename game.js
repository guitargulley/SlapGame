//global variables====================================

var brandon = new Player('Brandon', 100, 0)
var john = new Player('John', 100, 0)

var modsArray = []
var players = []
players.push(brandon, john)
console.log(players)

var items = {
    flame: new Item('Flame', 2, 'Increases damage from hit by 2'),
    spikes: new Item('Spikes', 1.5, 'Increases damage from hit by 1.5'),
    shield: new Item('Shield', .5, 'cuts damage in half')
}
console.log(items)
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
    
    //debugger
    modsArray.shift()
    console.log(modsArray)
}

function showWinner(){
    //debugger
    document.getElementById('itemBtns').classList.add('hidden')
    document.getElementById('playBtns').classList.add('hidden')
}
//Add items into player object==========================

function giveItems(playerName, itemName) {
    // debugger
    var player = findPlayer(playerName)
    var item = findItems(itemName)
    player.items.push(item)
    console.log(brandon)
    addMods(player)
    hideBtn()
    
}

function addMods(player) {
   // debugger
    for (var i = 0; i < player.items.length; i++) {
        var mod = player.items[i];
        modsArray.push(mod)
        //return modsArray
    }
    console.log(modsArray)
    return modsArray
}
function sumMods(modsArray){
    var output = 0
    for (var i = 0; i < modsArray.length; i++) {
        output += modsArray[i].modifier
        console.log(output)
        return output
    }output = 1
    return output
    console.log(output)
}

//Support functions for finding people, items============
function findItems(itemName) {
    var output = {}
    for (var name in items) {
        if (name === itemName) {
            output = items[name]
            console.log(output)
            return output
        }
    } return output
}

function findPlayer(playerName) {
    console.log(playerName)
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
    //debugger
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
    document.getElementById('health').innerText = player.health
    document.getElementById('hits').innerText = player.hits
    document.getElementById('name').innerText = player.name
    var player = findPlayer(playerName)
    player.items.splice(0)
    console.log(player.items)
    console.log(items)
}




update('Brandon')

