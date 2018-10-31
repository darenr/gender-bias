function tokenize(input) {
  return $.map(input.replace('/ {2,}/', ' ')
    .toLowerCase()
    .split(' '), $.trim);
}

function getMatches(string, regex, index) {
  index || (index = 1);
  var matches = [];
  var match;
  while (match = regex.exec(string)) {
    matches.push(match[index]);
  }
  return matches;
}

function bias(phrase) {

  var tokens = tokenize(phrase),
    coding = 0,
    feminine_words = [],
    masculine_words = [],
    feminine_word_count = 0,
    masculine_word_count = 0;

  var doc = tokens.join(" ");

  feminine_words = getMatches(doc, regex_feminine_coded_words, 1);
  masculine_words = getMatches(doc, regex_masculine_coded_words, 1);

  feminine_word_count = feminine_words.length;
  masculine_word_count = masculine_words.length;

  console.log("feminine_words: " + feminine_words);
  console.log("masculine_words: " + masculine_words);

  var coding_score = feminine_word_count - masculine_word_count;

  if (coding_score === 0) {
    if (feminine_word_count) {
      coding = "neutral";
    } else {
      coding = "empty";
    }
  } else if (coding_score > 3) {
    coding = "strongly feminine-coded";
  } else if (coding_score > 0) {
    coding = "feminine-coded";
  } else if (coding_score < -3) {
    coding = "strongly masculine-coded";
  } else {
    coding = "masculine-coded";
  }


  return {
    verdict: coding,
    coding_score: coding_score,
    feminine_words: feminine_words,
    masculine_words: masculine_words
  };

}