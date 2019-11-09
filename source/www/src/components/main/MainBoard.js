// @flow

import React, { Component } from 'react';
import { View } from 'react-native';
import { Mutation } from 'react-apollo';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import get from 'lodash/get';
import HeaderBoard from './HeaderBoard';
import Board from './Board';
import FooterBoard from './FooterBoard';
import PageNumberList from './PageNumberList';
import { Loading } from '../common';
import { withModal, ModalResult } from '../modal';
import mainAction from '../../actions/main';
import type { QuestionV2, Answer, ParamAnswer } from '../types.shared';
import { setPageList, setAnswerFromServer } from '../../utils/pageNumber';
import { convertArrToObj } from '../../utils/convertArray';
import { MUTATION_SAVE_ANSWER } from '../gql.shared';

type Props = {
  archiveId: string,
  logo: string,
  requestGenerateRandQuestion: () => Promise<any>,
  loadingGenerate: boolean,
  startTime?: boolean,
  mainActionCreator?: Object,
  renderModal?: (Props: *) => void,
  evaluation: 'Tugas' | 'Ujian' | 'Kisi - Kisi',
  currentUser: Object,
};

type State = {
  totalQuestion: number,
  questions: {
    [key: string]: QuestionV2,
  },
  answers: {
    [key: string | number]: ParamAnswer,
  },
  loadingCollectData: boolean,
  activeNo: number,
  showModalResult: boolean,
};

const mapStateToProps = state => ({
  startTime: state.main.startTime,
});

const mapDispatchToProps = dispatch => ({
  mainActionCreator: bindActionCreators(mainAction, dispatch),
});

@withModal(ModalResult)
@connect(mapStateToProps, mapDispatchToProps)
class MainBoard extends Component<Props, State> {
  state = {
    activeNo: 1,
    totalQuestion: 0,
    questions: {},
    answers: {},
    loadingCollectData: false,
    showModalResult: false,
  };

  componentDidMount() {
    this.setState({ loadingCollectData: true }, () => {
      this.props
        .requestGenerateRandQuestion()
        .then(({ data }) => {
          const questions = get(data, 'generateRandomQuestion', []);
          const totalQuestion = questions.length;
          const answers = setAnswerFromServer(questions);

          this.setState({
            answers,
            totalQuestion,
            questions: convertArrToObj(questions, 'orderNo'),
            loadingCollectData: false,
          });
        });
    });
  }

  onNextNumber = () => {
    const activeNo = this.state.activeNo + 1;

    if (activeNo <= this.state.totalQuestion) {
      this.setState({ activeNo });
    }
  };

  onPrevNumber = () => {
    const activeNo = this.state.activeNo - 1;

    if (activeNo > 0) {
      this.setState({ activeNo });
    }
  };

  onMoveNumber = (number: number) => {
    if (number > 0 && number <= this.state.totalQuestion) {
      this.setState({ activeNo: number });
    }
  };

  onSetAnswer = (option: Answer) => {
    const { answers, activeNo } = this.state;
    const currentAns = answers[activeNo] || {};
    currentAns.answer = option;

    this.setState({
      answers: {
        ...answers,
        [activeNo]: currentAns,
      },
    });
  };

  onResetAnswer = () => {
    this.setState({ answers: {} });
  };

  onSetDoubtAnswer = (mutate: any) => {
    const { answers, questions, activeNo } = this.state;
    const question = get(questions, `${activeNo}`, {});
    const packageRandomId = get(question, 'id');
    const orderNo = get(question, 'orderNo', '0');
    const questionId = get(question, 'question.id', '');
    const currentAns = answers[activeNo] || {};
    currentAns.isDoubt = !currentAns.isDoubt;

    const variables = {
      userAnswer: {
        packageRandomId,
        archiveId: this.props.archiveId,
        question: { id: questionId },
        orderNo,
        isDoubt: currentAns.isDoubt,
      },
    };

    mutate({ variables }).then(() => {
      this.setState({
        answers: {
          ...answers,
          [activeNo]: currentAns,
        },
      });
    });
  };

  onCloseModal = () => {
    this.setState({ showModalResult: false }, () => {
      this.onResetAnswer();
      this.props.mainActionCreator &&
        this.props.mainActionCreator.toogleStartTimeAction(true);
    });
  };

  getScore = () => {
    this.setState({ showModalResult: true });
  };

  render() {
    const { archiveId, evaluation, loadingGenerate, currentUser } = this.props;
    const {
      questions,
      totalQuestion,
      answers,
      activeNo,
      loadingCollectData,
      showModalResult,
    } = this.state;
    const loading = loadingGenerate && loadingCollectData;
    const dataPageList = setPageList(totalQuestion, answers);

    if (loading) {
      return <Loading type="equivalen" color="green" transparent />;
    }

    return (
      <React.Fragment>
        <HeaderBoard
          username={currentUser.fullName}
          logo={this.props.logo}
          onTimeoutTimer={this.getScore}
        />
        <Board
          questions={questions}
          activeNo={activeNo}
          archiveId={archiveId}
          answers={answers}
          onSetAnswer={this.onSetAnswer}
        />
        <PageNumberList
          data={dataPageList}
          activeNo={activeNo}
          onMoveNumber={this.onMoveNumber}
        />
        <Mutation mutation={MUTATION_SAVE_ANSWER}>
          {(mutate, { loading: loadingSave }) => (
            <React.Fragment>
              {loadingSave && <Loading type="equivalen" color="green" transparent />}
              <FooterBoard
                onNextNumber={this.onNextNumber}
                onPrevNumber={this.onPrevNumber}
                onSetDoubtAnswer={() => this.onSetDoubtAnswer(mutate)}
              />
            </React.Fragment>
          )}
        </Mutation>
        {
          this.props.renderModal ?
            this.props.renderModal({
              isOpen: showModalResult || this.props.startTime === false,
              close: this.onCloseModal,
              archiveId,
              evaluation,
            }) : <View />
        }
      </React.Fragment>
    );
  }
}

export default MainBoard;
