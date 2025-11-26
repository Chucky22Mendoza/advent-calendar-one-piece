import AdventCalendar from './components/AdventCalendar';
import Snow from './components/Snow';

function App() {
  return (
    <div className="App">
      <Snow />
      <AdventCalendar />

      <footer style={{
        textAlign: 'center',
        padding: '20px',
        color: 'rgba(255,255,255,0.5)',
        fontSize: '0.8rem',
        position: 'relative',
        zIndex: 1
      }}>
        <p>Hecho con ❤️ y 🏴‍☠️ por tu esposo</p>
      </footer>
    </div>
  );
}

export default App;
