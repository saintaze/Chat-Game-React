import './App.scss';

import Navbar from './components/Navbar';
import RoomsList from './components/RoomsList';
import Room from './components/Room/index';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Navbar/>
			<main>
				<RoomsList />
				<Room />
			</main>
			<Footer />
    </div>
  );
}

export default App;
