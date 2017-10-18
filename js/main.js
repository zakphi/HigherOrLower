$(function(){
  let Card = function(suit, faceVal, numVal){
    this.suit = suit
    this.faceVal = faceVal
    this.numVal = numVal
  }

  let deck = []

  let score = 0
  let highScore = localStorage.getItem('high-score')

  let card1NumVal
  let card2NumVal

  function createGame(){
    $('<section>', {
      'id': 'container'
    }).appendTo('body')

    $('<header>').appendTo('#container')
    
    $('<h1>', {
      'text': 'Higher or Lower'
    }).appendTo('header')

    createStartScreen()

    $('<input>', {
      'type': 'text',
      'autofocus': true,
      'before': 'C:\\>'
    }).appendTo('#container')

    $('input').keyup(function(e){
      if($('#container #start-screen').length === 1){
        if(e.keyCode === 13){
          if($('input').val() === 'start'){
            if($('#container #game-screen').length === 0){
              createGameScreen()
            }
          }
          if($('input').val() === 'help'){
            if($('#container #help-screen').length === 0){
              createHelpScreen()
            }
          }
          $('input').val('')
        }
      }
    })

    $('input').before('C:\\>')
  }

  function createStartScreen(){
    $('<article>', {
      'id': 'start-screen'
    }).appendTo('#container')

    $('<p>', {
      'text': 'Type \'start\' to play the game'
    }).appendTo('#start-screen')

    $('<p>', {
      'text': 'Type \'help\' to display instructions'
    }).appendTo('#start-screen')
  }

  function createGameScreen(){
    $('#start-screen').remove()
    $('#help-screen').remove()

    let $gameScreen = $('<article>')
    $gameScreen.attr('id','game-screen')

    let $scoreKeeper = $('<h2>')
    $scoreKeeper.text(`Score: ${score}`)
    $scoreKeeper.addClass('score')

    let $highScoreKeeper = $('<h2>')
    $highScoreKeeper.text(`High Score: ${highScore}`)
    $highScoreKeeper.addClass('high-score')

    let $card1Cont = $('<div>')
    $card1Cont.attr('id','card1')

    let $card2Cont = $('<div>')
    $card2Cont.attr('id','card2')

    let $faceValCont = $('<div>')
    $faceValCont.addClass('faceValCont')

    let $suitCont = $('<div>')
    $suitCont.addClass('suitCont')

    $gameScreen.appendTo('#container')
    $('header').after($gameScreen)
    $scoreKeeper.appendTo($gameScreen)
    if(highScore !== null && highScore > 0){
      $highScoreKeeper.appendTo($gameScreen)
    }
    $card1Cont.appendTo($gameScreen)
    $card2Cont.appendTo($gameScreen)
    $faceValCont.appendTo($card1Cont)
    $suitCont.appendTo($card1Cont)
    $faceValCont.clone().appendTo($card2Cont)
    $suitCont.clone().appendTo($card2Cont)

    $('input').keyup(function(e){
      if($('#container #game-screen').length === 1){
        if(e.keyCode === 13){
          if($('input').val() === 'higher'){
            higher()
          }
          if($('input').val() === 'lower'){
            lower()
          }
          $('input').val('')
        }
      }
    })

    createDeck()
    shuffleDeck()
    showCard1()
    showCard2()
  }

  function createHelpScreen(){
    let $helpScreen = $('<article>')
    $helpScreen.attr('id','help-screen')

    let $helpTitle = $('<h2>')
    $helpTitle.text('How To Play:')

    let $helpText = $('<p>')
    $helpText.text('The player is displayed a card. The player has to guess whether the next card is higher or lower than the displayed card. To guess, type \'higher\' for higher or \'lower\' for lower.')

    $helpScreen.appendTo('#container')
    $('#start-screen').after($helpScreen)
    $helpTitle.appendTo($helpScreen)
    $helpText.appendTo($helpScreen)
  }
  
  function createDeck(){
    /*
      u2660 = spade
      u2665 = heart
      u2666 = diamond
      u2663 = club
    */
    let suits = ['\u2660','\u2665','\u2666','\u2663']
    let faceValues = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']
    suits.forEach(function(suit){
      faceValues.forEach(function(faceVal, numVal){
        let card = new Card(suit, faceVal, numVal + 1)
        deck.push(card)
      })
    })
  }

  function shuffleDeck(){
    for(let i = 0; i < 500; i++){
      let loc1 = Math.floor(Math.random() * deck.length)
      let loc2 = Math.floor(Math.random() * deck.length)
      let tmpLoc = deck[loc1]

      deck[loc1] = deck[loc2]
      deck[loc2] = tmpLoc
    }
  }

  function showCard1(){
    let card1 = deck.shift()

    let card1Face = card1.faceVal
    let card1Suit = card1.suit
    card1NumVal = card1.numVal

    $('#card1 .faceValCont').text(card1Face)
    $('#card1 .suitCont').text(card1Suit)
  }

  function showCard2(){    
    let card2 = deck.shift()

    let card2Face = card2.faceVal
    let card2Suit = card2.suit
    card2NumVal = card2.numVal

    $('#card2 .faceValCont').text(card2Face)
    $('#card2 .suitCont').text(card2Suit)
  }

  function higher(){
    if(card2NumVal > card1NumVal){
      updateScore()
      updateCards()
    } else if(card2NumVal === card1NumVal){
      updateHighScore()
      createEndGameScreen()
    } else {
      updateHighScore()
      createEndGameScreen()
    }
  }

  function lower(){
    if(card2NumVal < card1NumVal){
      updateScore()
      updateCards()
    } else if(card2NumVal === card1NumVal){
      updateHighScore()
      createEndGameScreen()
    } else {
      updateHighScore()
      createEndGameScreen()
    }
  }

  function updateScore(){
    score++
    $('.score').text(`Score: ${score}`)
  }

  function updateHighScore(){
    if(score > highScore){
      localStorage.setItem('high-score', score)
    }
  }

  function updateCards(){
    $('#card1').html($('#card2').html())
    card1NumVal = card2NumVal

    showCard2()
  }

  function createEndGameScreen(){
    $('#game-screen').remove()

    let $endGameScreen = $('<article>')
    $endGameScreen.attr('id','end-game-screen')

    let $scoreKeeper = $('<h2>')
    $scoreKeeper.text(`Score: ${score}`)
    $scoreKeeper.addClass('score')

    let $highScoreKeeper = $('<h2>')
    $highScoreKeeper.text(`High Score: ${highScore}`)
    $highScoreKeeper.addClass('high-score')

    let $result = $('<h2>')
    $result.text('you guessed wrong!')

    let $endGameInstructions = $('<p>')
    $endGameInstructions.text('type \'replay\' to replay again.')

    $endGameScreen.appendTo('#container')
    $('header').after($endGameScreen)
    $scoreKeeper.appendTo($endGameScreen)
    if(score > 0 && score > highScore){
      $highScoreKeeper.text(`High Score: ${score}`)
    } else if(score === 0 && score < highScore) {
      $highScoreKeeper.text(`High Score: ${highScore}`)
    }
    $highScoreKeeper.appendTo($endGameScreen)
    $result.appendTo($endGameScreen)
    $endGameInstructions.appendTo($endGameScreen)

    $('input').keyup(function(e){
      if(e.keyCode === 13){
        if($('input').val() === 'replay'){
          replayGame()
          $('input').val('')
        }
      }
    })
  }

  function replayGame(){
    $('#end-game-screen').remove()
    score = 0
    highScore = localStorage.getItem('high-score')
    createGameScreen()
  }

  createGame()
})