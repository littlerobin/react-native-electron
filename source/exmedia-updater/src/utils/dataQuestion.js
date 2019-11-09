function getRandomNumber(min, max) {
   // The maximum is inclusive and the minimum is inclusive

  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffle(array) {
  let i = array.length;
  let j = 0;
  let temp;

  while (i--) {
    j = Math.floor(Math.random() * (i+1));

    // swap randomly chosen element with current element
    temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }

  return array;
}

export const createDataTryout = (to, totalQuestion) => {
  const data = {};

  Array(totalQuestion).fill().forEach((_, index) => {
    data[index + 1] = { to, page: index + 1 };
  });

  return data;
};

export const createRandomTryout = (totalTryout, totalQuestion) => {
  const data = {};
  const listQuestionNumber = shuffle(
    Array(totalQuestion).fill().map((_, index) => index + 1)
  );

  Array(totalQuestion).fill().forEach((_, index) => {
    data[index + 1] = { to: getRandomNumber(1, totalTryout), page: listQuestionNumber[index] };
  });

  return data;
};
