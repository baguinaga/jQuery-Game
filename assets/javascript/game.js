$(document).ready(function () {

  //initializing variables (for on hover/select and Character methods)

  var anakin = new Character($("#anakin"), "Anakin Skywalker", 1000, 150, 100, false, false);
  var obiWan = new Character($("#obiWan"), "Obi-Wan Kenobi", 1200, 140, 250, false, false);
  var hanSolo = new Character($("#hanSolo"), "Han Solo", 800, 120, 160, false, false);
  var luke = new Character($("#luke"), "Luke Skywalker", 1100, 140, 100, false, false)
  var darthVader = new Character($("#darthVader"), "Darth Vader", 900, 160, 300, false, false);


  var player = {};
  var enemy = {};
  var playerChars = [anakin, obiWan, hanSolo,luke,darthVader];

  //Character Select Booleans and Character Active booleans

  var playerActive = true;
  var enemyActive = true;
  var playerSelected = false;
  var enemySelected = false;

  //testing characters

  console.log(anakin, obiWan);

  //object constructor function and object methods

  function Character(reference, name, hp, attack, defense, isPlayer, isEnemy) {
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
          $(this).addClass("char-banner-player");
          playerSelected = true;
          playerChars[i].isPlayer = true;
          hero = {...playerChars[i]};
        } else if (playerSelected === true && enemySelected === false) {
          if ($(this).attr("src") != $("#player").attr("src")) {
            $("#enemy").attr("src", $(this).attr("src"));
            $(this).addClass("char-banner-enemy");
            enemySelected = true;
            playerChars[i].isEnemy = true;
            
          }
        }
      })
    }
  }

  function clickOnAttack() {
    for(let i = 0; i < playerChars.length; i++) {
      if (playerChars[i].isEnemy === true) {
        var enemyTemp = playerChars[i]; 
      }
      if (playerChars[i].isPlayer === true) {
        playerChars.attack(enemyTemp);
        console.log(enemyTemp);
      }
    }
  }

  //testing the click on attack function 
  clickOnAttack()

  // character select used to initialize the game
  charSelect();

  // on click event listener for attack button (should call on player character methods)

  //function for removing characters from play

});