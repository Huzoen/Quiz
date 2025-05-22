import React from 'react';

function QuizList({ quizzes, onStartQuiz, onEditQuiz, onDeleteQuiz }) { // Adicionadas props para editar/deletar
  if (!quizzes || quizzes.length === 0) {
    return <p id="sem-quizzes-aviso" style={{textAlign: 'center', marginTop: '20px'}}>Nenhum quiz salvo ainda. Crie um novo!</p>;
  }

  return (
    <section> {/* Removido ID desnecessário */}
      <h2>Quizzes Salvos</h2>
      <ul id="lista-quizzes-salvos"> {/* ID mantido para possível estilização específica se necessário */}
        {quizzes.map((quiz, index) => (
          <li key={quiz.id || index}>
            <span>{quiz.titulo}</span>
            <div>
              {/* // Botão Editar (descomente e implemente a lógica em App.js se desejar)
              <button 
                onClick={() => onEditQuiz(index)} 
                style={{backgroundColor: '#ffc107', marginRight: '5px'}}
              >
                Editar
              </button> 
              */}
              <button onClick={() => onStartQuiz(index)}>Iniciar Quiz</button>
              {/* // Botão Deletar (descomente e implemente a lógica em App.js se desejar)
              <button 
                onClick={() => onDeleteQuiz(quiz.id || index)} 
                style={{backgroundColor: '#dc3545', marginLeft: '5px'}}
              >
                Deletar
              </button> 
              */}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default QuizList;