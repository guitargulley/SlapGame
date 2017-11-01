function SlapService(){
//private
var players = {
    mario: new Target("Mario", 100, 1, 5, 10),
    luigi: new Target("Luigi", 100, 1, 5, 10),
    peach: new Target("Peach", 100, 1, 5, 10),
    yoshi: new Target("Yoshi", 100, 1, 5, 10),
    bowser: new Target("Bowser", 100, 1, 5, 10),
    toad: new Target("Toad", 100, 1, 5, 10)
}

var target;



var items = {
    flame: new Item('Flame', .5, 'Increases damage from hit by 1.5'),
    spikes: new Item('Spikes', .2, 'Increases damage from hit by 1.2'),
    shield: new Item('Shield', -.4, 'reduces damage')
}

function Target(name, health, slap, punch, kick){
    this.name = name,
    this.health = health,
    this.attacks = {
        slap: slap,
        punch: punch,
        kick: kick
    };
    this.items = [],
    this.hits = 0
}

function Item(name, modifier, description){
    this.name = name, 
    this.modifier = modifier,
    this.description = description
}

function addMods(){
    
    var total = 1
    for (var i = 0; i < target.items.length; i++) {
        var item = target.items[i];
        total += item.modifier
        
    }
    return total
}


//public

this.attack = function attack(type){
    if(target.attacks[type]){
        target.health -= target.attacks[type] * addMods()
        target.hits++
    }
    target.items = []
}

this.giveItems = function giveItems(item){
    target.items.push(items[item])
}

this.setTarget = function setTarget(targetName){
    target = players[targetName]
    console.log(target)
}
this.getTarget = function getTarget(){
    return JSON.parse(JSON.stringify(target))
}
this.getItems = function getItems(){
    return JSON.parse(JSON.stringify(items))
}
this.playAgain = function playAgain(){
    target.health = 100
    target.hits = 0
}
}