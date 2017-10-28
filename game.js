//global variables====================================

var brandon = new Player('Brandon', 100, 0)
var john = new Player('John', 100, 0)

var players = []
players.push(brandon, john)
console.log(players)

var items = {
    flame: new Item('Flame', 2, 'adds 20 health points back to player'),
    spikes: new Item('Spikes', 1.5, 'Increases damage from hit by 1.5 times'),
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


//Add items into player object==========================

function giveItems(playerName, itemName) {
    // debugger
    var player = findPlayer(playerName)
    var item = findItems(itemName)
    player.items.push(item)
    console.log(brandon)
    addMods(player)
}

function addMods(player){
    debugger
    var modsArray = []
    for (var item in player.items){
        for (var i = 0; i < player.items[item].length; i++) {
            var mod = player.items[item][i];
            mod.shift(modsArray.push(mod))
            console.log(modsArray)
            
        }
        return modsArray
    }
    return modsArray
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
    }return output
}

function findPlayer(playerName) {
    console.log(playerName)
    var output = {}
    for (var i = 0; i < players.length; i++) {
        var player = players[i]
        if (player.name === playerName) {
            output = player
        }
    }return output   
}

// Game Play Functions ==================================
function slap(playerName) {
    var player = findPlayer(playerName)
    player.health -= 1
    player.hits += 1
    update(playerName)

}
function punch(playerName) {
    var player = findPlayer(playerName)
    player.health -= 5
    player.hits += 1
    update(playerName)

}
function kick(playerName) {
    var player = findPlayer(playerName)
    player.health -= 10
    player.hits += 1
    update(playerName)

}

//Update Screen Functions ================================
function update(playerName) {
    var player = findPlayer(playerName)
    if (player.health < 0) {
        player.health = 0
    }
    document.getElementById('health').innerText = player.health
    document.getElementById('hits').innerText = player.hits
    document.getElementById('name').innerText = player.name

}




update('Brandon')

