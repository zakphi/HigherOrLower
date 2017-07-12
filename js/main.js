$(function(){
  console.log('main.js connected')
  
  let Card = function(suit, faceVal, numVal){
    this.suit = suit
    this.faceVal = faceVal
    this.numVal = numVal
  }
  
  function createDeck(){
    let $deck = []
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
  createDeck()
})