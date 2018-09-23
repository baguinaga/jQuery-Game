$(document).ready(function () {

  //initializing variables (for on hover/select and Character methods)

  var anakin = new Character($("#anakin"), "Anakin Skywalker", 1800, 120, 300);
  var obiWan = new Character($("#obiWan"), "Obi-Wan Kenobi", 2200, 140, 450);
  var hanSolo = new Character($("#hanSolo"), "Han Solo", 1600, 110, 350);
  var luke = new Character($("#luke"), "Luke Skywalker", 1800, 150, 400)
  var darthVader = new Character($("#darthVader"), "Darth Vader", 1600, 150, 500);

  var player = {};
  var enemy = {};
  var playerChars = [anakin, obiWan, hanSolo, luke, darthVader];
  var enemyDefeated = [];

  //Character Select Booleans and Character Active booleans

  var playerActive = true;
  var enemyActive = true;
  var playerSelected = false;
  var enemySelected = false;

  //object constructor function and object methods

  function Character(reference, name, hp, attack, defense) {
    this.reference = reference;
    this.name = name;
    this.hp = hp;
    this.attack = attack;
    this.defense = defense;

    this.combat = function (enemy) {
      enemy.hp -= this.attack;
      if (enemy.hp <= 0) {
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

  function statusText(object) {
    if (playerSelected === false || object === player) {
      if (object.hp <= 0) {
        $("#playerHealth").text("0");
      } else {
        $("#playerHealth").text(object.hp);
      }
      $("#playerName").text(object.name);
      $("#playerAttack").text(object.attack);
    } else if (playerSelected === true && enemySelected === false || object === enemy) {
      if (object.hp <= 0) {
        $("#enemyHealth").text("0");
      } else {
        $("#enemyHealth").text(object.hp);
      }
      $("#enemyName").text(object.name);
      $("#enemyDefense").text(object.defense);
    }
  }

  // event listener functions for character select and stats on hover
  // event listener functions for enemy select (after character select) and after enemy defeated

  function charSelect() {
    for (let i = 0; i < playerChars.length; i++) {
      $(playerChars[i].reference).on("mouseover", function () {
        statusText(playerChars[i]);
      })
      $(playerChars[i].reference).click(function () {
        if (playerSelected === false) {
          $("#player").attr("src", $(this).attr("src"));
          $(this).addClass("char-banner-player");
          player = { ...playerChars[i]
          };
          playerSelected = true;
        } else if (playerSelected === true && enemySelected === false) {
          if ($(this).attr("src") != $("#player").attr("src") && !enemyDefeated.includes(playerChars[i])) {
            $("#enemy").attr("src", $(this).attr("src"));
            $("#enemy").removeClass("char-selected-defeated");
            $(this).addClass("char-banner-enemy");
            enemy = { ...playerChars[i]
            };
            enemySelected = true;
            enemyActive = true;
          }
        }
      })
    }
  }

  function reset() {
    console.log("the game has been reset")
    playerActive = true;
    enemyActive = true;
    playerSelected = false;
    enemySelected = false;
    $("#player").attr("src", "assets/images/TransparentPlaceholder.png");
    $("#enemy").attr("src", "assets/images/TransparentPlaceholder.png");
    console.log($(".char-banner"));
    $(".char-banner").removeClass("char-banner-defeated char-selected-defeated char-banner-player char-banner-enemy");
    charSelect();
  }

  // click on attack function, that requires the player and enemy objects
  // will not run until player select has completed

  function combatOnClick() {
    if (playerActive === true && enemyActive === true && enemySelected === true) {
      player.combat(enemy);
      statusText(enemy);
      statusText(player);
      if (playerActive === false) {
        reset();
        console.log("player is dead");
      } else if (enemyActive === false) {
        enemySelected = false;
        $(enemy.reference).addClass("char-banner-defeated");
        $("#enemy").addClass("char-selected-defeated");
        enemyDefeated.push(enemy);
        console.log(enemyDefeated);
        if (enemyDefeated.length != 4) {
          charSelect();
          console.log("enemy is dead");
        } else {
          $("#enemy")
            .removeClass("char-selected-defeated")
            .attr("src", "assets/images/victory.png");
          console.log("this is the winning scenario; still need to balance the game")
        }
      }
    }
  }

  // on click event listener for attack button (should call on player character methods)

  $("#attack-btn").on("click", function () {
    if (playerSelected === true && enemySelected === true) {
      combatOnClick();
    }
  });

  // character select; Used to initialize the game

  charSelect();
});