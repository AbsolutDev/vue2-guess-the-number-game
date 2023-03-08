const app = new Vue({
  el: '#app',
  data: {
    gameStage: 0,
    totalCards: 5,
    currentCard: 0,
    cards: [],
    foundNumber: 0,
  },
  computed: {
    maxNumber: function() {
      return 2**this.totalCards;
    },
    gridSize: function() {
      let i=0;
      while (i**2 < this.maxNumber) {
        i++
      };
      let j = i;
      while (j**2 > this.maxNumber + i) {
        j--;
      }
      return [i,j];
    },
    gridTemplateStyle: function() {
            return {
        'grid-template': 'repeat(' + this.gridSize[0] + ', 1fr)/repeat(' + this.gridSize[1] + ', 1fr)'
      }
    }
  },
  methods: {
    initiateGame: function() {
      this.currentCard = 0;
      this.foundNumber = 0;
      this.cards = [];
      this.generateCards();
      this.gameStage = 1;
    },
    generateCards: function() {
      for (let card=0;card<this.totalCards;card++) {
        let cardNumbers = [];
        let number = 2**card;
        while(number<this.maxNumber) {
          for (let x = 0;x < 2**card; x++ )
          {
            cardNumbers.push(number);
            number++;
          }
          number+=2**card;
        }
        this.cards.push(cardNumbers);
      }
    },
    numberSeen: function() {
      this.foundNumber += this.cards[this.currentCard][0];
      if (this.currentCard + 1 < this.totalCards) {
        this.currentCard++;
      } else {
        this.gameStage++;
      }
    },
    checkNumber: function(number) {
      return number === this.foundNumber;
    }
  }
})

/*
0 [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31],   0 1 1
1 [2,3,6,7,10,11,14,15,18,19,22,23,26,27,30,31],  1 2 3 2^1+1
2 [4,5,6,7,12,13,14,15,20,21,22,23,28,29,30,31],  2 4 5 2^2+1
3 [8,9,10,11,12,13,14,15,24,25,26,27,28,29,30,31],3 8 9 2^3+1
4 [16,17,18,19,20,21,22,23,24,24,26,27,28,29,30,31]
min. 3 cards = 1-7
5 cards
1 > 2 > 4 > 8 > 16 > 32... 2^0 > 2^1 > 2^2 > 2^3 > 2^4 > 2^5
C = cards
c = current cart
c = 0 to C
0: Card 0: 2^c +2> 3 +2> 5 +2>7             start> ((2^c, +1 de c ori) +(c+2)) de c+3 ori
1: Card 1: 2^c +1> 3 +3> 6 +1> 7 +3> ...                        +1> 1 time   2^1-1
2: Card 2: 2^c +1> 5 +1> 6 +1> 7                                +1> 3 times  2^2-1
3: Card 3: 2^c +1> 9 +1> 10 +1> 11 +1>12 +1> 13 +1> 14 +1> 15   +1> 7 times  2^3-1
4: Card 4:                                                      +1> 15 times 2^4-1
Max number: 2^c-1


3 cards 1-7   1,2,4   3x3
4 cards 1-15  8       4x4
5 cards 1-31  16      6x6
6 cards 1-63  32      8x8
7 cards 1-127 64      12x12
*/