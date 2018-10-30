function tokenize(input) {
  return $.map(input.replace('/ {2,}/', ' ')
    .toLowerCase()
    .split(' '), $.trim);
}

function bias(phrase) {

  var tokens = tokenize(phrase),
    coding_score = 0,
    feminine_words = [],
    masculine_words = [],
    feminine_word_count = 0,
    masculine_word_count = 0;

  // Iterate over tokens
  var len = tokens.length;
  while (len--) {
    var obj = tokens[len];

    if (feminine_coded_words.indexOf(obj) == -1 && masculine_coded_words.indexOf(obj) == -1)
      continue;

    console.log("processing: " + obj + ", f.length: " + feminine_words.length + ", m.length: " + masculine_words.length);

    if (feminine_coded_words.indexOf(obj) > -1) {
      feminine_word_count++;
      feminine_words.push(obj);
    } else if (masculine_coded_words.indexOf(obj) > -1) {
      masculine_word_count++;
      masculine_words.push(obj);
    }

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
}