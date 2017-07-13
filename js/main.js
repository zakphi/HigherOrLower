$(function(){
  console.log('main.js connected')
  
  let Card = function(suit, faceVal, numVal){
    this.suit = suit
    this.faceVal = faceVal
    this.numVal = numVal
  }

  let $deck = []

  let $score = 0;

  function createGame(){
    let $gameCont = $('<section>')
    $gameCont.attr('id','container')

    let $header = $('<header>')
    
    let $title = $('<h1>')
    $title.text('Higher or Lower')

    $header.appendTo('body')
    $title.appendTo($header)
    $gameCont.appendTo('body')
  }

  function createStartScreen(){
    let $startScreen = $('<article>')
    $startScreen.attr('id','start-screen')

    let $startBtn = $('<button>')
    $startBtn.attr('id','start')
    $startBtn.text('start')
    
    let $helpBtn = $('<button>')
    $helpBtn.attr('id','start')
    $helpBtn.text('help')
    
    $startScreen.appendTo('#container')
    $startBtn.appendTo($startScreen)
    $helpBtn.appendTo($startScreen)

    $startBtn.click(createGameScreen)
    $helpBtn.one('click', createHelpScreen)
  }

  function createGameScreen(){
    console.log('game screen created')

    $('#start-screen').remove()
    $('#help-screen').remove()

    let $gameScreen = $('<article>')
    $gameScreen.attr('id','game-screen')

    let $scoreKeeper = $('<h2>')
    $scoreKeeper.text(`Score: ${$score}`)

    let $card1Cont = $('<div>')
    $card1Cont.attr('id','card1')

    let $card2Cont = $('<div>')
    $card2Cont.attr('id','card2')

    let $faceValCont = $('<div>')
    $faceValCont.addClass('faceValCont')

    let $suitCont = $('<div>')
    $suitCont.addClass('suitCont')

    let $higherBtn = $('<button>')
    $higherBtn.attr('id','higherBtn')
    $higherBtn.text('higher')

    let $lowerBtn = $('<button>')
    $lowerBtn.attr('id','higherBtn')
    $lowerBtn.text('lower')

    $gameScreen.appendTo('#container')
    $scoreKeeper.appendTo($gameScreen)
    $card1Cont.appendTo($gameScreen)
    $card2Cont.appendTo($gameScreen)
    $faceValCont.appendTo($card1Cont)
    $suitCont.appendTo($card1Cont)
    $higherBtn.appendTo($gameScreen)
    $lowerBtn.appendTo($gameScreen)

    createDeck()
    shuffleDeck()
    showCard()
  }

  function createHelpScreen(){
    console.log('help screen created')

    let $helpScreen = $('<article>')
    $helpScreen.attr('id','help-screen')

    let $helpTitle = $('<h2>')
    $helpTitle.text('How To Play')

    let $helpText = $('<p>')
    $helpText.text('You are displayed a card. You then guess whether the next card is higher or lower. To guess, click on either the higher or lower button.')

    $helpScreen.appendTo('#container')
    $helpTitle.appendTo($helpScreen)
    $helpText.appendTo($helpScreen)
  }
  
  function createDeck(){
    console.log('deck created')
    /*
      u2660 = spade
      u2665 = heart
      u2666 = diamond
      u2663 = club
    */
    let $suits = ['\u2660','\u2665','\u2666','\u2663']
    let $faceValues = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']
    $suits.forEach(function(suit){
      $faceValues.forEach(function(faceVal, numVal){
        let $card = new Card(suit, faceVal, numVal + 1)
        $deck.push($card)
      })
    })
  }

  function shuffleDeck(){
    console.log('deck shuffled')
    for(let $i = 0; $i < 500; $i++){
      let $loc1 = Math.floor(Math.random() * $deck.length)
      let $loc2 = Math.floor(Math.random() * $deck.length)
      let $tmpLoc = $deck[$loc1]

      $deck[$loc1] = $deck[$loc2]
      $deck[$loc2] = $tmpLoc
    }
  }

  function showCard(){
    console.log('card displayed')
    let $card1 = $deck.shift()
    let $card2 = $deck.shift()

    let $card1Face = $card1.faceVal
    let $card1Suit = $card1.suit
    console.log($card1Face)
    console.log($card1Suit)

    $('#card1 .faceValCont').text($card1Face)
    $('#card1 .suitCont').text($card1Suit)
  }

  createGame()
  createStartScreen()
})