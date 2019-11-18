// // import React from "react";
// // import { async } from "q";
// // import MainQuize from "./MainQuiz.js";
// // class QuizData extends React.Component {
// //   constructor(props) {
// //     super(props);
// //     this.state = {
// //       quizData: []
// //     };
// //   }
// //   async componentDidMount() {
// //     this.getQuestion();
// //   }
// //   getQuestion = async () => {
// //     const res = await fetch("http://localhost:8001/api/questions");
// //     const question = await res.json();
// //     this.setState({
// //       quizData: question.data
// //     });
// //     console.log(this.state.quizData, "quizdata");
// //   };

// //   render() {
// //     return <div></div>;
// //   }
// // }

// // export default QuizData;

// export const quizData = [
//   {
//     id: 1,
//     question: `What is tetwthe first element on the periodic table?`,
//     options: [`Hydrogen`, ` Carbone`, ` calcume`],
//     answer: `Hydrogen`
//   },
//   {
//     id: 1,
//     question: `What is the first element on the periodic table?`,
//     options: [`Hydrogen`, ` Carbone`, ` calcume`],
//     answer: `Hydrogen`
//   },

//   {
//     id: 3,
//     question: `'What is the name given to substances that are initially involved in a chemical reaction?`,
//     options: [`Potassium`, `carbone`, `Reactants`],
//     answer: `Reactants`
//   },
//   {
//     id: 4,
//     question: `What is the name given to substances that are initially involved in a chemical reaction?`,
//     options: [`Potassium`, `carbone`, `Reactants`],
//     answer: `Potassium`
//   }
// ];
