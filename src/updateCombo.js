const P1Answer = JSON.stringify([6, 2, 5, 1])
const P2Answer = JSON.stringify([5, 2, 1, 6])
const P3Answer = JSON.stringify([5, 1, 5, 6])

const updateCombo = (
  key,
  currentCombo,
  part,
  changeCombo,
  toggleWrongAnswer,
  changePart,
  updateCongrats,
  toggleTimer,
  toggleEndGame
) => {
  if (currentCombo.length === 4) {
    return changeCombo([key])
  }
  const index = currentCombo.indexOf(null)
  let newCombo = currentCombo
  if (index > -1) {
    newCombo[index] = key
  } else {
    newCombo = [...currentCombo, key]
  }
  if (newCombo.length < 4) {
    toggleWrongAnswer(false)
    return changeCombo(newCombo)
  }
  if (newCombo.length === 4) {
    const newComboString = JSON.stringify(newCombo)
    changeCombo(newCombo)
    if (part === 1) {
      if (newComboString === P1Answer) {
        changePart(2)
        changeCombo([])
        updateCongrats('Correct, now open part 2')
        return setTimeout(() => updateCongrats(null), 3000)
      }
    }
    if (part === 2) {
      if (newComboString === P2Answer) {
        changePart(3)
        changeCombo([])
        updateCongrats('Correct, now open part 3')
        return setTimeout(() => updateCongrats(null), 3000)
      }
    }
    if (part === 3) {
      if (newComboString === P3Answer) {
        changePart(4)
        toggleTimer(false)
        updateCongrats('Well Done you have escaped!')
        return toggleEndGame(true)
      }
    }
  } else {
    console.log(newCombo)
  }
  return toggleWrongAnswer(true)
}

export default updateCombo
