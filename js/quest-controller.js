'use strict'

let gLastRes = null

$(init)

function init() {
  createQuestsTree()
  addEventListeners()
}

function addEventListeners() {
  $('.btn-start').click(onStartGuessing)
  $('.btn-yes').click({ ans: 'yes' }, onUserResponse)
  $('.btn-no').click({ ans: 'no' }, onUserResponse)
  $('.btn-add-guess').click(onAddGuess)
  $('.overlay').click(onCloseModal)
  $('.modal .btn').click(onCloseModal)
}

function onStartGuessing() {
  // hide the game-start section
  $('.game-start').hide()

  renderQuest()
  // show the quest section
  $('.quest').show()
}

function renderQuest() {
  // Render curr quest text
  $('.quest h2').text(getCurrQuest().txt)
}

function onUserResponse(ev) {
  let res = ev.data.ans

  // If this node has no children
  if (isChildless(getCurrQuest())) {
    if (res === 'yes') {
      // Update modal title
      $('.modal-head').text('Yes, i knew it!')

      // restart game
      onRestartGame()
    } else {
      $('.modal-head').text('I dont know...teach me!')

      // hide and show new-quest section
      $('.quest').hide()
      $('.new-quest').show()
    }

    $('.modal').show('slow')
    $('.overlay').fadeIn('slow')
  } else {
    // update the lastRes global let
    gLastRes = res
    moveToNextQuest(res)
    renderQuest()
  }
}

function onAddGuess(ev) {
  ev.preventDefault()
  // Get the inputs' values
  let newGuess = $('#newGuess').val()
  let newQuest = $('#newQuest').val()

  // add guess to the tree
  addGuess(newQuest, newGuess, gLastRes)

  onRestartGame()
}

function onRestartGame() {
  $('.new-quest').hide()
  $('.quest').hide()
  $('.game-start').show()
  gLastRes = null
  restartGame()
}

function onCloseModal() {
  $('.modal').fadeOut()
  $('.overlay').fadeOut()
}
