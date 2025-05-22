import React, { useState, useEffect } from 'react';

function QuizPlayer({ quiz, onQuizEnd, onBackToList }) {
  const [perguntaAtualIndex, setPerguntaAtualIndex] = useState(0);
  const [pontuacao, setPontuacao] = useState(0);
  const [respostaSelecionada, setRespostaSelecionada] = useState(null);
  const [mostrarFeedback, setMostrarFeedback] = useState(false);

  // Reiniciar estado quando o quiz mudar (caso o usuário jogue outro quiz em sequência)
  useEffect(() => {
    setPerguntaAtualIndex(0);
    setPontuacao(0);
    setRespostaSelecionada(null);
    setMostrarFeedback(false);
  }, [quiz]); // Dependência: quiz

  if (!quiz || !quiz.perguntas || quiz.perguntas.length === 0) {
    return (
      <div>
        <p>Erro: Quiz inválido ou não encontrado.</p>
        <button onClick={onBackToList}>Voltar para Lista</button>
      </div>
    );
  }
  
  const perguntaAtual = quiz.perguntas[perguntaAtualIndex];

  const handleSelecionarOpcao = (opcaoIndex) => {
    if (mostrarFeedback) return; 

    setRespostaSelecionada(opcaoIndex);
    setMostrarFeedback(true); // Mostra feedback imediatamente

    if (opcaoIndex === perguntaAtual.respostaCorreta) {
      setPontuacao(prevPontuacao => prevPontuacao + 1);
    }
  };

  const proximaOuFinalizar = () => {
    if (perguntaAtualIndex < quiz.perguntas.length - 1) {
      setPerguntaAtualIndex(prevIndex => prevIndex + 1);
      setRespostaSelecionada(null); // Limpa seleção para a próxima pergunta
      setMostrarFeedback(false); // Esconde feedback para a próxima pergunta
    } else {
      // Se é a última pergunta, chama onQuizEnd.
      // A pontuação já foi atualizada no handleSelecionarOpcao
      onQuizEnd(pontuacao, quiz.perguntas.length);
    }
  };
  
  return (
    <div id="quiz-player-container"> {/* ID mantido para estilização */}
      <h1 id="quiz-player-titulo">{quiz.titulo}</h1>
      {perguntaAtual ? (
        <div id="pergunta-atual-container"> {/* ID mantido para estilização */}
          <h2 id="pergunta-texto">
            Pergunta {perguntaAtualIndex + 1} de {quiz.perguntas.length}: {perguntaAtual.textoPergunta}
          </h2>
          <div id="opcoes-container"> {/* ID mantido para estilização */}
            {perguntaAtual.opcoes.map((opcao, index) => {
              let btnClass = ''; // Não precisamos mais de 'opcao-btn' se estilizamos button dentro de #opcoes-container
              if (mostrarFeedback) {
                if (index === perguntaAtual.respostaCorreta) {
                  btnClass = 'correta';
                } else if (index === respostaSelecionada) {
                  btnClass = 'incorreta';
                }
              }
              return (
                <button
                  key={index}
                  onClick={() => handleSelecionarOpcao(index)}
                  className={btnClass}
                  disabled={mostrarFeedback}
                >
                  {opcao}
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        <p>Carregando pergunta...</p>
      )}
      {mostrarFeedback && (
         <button onClick={proximaOuFinalizar} id="proxima-pergunta-btn" style={{marginTop: '20px'}}>
          {perguntaAtualIndex < quiz.perguntas.length - 1 ? 'Próxima Pergunta' : 'Ver Resultado Final'}
        </button>
      )}
       {!mostrarFeedback && perguntaAtual && <p style={{marginTop: '20px', fontStyle: 'italic'}}>Selecione uma opção acima.</p>}
       <button onClick={onBackToList} style={{backgroundColor: '#6c757d', marginLeft: mostrarFeedback ? '10px' : '0', marginTop: '20px'}}>
            Sair do Quiz
       </button>
    </div>
  );
}

export default QuizPlayer;