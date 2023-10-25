const wordInput = document.getElementById('word-input');
const submitBtn = document.getElementById('submit-btn');
const word = document.getElementById('word');
const phonetics = document.getElementById('phonetics');
const meanings = document.getElementById('meanings');
const examples = document.getElementById('examples');
const synonyms = document.getElementById('synonyms');
const antonyms = document.getElementById('antonyms');
const examplesList = document.createElement('ol');
const synonymsList = document.createElement('ol');
const antonymsList = document.createElement('ol');
submitBtn.addEventListener('click', () => {
  const wordValue = wordInput.value;
  word.textContent = '';
  phonetics.textContent = '';
  meanings.textContent = '';
  examples.textContent = '';
  synonyms.textContent = '';
  antonyms.textContent = '';
  examplesList.innerHTML = '';
  synonymsList.innerHTML = '';
  antonymsList.innerHTML = '';
  fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${wordValue}`).then(response => response.json()).then(data => {
    const wordText = data[0].word;
    const phoneticsArray = data[0].phonetics;
    let meaningText = '';
    let exampleText = '';
    let synonymText = '';
    let antonymText = '';
    for (let i = 0; i < data[0].meanings.length; i++) {
      const partOfSpeech = data[0].meanings[i].partOfSpeech;
      const definitions = data[0].meanings[i].definitions;
      meaningText += `
              <li>
                <b>${partOfSpeech}</b>:
              </li>
              <ol>`;
      for (let j = 0; j < definitions.length; j++) {
        meaningText += `<li>${definitions[j].definition}</li>`;
        if (definitions[j].example) {
          exampleText += `<li>${definitions[j].example}</li>`;
        }
        if (definitions[j].synonyms && definitions[j].synonyms.length > 0) {
          synonymText += `<li>${definitions[j].synonyms.join(', ')}</li>`;
        }
        if (definitions[j].antonyms && definitions[j].antonyms.length > 0) {
          antonymText += `<li>${definitions[j].antonyms.join(', ')}</li>`;
        }
      }
      meaningText += ' </ol>';
    }
    if (wordText) {
      word.textContent = wordText;
    } else {
      word.textContent = 'No word available';
    }
    if (phoneticsArray && phoneticsArray.length > 0) {
      for (let i = 0; i < phoneticsArray.length; i++) {
        const phoneticText = phoneticsArray[i].text;
        const phoneticItem = document.createElement('li');
        phoneticItem.innerHTML = `${phoneticText}`;
        phonetics.appendChild(phoneticItem);
      }
    } else {
      phonetics.textContent = '-No phonetics available-';
    }
    if (meaningText) {
      meanings.innerHTML = meaningText;
    } else {
      meanings.textContent = '-No meaning available-';
    }
    if (exampleText) {
      examples.innerHTML = exampleText;
    } else {
      examples.textContent = '-No example available-';
    }
    if (synonymText) {
      synonyms.innerHTML = synonymText;
    } else {
      synonyms.textContent = '-No synonym available-';
    }
    if (antonymText) {
      antonyms.innerHTML = antonymText;
    } else {
      antonyms.textContent = '-No antonym available-';
    }
  }).catch(error => {
    word.textContent = '-Word not found-';
    phonetics.textContent = '';
    meanings.textContent = '';
    examples.textContent = '';
    synonyms.textContent = '';
    antonyms.textContent = '';
  });
});