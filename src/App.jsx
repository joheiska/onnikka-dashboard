import './App.css';
import UsersView from './UsersView';
import WeightView from './WeightView';

function App() {
  return (
    <div className="main-wrapper">
      <header>
        <div className="container">
          <h1>Onnikka Dashboard</h1>
        </div>
      </header>
      <div className="content-area">
        <div className="container">
          <UsersView />
          <WeightView />
        </div>
      </div>
      <footer>
        <div className="container">
          <h4>© 2023</h4>
        </div>
      </footer>
    </div>
  );
}

export default App;