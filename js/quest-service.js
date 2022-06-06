'use strict'

let gQuestsTree
let gCurrQuest
let gPrevQuest = null

function createQuestsTree() {
  gQuestsTree = loadFromStorage('questsTree')

  if (!gQuestsTree) {
    gQuestsTree = createQuest('Male?')
    gQuestsTree.yes = createQuest('Gandhi')
    gQuestsTree.no = createQuest('Rita')
  }

  gCurrQuest = gQuestsTree
  gPrevQuest = null

  _saveQuestToStorage()
}

function createQuest(txt) {
  return {
    txt: txt,
    yes: null,
    no: null,
  }
}

function isChildless(node) {
  console.log(node)
  return node.yes === null && node.no === null
}

function moveToNextQuest(res) {
  //update the gPrevQuest, gCurrQuest global lets
  gPrevQuest = gCurrQuest
  gCurrQuest = gCurrQuest[res]
}

function addGuess(newQuestTxt, newGuessTxt, lastRes) {
  // Create and Connect the 2 Quests to the quetsions tree
  const newQuest = createQuest(newQuestTxt)

  newQuest.yes = createQuest(newGuessTxt)
  newQuest.no = gCurrQuest

  gPrevQuest[lastRes] = newQuest

  _saveQuestToStorage()
}

function getCurrQuest() {
  return gCurrQuest
}

function restartGame() {
  gCurrQuest = gQuestsTree
}

function _saveQuestToStorage() {
  saveToStorage('questsTree', gQuestsTree)
}
