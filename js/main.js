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

  let prevInputs = []

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
    }).appendTo('#container')

    $('input').keyup(function(e){
      if($('#container #start-screen').length === 1){
        if(e.keyCode === 13){
          if($('input').val().toLowerCase() === 'start'){
            if($('#container #game-screen').length === 0){
              createGameScreen()
            }
          }
          if($('input').val().toLowerCase() === 'help'){
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

    $('<article>', {
      'id': 'game-screen'
    }).appendTo('#container')

    $('<h2>', {
      'class': 'score',
      'text': `Score: ${score}`
    }).appendTo('#game-screen')

    $('<div>', {
      'id': 'card1'
    }).appendTo('#game-screen')

    $('<div>', {
      'id': 'card2'
    }).appendTo('#game-screen')

    $('#game-screen').insertAfter($('header'))

    if(highScore !== null && highScore > 0){
      $('<h2>', {
        'class': 'high-score',
        'text': `High Score: ${highScore}`
      }).appendTo('#game-screen')

      $('.high-score').insertAfter($('.score'))
    }

    $('<div>', {
      'class': 'faceValCont'
    }).appendTo('#card1')

    $('<div>', {
      'class': 'suitCont'
    }).appendTo('#card1')

    $('.faceValCont').clone().appendTo('#card2')
    $('.suitCont').clone().appendTo('#card2')

    let inputHistory = 0
    $('input').keyup(function(e){
      if($('#container #game-screen').length === 1){
        if(e.keyCode === 13){
          if($('input').val().toLowerCase() === 'higher'){
            prevInputs.push('higher')
            compare('higher')
          }
          if($('input').val().toLowerCase() === 'lower'){
            prevInputs.push('lower')
            compare('lower')
          }
          $('input').val('')
          inputHistory = prevInputs.length
        }
      }
    })

    $('input').keydown(function(e){
      if($('#container #game-screen').length === 1){
        if(e.keyCode === 38 && prevInputs.length > 0 && inputHistory > 0){
          inputHistory--
          $('input').val(prevInputs[inputHistory])
        }
        if(e.keyCode === 40 && prevInputs.length > 0 && inputHistory < prevInputs.length){
          inputHistory++
          $('input').val(prevInputs[inputHistory])
        }
      }
    })

    createDeck()
    shuffleDeck()
    showCard1()
    showCard2()
  }

  function createHelpScreen(){
    $('<article>', {
      'id': 'help-screen'
    }).appendTo('#container')

    $('<h2>', {
      'text': 'How To Play:'
    }).appendTo('#help-screen')

    $('<p>', {
      'text': 'The player is displayed a card. The player has to guess whether the next card is higher or lower than the displayed card. To guess, type \'higher\' for higher or \'lower\' for lower.'
    }).appendTo('#help-screen')

    $($('#help-screen')).insertAfter('#start-screen')
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

  function compare(guess){
    if((guess = 'higher' && card2NumVal > card1NumVal) || (guess = 'lower' && card2NumVal < card1NumVal)){
      updateScore()
      updateCards()
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
    if(score > highScore || highScore == null){
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

    $('<article>', {
      'id': 'end-game-screen'
    }).appendTo('#container')

    $('<h2>', {
      'class': 'score',
      'text': `Score: ${score}`
    }).appendTo('#end-game-screen')

    $('<h2>', {
      'class': 'high-score',
    }).appendTo('#end-game-screen')

    $('<h2>', {
      'text': 'you guessed wrong!'
    }).appendTo('#end-game-screen')

    $('<p>', {
      'text': 'type \'replay\' to replay again.'
    }).appendTo('#end-game-screen')

    $($('#end-game-screen')).insertAfter('header')

    let scoreText = score > highScore ? `High Score: ${score}` : `High Score: ${highScore}`

    $('.high-score').text(highScore > 0 || highScore != null ? scoreText : '')

    $('input').keyup(function(e){
      if(e.keyCode === 13){
        if($('input').val().toLowerCase() === 'replay'){
          replayGame()
          $('input').val('')
        }
      }
    })
  }

  function replayGame(){
    $('#end-game-screen').remove()
    score = 0
    prevInputs = []
    highScore = localStorage.getItem('high-score')
    createGameScreen()
  }

  createGame()
})