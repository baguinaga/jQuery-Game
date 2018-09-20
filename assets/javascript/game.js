$(document).ready(function () {
  
  //initializing variables (on hover/select)

  var anakin = new character($("#anakin"),"Anakin Skywalker", 1000, 100, 150, false, false);
  var obiWan = new character($("#obiWan"), "Obi-Wan Kenobi", 1000, 100, 150, false, false);


  //Enemy Select Boolean and Enemy defeated
  var enemyDefeated = true; 

  //testing characters

  console.log(anakin);
  console.log(obiWan);

  //object constructor function and  object methods

  function character(reference, name, hp, attack, defense, isPlayer, isEnemy) {
    this.reference = reference
    this.name = name;
    this.hp = hp;
    this.attack = attack;
    this.defense = defense;
    this.isPlayer = isPlayer;
    this.isEnemy = isEnemy;

    this.attack = function(enemy) {
      enemy.hp -= this.attack;
        if(enemy.hp === 0) {
          return enemyDefeated = true;
        } else {
          this.hp -= enemy.defense
        }

    }

  }

  // event listener functions for character stats on hover (before character select) and (character select)

  // even listener function for enemy select (after character select) and after enemy defeated

  // on click event listener for attack button (should call on player character methods)

  //function for removing characters from play

  //initializing characters

  //testing document readiness
  $(document).ready(function () {
    console.log("ready!");
  });

});