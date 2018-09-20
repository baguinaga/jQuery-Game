$(document).ready(function () {

  //initializing variables (on hover/select)

  var anakin = new character($("#anakin"), "Anakin Skywalker", 1000, 150, 100, false, false);
  var obiWan = new character($("#obiWan"), "Obi-Wan Kenobi", 1200, 140, 200, false, false);

  var playerChars = [anakin, obiWan];

  //Enemy Select Booleans and Enemy defeated
  var playerActive = true;
  var enemyActive = true;
  var playerSelected = false;
  var enemySelected = false;

  //testing characters

  console.log(anakin, obiWan);

  //object constructor function and object methods

  function character(reference, name, hp, attack, defense, isPlayer, isEnemy) {
    this.reference = reference;
    this.name = name;
    this.hp = hp;
    this.attack = attack;
    this.defense = defense;
    this.isPlayer = isPlayer;
    this.isEnemy = isEnemy;

    this.combat = function (enemy) {
      enemy.hp -= this.attack;
      if (enemy.hp === 0) {
        this.attack += this.attack;
        return enemyActive = false;
      } else {
        this.attack += this.attack;
        this.hp -= enemy.defense;
        if (this.hp <= 0) {
          return playerActive = false;
        }
        return enemyActive = true;
      }
    }
  }

  //combat method for testing purposes, remove this after completion

  console.log(anakin, obiWan);

  // event listener functions for character select and stats on hover
  // event listener functions for enemy select (after character select) and after enemy defeated

  function charSelect() {
    for (let i = 0; i < playerChars.length; i++) {
      $(playerChars[i].reference).on("mouseover", function () {
        if (playerSelected === false) {
          $("#playerName").text(playerChars[i].name);
          $("#playerHealth").text(playerChars[i].hp);
          $("#playerAttack").text(playerChars[i].attack);
        } else if (playerSelected === true && enemySelected === false) {
          $("#enemyName").text(playerChars[i].name);
          $("#enemyHealth").text(playerChars[i].hp);
          $("#enemyDefense").text(playerChars[i].defense);
        }
      })
      $(playerChars[i].reference).click(function () {
        if (playerSelected === false) {
          $("#player").attr("src", $(this).attr("src"));
          playerSelected = true;
        } else if (playerSelected === true && enemySelected === false) {
          if ($(this).attr("src") != $("#player").attr("src")) {
            $("#enemy").attr("src", $(this).attr("src"));
            enemySelected = true;
          }
        }
      })
    }
  }

  // character select used to initialize the game
  charSelect();

  // on click event listener for attack button (should call on player character methods)

  //function for removing characters from play

});