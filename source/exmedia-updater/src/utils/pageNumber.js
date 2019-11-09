import get from 'lodash/get';

export const setPageList = (totalPages, answers) => {
  const pageList = [];

  for (let i = 1; i <= totalPages; i++) {
    const mappingAnswer = {
      no: ('0' + i).slice(-2),
      answer: get(answers, `${i}.answer`, ''),
      isDoubt: get(answers, `${i}.isDoubt`, false),
    };
    pageList.push(mappingAnswer);
  }

  return pageList;
};

export const setPageListWithCorrection = (totalPages, answers, solutions) => {
  const pageList = [];

  for (let i = 1; i <= totalPages; i++) {
    const mappingAnswer = {
      no: ('0' + i).slice(-2),
      answer: get(answers, `${i}.answer`, ''),
      isDoubt: get(answers, `${i}.isDoubt`, false),
      correct: get(answers, `${i}.answer`, '').toLowerCase() === solutions[i - 1],
    };
    pageList.push(mappingAnswer);
  }

  return pageList;
};
