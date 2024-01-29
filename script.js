function startGame() {
    var xp = 0;
    var health = 100;
    var gold = 50;
    var attack = 10;
    var DragonHealth = 100;
    var slimeAttack = 10;
    var MonkeyAttack = 15;
    var DragonAttack = 50;
    var SlimeHealth = 50;
    var MonkeyHealth = 75;

    const button01 = document.querySelector("#button01");
    const button02 = document.querySelector("#button02");
    const button1 = document.querySelector("#button1");
    const button2 = document.querySelector("#button2");
    const button3 = document.querySelector("#button3");

    const buttonAvoid = document.querySelector("#Avoid");
    const buttonAvoidMonkey = document.querySelector("#AvoidMonkey"); 
    const buttonAvoidSlime = document.querySelector("#AvoidSlime");

    const buttonDragonAttack = document.querySelector("#DragonAttack");
    const buttonMonkeyAttack = document.querySelector("#MonkeyAttack");
    const buttonSlimeAttack = document.querySelector("#SLimeAttack");
    

    const buttonBuyXP = document.querySelector("#buttonXP");
    const buttonBuyHealth = document.querySelector("#buttonHealth");

    const text = document.querySelector("#text");
    const xpText = document.querySelector("#xpText");
    const healthText = document.querySelector("#healthText");
    const goldText = document.querySelector("#goldText");
    const monsterStats = document.querySelector("#monsterStats");
    const monsterName = document.querySelector("#monsterName");
    const monsterHealthText = document.querySelector("#monsterHealth");
    const homeMessage = document.querySelector("#homeMessage");

    // Hide buttons initially
    button1.style.display = "none";
    button2.style.display = "none";
    button3.style.display = "none";

    function goTown() {
        button1.style.display = "inline-block";
        button2.style.display = "inline-block";
        button3.style.display = "inline-block";

        button1.innerText = "Go to store";
        button2.innerText = "Go to cave";
        button3.innerText = "Fight dragon";
        button1.onclick = goStore;
        button2.onclick = goCave;
        button3.onclick = fightDragon;
        text.innerText = "You are in the town square. Where do you want to go?";
        homeMessage.innerText = "\nWelcome to the town of Dragon Repeller. You must defeat the dragon that is preventing people ";
    }

    function goHome() {
        button1.style.display = "none";
        button2.style.display = "none";
        button3.style.display = "none";
        homeMessage.innerText = "\nGo back next time to help their town in monsters!!!";
    }

    function goStore() {
        button1.innerText = "Buy 10 health (10 gold)";
        button2.innerText = "Buy XP (30 gold)";
        button3.innerText = "Go to town square";
        button1.onclick = buyHealth;
        button2.onclick = buyXP;
        button3.onclick = goTown;
        text.innerText = "You enter the store.";
        homeMessage.innerText = "\nYou are in the store now!!!";
    } 

    function buyHealth() {
        const healthCost = 10; // Cost to buy health

        if (gold >= healthCost) {
            health += 10;
            gold -= healthCost;
            updateStats(); // Update the stats after buying health
        } else {
            homeMessage.innerText = "\nYou don't have enough coins to buy health!!!";
        }
    }

    function buyXP() {
        const xpCost = 30; // Cost to buy XP

        if (gold >= xpCost) {
            attack += 10;
            xp += 10;
            gold -= xpCost;
            updateStats(); // Update the stats after buying XP
        } else {
            homeMessage.innerText = "\nYou don't have enough coins to buy XP!!!";
        }
    }

    function fightDragon() {
        button1.innerText = "Attack";
        button2.innerText = "slide";
        button3.innerText = "run";
        button1.onclick = Attack;
        button2.onclick = Avoid;
        button3.onclick = goTown;
        text.innerText = "You enter the store.";
        homeMessage.innerText = "\nYou are about to fight the Monster. GOODLUCK!!!";
    }  

    function Avoid() {
        homeMessage.innerText = "\nNice, you immune the Dragon Attack!!!";
        const health = health;
        updateStats();
    }

    function Attack() {
        const dragonAttack = DragonAttack;

        if (health > 0) {
            // Player attacks the dragon
            DragonHealth -= attack;

            // Check if the dragon is defeated
            if (DragonHealth <= 0) {
                dragonDefeated();
            } else {
                // Dragon counter-attacks
                health -= dragonAttack;

                // Check if the player is defeated
                if (health <= 0) {
                    gameOver();
                } else {
                    updateStats(); // Update the stats after the attacks
                }
            }
        } else {
            gameOver(); // Player has 0 or less health, game over
        }
    }

    function dragonDefeated() {
        text.innerText = "You defeated the dragon!";
        homeMessage.innerText = "\nCongratulations! You have successfully repelled the dragon and saved the town.";
        // Additional logic or actions after defeating the dragon
        updateStats();
    }

    function gameOver() {
        text.innerText = "Game Over! You have been defeated by the dragon.";
        homeMessage.innerText = "\nYou fought bravely, but the dragon proved too powerful. What would you like to do?";
    
        // Display buttons for choices
        button1.style.display = "inline-block";
        button2.style.display = "inline-block";
        button3.style.display = "none"; // Hide the third button
    
        button1.innerText = "Retry";
        button2.innerText = "Quit";
    
        // Set button actions
        button1.onclick = retryGame;
        button2.onclick = quitGame;
    
        updateStats();
    }

    function retryGame() {
        homeMessage.innerText = "\nYou must go home and if you buy to shop, your life will return.";
        startGame();
        health = 100;
    }

    function quitGame() {
        // Quit the game or perform additional actions as needed
        homeMessage.innerText = "\nThanks for playing Dragon Repeller! Come back soon!";
    
        // Hide buttons not needed after quitting
        button1.style.display = "none";
        button2.style.display = "none";
    
        // Additional logic or actions when quitting the game
        updateStats();
        health = 0;
    }

    function goCave() {
        button1.innerText = "Fight slime";
        button2.innerText = "Fight Monkey";
        button3.innerText = "Go to town square";
        button1.onclick = fightSlime;
        button2.onclick = fightMonkey;
        button3.onclick = goTown;
        text.innerText = "You enter the cave.";
        homeMessage.innerText = "\nYou are in a cave.\nBe careful, there are so much monster in here!!!";
    }

    function fightSlime() {
        button1.innerText = "Attack";
        button2.innerText = "slide";
        button3.innerText = "run";
        button1.onclick = AttackSlime;
        button2.onclick = AvoidSlime;
        button3.onclick = goTown;
        homeMessage.innerText = "\nYou are about to fight the Monster. GOODLUCK!!!";
    }  

    function AttackSlime() {
        const SLIMEATTACK = slimeAttack;

        if (health > 0) {
            SlimeHealth -= attack;

            if (SlimeHealth <= 0) {
                slimeDefeated();
                gold += 30;
                SlimeHealth = 50;
            } else {
                health -= SLIMEATTACK;

                if (health <= 0) {
                    gameOver();
                } else {
                    
                    updateStats();
                }
            }
        } else {
            gameOver();
        }
    }

    function AvoidSlime() {
        homeMessage.innerText = "Nice, you immune the Slime's Attack!!!";
        const health = health;
        updateStats();
    }

    function slimeDefeated() {
        homeMessage.innerText = "You defeated the Slime!. Congratulations!!!\nFinish the slime with one attack...";
        // Additional logic or actions after defeating the dragon
        updateStats();
    }

    function fightMonkey() {
        button1.innerText = "Attack";
        button2.innerText = "slide";
        button3.innerText = "run";
        button1.onclick = AttackMonkey;
        button2.onclick = AvoidMonkey;
        button3.onclick = goTown;
        homeMessage.innerText = "You are about to fight the Monster. It is more powerful than the other one. \nGOODLUCK!!!";
    }  

    function AttackMonkey() {
        const MONKEYATTACK = MonkeyAttack;

        if (health > 0) {
            MonkeyHealth -= attack;

            if (MonkeyHealth <= 0) {
                monkeyDefeated();
                gold += 30;
                MonkeyHealth = 75;
            } else {
                health -= MONKEYATTACK;

                if (health <= 0) {
                    gameOver();
                } else {
                    
                    updateStats();
                }
            }
        } else {
            gameOver();
        }
    }

    function AvoidMonkey() {
        homeMessage.innerText = "Nice, you immune the Monkey's Attack!!!";
        const health = health;
        updateStats();
    }

    function monkeyDefeated() {
        homeMessage.innerText = "You defeated the Monkey!. Congratulations!!!\nFinish the slime with one attack...";
        // Additional logic or actions after defeating the dragon
        updateStats();
    }

    function updateStats() {
        // Update the displayed stats (XP, Health, Gold)
        xpText.innerText = xp;
        healthText.innerText = health;
        goldText.innerText = gold;
        // Optionally, you can also update other parts of the UI as needed  
    }

    // initialize button
    button01.onclick = goTown;
    button02.onclick = goHome;

    // Second buttons
    button1.onclick = goStore;
    button2.onclick = goCave;
    button3.onclick = fightDragon;

    // SHOP
    buttonBuyHealth.onclick = buyHealth;
    buttonBuyXP.onclick = buyXP;

    //Fight with the dragon
    buttonDragonAttack.onclick = Attack;
    buttonAvoid.onclick = Avoid;

    //Fight with the Slime
    buttonSlimeAttack.onclick = AttackSlime;
    buttonAvoidSlime.onclick = AvoidSlime;
    //Fight with the Monkey
    buttonMonkeyAttack.onclick = AttackMonkey;
    buttonAvoidMonkey.onclick = AvoidMonkey;
} startGame();
