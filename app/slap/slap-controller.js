




function SlapController() {

    //private
    var slapService = new SlapService()
    var target;
    var playerImg = document.getElementById('player-img')
    var winImg = document.getElementById('win-img')
    function drawItems(){
        var items = slapService.getItems()
        var template = ''
        for (var item in items){
            if(items[item].name =='Flame'){
            template += `<button type="button" class="btn" onclick="app.controllers.slapController.giveItems('` + item + `')"><img class="item-img" src="../../../images/flame.png" style="width:25px;height:25px"></button>`
            }else if(items[item].name == 'Spikes'){
                template += `<button type="button" class="btn" onclick="app.controllers.slapController.giveItems('` + item + `')"><img class="item-img" src="../../../images/spike.png" style="width:25px;height:25px";></button>`
                
            }else{
                template += `<button type="button" class="btn"  onclick="app.controllers.slapController.giveItems('` + item + `')"><img class="item-img text-center" src="../../../images/shield.png" style="width:25px;height:25px"></button>`
                
            }
        }
        document.getElementById('items').innerHTML = template    
    }


    function showWinner() {
        document.getElementById('itemBtns').classList.add('hidden')
        document.getElementById('playBtns').classList.add('hidden')
        document.getElementById('game-div').classList.add('hidden')
        document.getElementById('play-again').classList.remove('hidden')
        if (target.name == 'Mario') {
            winImg.src = 'images/luigi-win.png'
        } else {
            winImg.src = 'images/Mario-win.png'
        }
        
        document.getElementById('winner').innerHTML = `<h3>CONGRATULATIONS, YOU WON!!! PLAY AGAIN?</h3>`
    }

    function update() {
        target = slapService.getTarget()
        if (target.health <= 0) {
            target.health = 0
            showWinner(target.Name)
        }
        document.getElementById('health').innerText = target.health.toFixed(1)
        document.getElementById('hits').innerText = target.hits
        document.getElementById('name').innerText = target.name
    }


    //public
    
    this.play= function play(targetName){
        slapService.setTarget(targetName)
        target = slapService.getTarget()
        document.getElementById('itemBtns').classList.remove('hidden')
        document.getElementById('playBtns').classList.remove('hidden')
        document.getElementById('game-div').classList.remove('hidden')
        document.getElementById('play').classList.add('hidden')
        if(target.name == 'Mario'){
            playerImg.src = 'images/Mario.png'
        }else{
            playerImg.src = 'images/Luigi.png'
            
        }
        update()
    }

    this.playAgain = function playAgain() {
        document.getElementById('play-again').classList.add('hidden')
        document.getElementById('play').classList.remove('hidden')
        
    }

    this.attack = function attack(type) {
        slapService.attack(type)
        update()
    }
    this.giveItems = function giveItems(item){
        slapService.giveItems(item)
        update()
    }












    // update()
    drawItems()



}