$(function(){
  console.log('main.js connected')
  
  let Card = function(suit, faceVal, numVal){
    this.suit = suit
    this.faceVal = faceVal
    this.numVal = numVal
  }

  let $deck = []
  
  function createDeck(){
    /*
      u2660 = spade
      u2665 = heart
      u2666 = diamond
      u2663 = club
    */
    let $suits = ['\u2660','\u2665','\u2666','\u2663']
    let $faceValues = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']
    $suits.forEach(function(suit){
      $faceValues.forEach(function(numVal, i){
        let $card = new Card(suit, numVal, i+1)
        $deck.push($card)
      })
    })
  }

  function shuffleDeck(){
    for( let $i = 0; $i < 500; $i++){
      let $loc1 = Math.floor(Math.random() * $deck.length)
      let $loc2 = Math.floor(Math.random() * $deck.length)
      let $tmpLoc = $deck[$loc1]

      $deck[$loc1] = $deck[$loc2]
      $deck[$loc2] = $tmpLoc
    }
  }

  function showCard(){
    let $card1 = $deck.shift()
    let $card2 = $deck.shift()
  }

  createDeck()
  shuffleDeck()
  showCard()
})