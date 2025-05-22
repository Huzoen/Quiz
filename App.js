import React, { useState, useEffect } from 'react';
import './App.css'; // Importa seus estilos
import QuizList from './QuizList';
import QuizForm from './QuizForm';
import QuizPlayer from './QuizPlayer';
import QuizResult from './QuizResult';

function App() {
  const [view, setView] = useState('list'); // 'list', 'create', 'play', 'result'
  const [quizzes, setQuizzes] = useState([]);
  const [currentQuizToEdit, setCurrentQuizToEdit] = useState(null); 
  const [currentQuizIndexToPlay, setCurrentQuizIndexToPlay] = useState(null);
  const [finalScore, setFinalScore] = useState({ score: 0, total: 0 });

  useEffect(() => {
    const savedQuizzes = JSON.parse(localStorage.getItem('meusQuizzesReact')) || [];
    setQuizzes(savedQuizzes);
  }, []);

  useEffect(() => {
    localStorage.setItem('meusQuizzesReact', JSON.stringify(quizzes));
  }, [quizzes]);

  const handleCreateNewQuiz = () => {
    setCurrentQuizToEdit(null); 
    setView('create');
  };

  const handleEditQuiz = (index) => {
    // Futuramente, se quiser editar, você pode passar o quiz para o QuizForm
    // setCurrentQuizToEdit(quizzes[index]);
    // setView('create');
    alert("Função de editar ainda não implementada nesta versão.");
  };

  const handleSaveQuiz = (newQuizData) => {
    if (currentQuizToEdit && currentQuizToEdit.id) { // Edição (não totalmente implementado no exemplo)
        setQuizzes(quizzes.map(q => q.id === currentQuizToEdit.id ? {...currentQuizToEdit, ...newQuizData} : q));
    } else { // Novo Quiz
        setQuizzes([...quizzes, { ...newQuizData, id: Date.now() }]); 
    }
    setView('list');
    setCurrentQuizToEdit(null);
  };

  const handleStartQuiz = (index) => {
    setCurrentQuizIndexToPlay(index);
    setView('play');
  };

  const handleQuizEnd = (score, totalQuestions) => {
    setFinalScore({ score, total: totalQuestions });
    setView('result');
  };

  const handleBackToList = () => {
    setView('list');
    setCurrentQuizToEdit(null);
    setCurrentQuizIndexToPlay(null);
  };


  return (
    <div className="container">
      <h1>Gerador de Quiz</h1>
      {view === 'list' && (
        <>
          <button onClick={handleCreateNewQuiz} style={{ marginBottom: '20px', backgroundColor: '#007bff' }}>Criar Novo Quiz</button>
          <QuizList 
            quizzes={quizzes} 
            onStartQuiz={handleStartQuiz}
            // onEditQuiz={handleEditQuiz} // Para futura implementação de edição
          />
        </>
      )}
      {view === 'create' && (
        <QuizForm 
            onSaveQuiz={handleSaveQuiz} 
            onCancel={handleBackToList} 
            quizParaEditar={currentQuizToEdit} 
        />
      )}
      {view === 'play' && currentQuizIndexToPlay !== null && quizzes[currentQuizIndexToPlay] && (
        <QuizPlayer
          quiz={quizzes[currentQuizIndexToPlay]}
          onQuizEnd={handleQuizEnd}
          onBackToList={handleBackToList}
        />
      )}
      {view === 'result' && (
        <QuizResult
          score={finalScore.score}
          totalQuestions={finalScore.total}
          onBackToList={handleBackToList}
        />
      )}
    </div>
  );
}

export default App;