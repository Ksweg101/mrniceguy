/*
 * This file contains the Map of word --> emoji substitutions.
 */

 var testInt = 1;
 /*
document.getElementById("test").innerHTML = testInt + 1;

function myFunc(){
	document.getElementById("test").innerHTML = testInt + 1;
}

function incrementValue()
{
    var value = parseInt(document.getElementById('number').value, 10);
    value = isNaN(value) ? 0 : value;
    value++;
    document.getElementById('number').value = value;
}
*/

function saveOptions(e) {
  browser.storage.sync.set({
    colour: document.querySelector("#colour").value
  });
  
  
  browser.storage.local
  
  e.preventDefault();
}
function restoreOptions() {
  var storageItem = browser.storage.managed.get('colour');
  storageItem.then((res) => {
    document.querySelector("#managed-colour").innerText = res.colour;
  });

  var gettingItem = browser.storage.sync.get('colour');
  gettingItem.then((res) => {
    document.querySelector("#colour").value = res.colour || 'Firefox red';
  });
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);





 
/* exported sortedEmojiMap */

let dictionary = new Map();
dictionary.set('apple', '🍎');
dictionary.set('banana', '🍌');
dictionary.set('bang', '💥');
dictionary.set('baseball', '⚾');
dictionary.set('basketball', '🏀');
dictionary.set('beer', '🍺');
dictionary.set('bicycle', '🚴');
dictionary.set('bike', '🚴');
dictionary.set('bomb', '💣');
dictionary.set('boy', '👦');
dictionary.set('bug', '🐛');
dictionary.set('burger', '🍔');
dictionary.set('burn', '🔥');
dictionary.set('cake', '🎂');
dictionary.set('candy', '🍬');
dictionary.set('cat', '🐱');
dictionary.set('celebration', '🎉');
dictionary.set('cheeseburger', '🍔');
dictionary.set('cookie', '🍪');
dictionary.set('cool', '😎');
dictionary.set('cry', '😢');
dictionary.set('dog', '🐶');
dictionary.set('doge', '🐕');
dictionary.set('earth', '🌎');
dictionary.set('explode', '💥');
dictionary.set('fart', '💨');
dictionary.set('fast', '💨');
dictionary.set('female', '👩');
dictionary.set('fire', '🔥');
dictionary.set('fish', '🐟');
dictionary.set('flame', '🔥');
dictionary.set('flower', '🌹');
dictionary.set('food', '🍕');
dictionary.set('football', '🏈');
dictionary.set('girl', '👧');
dictionary.set('golf', '⛳');
dictionary.set('hamburger', '🍔');
dictionary.set('happy', '😀');
dictionary.set('horse', '🐴');
dictionary.set('hot', '🔥');
dictionary.set('kiss', '😘');
dictionary.set('laugh', '😂');
dictionary.set('lit', '🔥');
dictionary.set('lock', '🔒');
dictionary.set('lol', '😂');
dictionary.set('love', '😍');
dictionary.set('male', '👨');
//dictionary.set(' man ', ' 👨 ');
dictionary.set('man', 'DickButt');	//replace
dictionary.set('monkey', '🐵');
dictionary.set('moon', '🌙');
dictionary.set('note', '📝');
dictionary.set('paint', '🎨');
dictionary.set('panda', '🐼');
dictionary.set('party', '🎉');
dictionary.set('pig', '🐷');
dictionary.set('pizza', '🍕');
dictionary.set('planet', '🌎');
dictionary.set('rose', '🌹');
dictionary.set('rofl', '😂');
dictionary.set('sad', '😢');
dictionary.set('sleep', '😴');
dictionary.set('smile', '😀');
dictionary.set('smiley', '😀');
dictionary.set('soccer', '⚽');
dictionary.set('star', '⭐');
dictionary.set('sun', '☀️');
dictionary.set('sunglasses', '😎');
dictionary.set('surprised', '😮');
dictionary.set('tree', '🌲');
dictionary.set('trophy', '🏆');
dictionary.set('win', '🏆');
dictionary.set('wind', '💨');
dictionary.set('wine', '🍷');
dictionary.set('wink', '😉');
dictionary.set('woman', '👩');
dictionary.set('world', '🌎');
dictionary.set('wow', '😮');

/*
 * After all the dictionary entries have been set, sort them by length.
 *
 * Because iteration over Maps happens by insertion order, this avoids
 * scenarios where words that are substrings of other words get substituted
 * first, leading to the longer word's substitution never triggering.
 * 
 * For example, the 'woman' substitution would never get triggered
 * if the 'man' substitution happens first because the input term 'woman'
 * would become 'wo👨', and the search for 'woman' would not find any matches.
 */
let tempArray = Array.from(dictionary);
tempArray.sort((pair1, pair2) => {
  // Each pair is an array with two entries: a word, and its emoji.
  // Ex: ['woman', '👩']
  const firstWord = pair1[0];
  const secondWord = pair2[0];

  if (firstWord.length > secondWord.length) {
    // The first word should come before the second word.
    return -1;
  }
  if (secondWord.length > firstWord.length) {
    // The second word should come before the first word.
    return 1;
  }

  // The words have the same length, it doesn't matter which comes first.
  return 0;
});

// Now that the entries are sorted, put them back into a Map.
let sortedEmojiMap = new Map(tempArray);
