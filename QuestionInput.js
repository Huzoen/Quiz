import React from 'react';

function QuestionInput({ pergunta, index, onPerguntaChange, onOpcaoChange, onCorretaChange, onRemovePergunta }) {
  const handleOpcaoTextChange = (opcaoIndex, value) => {
    const novasOpcoes = [...pergunta.opcoes];
    novasOpcoes[opcaoIndex] = value;
    onOpcaoChange(index, novasOpcoes);
  };

  return (
    <div className="pergunta-bloco">
      <h3>Pergunta {index + 1}</h3>
      <div>
        <label htmlFor={`pergunta-texto-${index}`}>Texto da Pergunta:</label>
        <input
          type="text"
          id={`pergunta-texto-${index}`}
          value={pergunta.textoPergunta}
          onChange={(e) => onPerguntaChange(index, 'textoPergunta', e.target.value)}
          placeholder="Qual é...?"
        />
      </div>
      <h4>Opções de Resposta:</h4>
      {pergunta.opcoes.map((opcao, opcaoIndex) => (
        <div className="opcao-item" key={opcaoIndex}>
          <input
            type="radio"
            name={`correta-${index}`} // Name deve ser único por pergunta para o grupo de radio
            id={`opcao-correta-${index}-${opcaoIndex}`}
            value={opcaoIndex}
            checked={pergunta.respostaCorreta === opcaoIndex}
            onChange={() => onCorretaChange(index, opcaoIndex)}
          />
          <label htmlFor={`opcao-texto-${index}-${opcaoIndex}`} style={{ display: 'inline', fontWeight: 'normal', marginRight: '5px' }}>
            Opção {opcaoIndex + 1}:
          </label>
          <input
            type="text"
            id={`opcao-texto-${index}-${opcaoIndex}`}
            value={opcao}
            onChange={(e) => handleOpcaoTextChange(opcaoIndex, e.target.value)}
            placeholder={`Resposta ${opcaoIndex + 1}`}
            style={{ width: 'calc(100% - 150px)', display: 'inline-block', marginBottom: '5px' }}
          />
        </div>
      ))}
      {index > 0 && // Permite remover apenas se não for a primeira pergunta
        <button type="button" onClick={() => onRemovePergunta(index)} className="remover-pergunta-btn">
          Remover Esta Pergunta
        </button>
      }
    </div>
  );
}

export default QuestionInput;