import React, { useEffect, useState } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {

  const [questions, setQuestions] = useState([]) 

  useEffect(() => {
    fetch(`http://localhost:4000/questions`)
    .then(response => response.json())
    .then((questions) => setQuestions(questions))
  }, []);

  //onDeleteClick function
  function handleDeleteClick(id) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      // console.log("deleted:", id)
      .then(() => {
        const updatedQuestions = questions.filter((question) => question.id !== id);
        setQuestions(updatedQuestions);
      });
  }

  const questionList = questions.map((question) => (
    <QuestionItem
      key={question.id}
      question={question}
      onDeleteClick={handleDeleteClick}
    />));


  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questionList}</ul>
    </section>
  );
}

export default QuestionList;
