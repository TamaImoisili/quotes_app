import './App.css';
import QuoteContainer from './Components/QuoteContainer';

function App() {
  const staticQuote = { text:'Climb the mountains and get their good tidings. Nature’s peace will flow into you as sunshine flows into trees. The winds will blow their own freshness into you, and the storms their energy, while cares will drop away from you like the leaves of Autumn.' }
  const staticAuthor = {text: 'John Muir'};
  /**/
  return (
    <div className="App">
      <QuoteContainer quote={staticQuote} author={staticAuthor.text} />
    </div>
  );
}

export default App;
