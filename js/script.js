new Vue({
  el: '#app',
  data: {
    playerHealth: 100,
    monsterHealth:100,
    gameIsRunning: false,
    turns: [],
    color: 'green',
    textColor: 'white',
  },
  watch: {
    playerHealth: function() {
      this.barsColors(this.playerHealth);
    },
    monsterHealth: function() {
      this.barsColors(this.monsterHealth);
    }
  },
  methods: {
    startGame: function() {
      this.gameIsRunning = true;
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.turns = []
    },
    attack: function() {
      let damage = this.calculateDamage(3, 10);
      this.monsterHealth -= damage;
      this.turns.unshift({
        isPlayer: true,
        text: 'Player hits Monster for' + ` - ${damage}`
      });
      if (this.checkWin()){
        return;
      }

      this.monsterAttack();
    },
    specialAttack: function() {
      var damage = this.calculateDamage(10, 20);
      this.monsterHealth -= damage;
      this.turns.unshift({
        isPlayer: true,
        text: 'Player hits Monster hard for' + ` - ${damage}`
      });
      if (this.checkWin()){
        return;
      }

      this.monsterAttack();
    },
    heal: function() {
      if(this.playerHealth <= 90) {
        this.playerHealth += 10;
      } else {
        this.playerHealth = 100;
      }
      this.turns.unshift({
        isPlayer: true,
        text: 'Player hits Heals for 10'
      });
      this.monsterAttack();
    },
    giveUp: function() {
      this.gameIsRunning = false;
      this.turns = []
    },
    monsterAttack: function(){
      let damage = this.calculateDamage(5, 12);
      this.playerHealth -= damage;
      this.checkWin();
      this.turns.unshift({
        isPlayer: false,
        text: 'Monster hits Player for' + ` - ${damage}`
      })
    },
    calculateDamage: function(min, max) {
      return Math.max(Math.floor(Math.random() * max) + 1, min);
    },
    checkWin: function(){
      if (this.monsterHealth <= 0) {
        if (confirm('You won! New Game?')) {
          this.startGame();
        } else {
          this.gameIsRunning = false;
        }
        return true;
      } else if (this.playerHealth <= 0) {
        if (confirm('You lost! New Game?')) {
          this.startGame();
        } else {
          this.gameIsRunning = false;
        }
        return true;
      }
      return false;
    },
    barsColors: function(bar) {
      if(bar < 90 && bar > 60) {
        this.color = 'Yellow';
        this.textColor = 'black';
      } else if(bar < 60 && bar > 30) {
        this.color = 'Orange';
      } else if(bar < 30) {
        this.color = 'Red';
      } else {
        this.color = 'green',
        this.textColor = 'white'
      }
    }
  }
});