import get from 'lodash/get';

export const getSolutionAnswer = (collectionAnswers, dataQuestion) =>
  Object.keys(dataQuestion).map((field) => {
    const indexTO = dataQuestion[field].to - 1;
    const indexPage = dataQuestion[field].page - 1;

    return collectionAnswers[indexTO][indexPage];
  });

export const validationAns = (solution, answers) => {
  let correct = 0;
  let wrong = 0;
  let empty = 0;
  let doubt = 0;
  solution.forEach((ans, idx) => {
    const currentNo = idx + 1;
    const answer = get(answers, `${currentNo}.answer`);
    const isDoubt = get(answers, `${currentNo}.isDoubt`);

    if (answer) { // ${currentNo} is answered
      if (ans.toLowerCase() === answer.toLowerCase()) { // Correct Answer
        correct += 1;
      } else {
        wrong += 1;
      }
    } else {
      empty += 1;
    }

    if (isDoubt) {
      doubt += 1;
    }
  });

  return { correct, wrong, empty, doubt };
};
