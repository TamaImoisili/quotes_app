import './App.css';
import QuoteContainer from './Components/QuoteContainer';
import NewQuoteButton from './Components/NewQuoteButton';
import FavouritesButton from './Components/FavouritesButton';

function App() {
  const staticQuote = { text:'Climb the mountains and get their good tidings. Nature’s peace will flow into you as sunshine flows into trees. The winds will blow their own freshness into you, and the storms their energy, while cares will drop away from you like the leaves of Autumn.' }
  const staticAuthor = {text: 'John Muir'};
  //<QuoteContainer quote={staticQuote} author={staticAuthor.text} />
  return (
    <div className="App">
    <QuoteContainer quote={staticQuote} author={staticAuthor.text} />
      <NewQuoteButton/>
      <FavouritesButton/>
    </div>
  );
}

export default App;
