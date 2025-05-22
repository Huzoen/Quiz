import React from 'react';

function QuizResult({ score, totalQuestions, onBackToList }) {
  const percentual = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;
  let mensagemFeedback = "";

  if (totalQuestions === 0) {
    mensagemFeedback = "Nenhuma pergunta foi respondida.";
  } else if (percentual >= 70) {
    mensagemFeedback = "Parabéns, ótimo desempenho!";
  } else if (percentual >= 50) {
    mensagemFeedback = "Bom trabalho, continue estudando!";
  } else {
    mensagemFeedback = "Você pode melhorar, revise o conteúdo!";
  }

  return (
    <div id="resultado-final-container" style={{textAlign: 'center'}}> {/* ID mantido e centralizado */}
      <h2>Resultado Final</h2>
      <p id="pontuacao-final" style={{fontSize: '1.2em', margin: '20px 0'}}>
        Você acertou {score} de {totalQuestions} perguntas ({percentual}%).
      </p>
      <p style={{fontStyle: 'italic', marginBottom: '30px'}}>{mensagemFeedback}</p>
      <button onClick={onBackToList} style={{backgroundColor: '#007bff'}}>
        Voltar para a Lista de Quizzes
      </button>
    </div>
  );
}

export default QuizResult;