// oort logo from './logo.svg';
// import './App.css';
import './components/KanbanBoard';
import './components/Button';
import './components/Card';
import KanbanBoard from './components/KanbanBoard';
import './components/Button';
import './components/Card';
import Button from './components/Button';
import Card from './components/Card';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <KanbanBoard/>
      <Button/>
      <Card/>
      </header>
    </div>
  );
}

export default App;
