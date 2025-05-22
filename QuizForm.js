import React, { useState, useEffect } from 'react';
import QuestionInput from './QuestionInput';

const createNovaPerguntaObj = () => ({
  textoPergunta: '',
  opcoes: ['', '', '', ''], // Garante 4 opções iniciais
  respostaCorreta: 0, // Default para a primeira opção
});

function QuizForm({ onSaveQuiz, onCancel, quizParaEditar }) {
  const [titulo, setTitulo] = useState('');
  const [perguntas, setPerguntas] = useState([createNovaPerguntaObj()]);

  useEffect(() => {
    if (quizParaEditar) {
      setTitulo(quizParaEditar.titulo);
      // Garante que cada pergunta no quiz para editar tenha 4 opções
      const perguntasFormatadas = quizParaEditar.perguntas.map(p => ({
        ...p,
        opcoes: [...p.opcoes, '', '', '', ''].slice(0, 4) // Garante 4 opções
      }));
      setPerguntas(perguntasFormatadas);
    } else {
      // Reset para novo quiz
      setTitulo('');
      setPerguntas([createNovaPerguntaObj()]);
    }
  }, [quizParaEditar]);

  const handlePerguntaChange = (index, campo, valor) => {
    const novasPerguntas = [...perguntas];
    novasPerguntas[index] = { ...novasPerguntas[index], [campo]: valor };
    setPerguntas(novasPerguntas);
  };

  const handleOpcaoChange = (perguntaIndex, novasOpcoes) => {
    const novasPerguntas = [...perguntas];
    novasPerguntas[perguntaIndex] = { ...novasPerguntas[perguntaIndex], opcoes: novasOpcoes };
    setPerguntas(novasPerguntas);
  };

  const handleCorretaChange = (perguntaIndex, opcaoIndex) => {
    const novasPerguntas = [...perguntas];
    novasPerguntas[perguntaIndex] = { ...novasPerguntas[perguntaIndex], respostaCorreta: opcaoIndex };
    setPerguntas(novasPerguntas);
  };

  const adicionarPergunta = () => {
    setPerguntas([...perguntas, createNovaPerguntaObj()]);
  };

  const removerPergunta = (indexToRemove) => {
    if (perguntas.length > 1) {
      setPerguntas(perguntas.filter((_, index) => index !== indexToRemove));
    } else {
      alert("Um quiz deve ter pelo menos uma pergunta.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!titulo.trim()) {
      alert('Por favor, dê um título ao seu quiz.');
      return;
    }
    for (const p of perguntas) {
        if (!p.textoPergunta.trim()) {
            alert('O texto de todas as perguntas deve ser preenchido.');
            return;
        }
        if (p.opcoes.some(opt => !opt.trim())) {
            alert('Todas as quatro opções de resposta de cada pergunta devem ser preenchidas.');
            return;
        }
         if (p.respostaCorreta === null || p.respostaCorreta === undefined || p.respostaCorreta < 0 || p.respostaCorreta >= p.opcoes.length) {
            alert('Selecione uma resposta correta para cada pergunta.');
            return;
        }
    }
    onSaveQuiz({ titulo, perguntas, id: quizParaEditar ? quizParaEditar.id : undefined });
  };

  return (
    <section> {/* Removido ID desnecessário aqui, já que é um componente */}
      <h2>{quizParaEditar ? "Editar Quiz" : "Criar Novo Quiz"}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="quiz-titulo-form">Título do Quiz:</label>
          <input
            type="text"
            id="quiz-titulo-form"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            placeholder="Ex: Conhecimentos Gerais"
          />
        </div>

        <div> {/* Removido ID desnecessário aqui */}
          {perguntas.map((pergunta, index) => (
            <QuestionInput
              key={quizParaEditar && quizParaEditar.id ? `q-${quizParaEditar.id}-${index}` : `q-new-${index}`} // Chave mais robusta
              index={index}
              pergunta={pergunta}
              onPerguntaChange={handlePerguntaChange}
              onOpcaoChange={handleOpcaoChange}
              onCorretaChange={handleCorretaChange}
              onRemovePergunta={removerPergunta}
            />
          ))}
        </div>

        <button type="button" onClick={adicionarPergunta} id="adicionar-pergunta-btn">
          Adicionar Pergunta
        </button>
        <button type="submit" id="salvar-quiz-btn">
          {quizParaEditar ? "Salvar Alterações" : "Salvar Quiz"}
        </button>
        <button type="button" onClick={onCancel} style={{backgroundColor: '#6c757d'}}>
          Cancelar
        </button>
      </form>
    </section>
  );
}

export default QuizForm;