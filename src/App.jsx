import './App.css';
import UsersView from './views/UsersView';
import WeightView from './views/WeightView';

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
          <p>© 2023</p>
        </div>
      </footer>
    </div>
  );
}

export default App;