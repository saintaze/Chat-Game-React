import './styles.scss';
import logo from '../../images/logo.png';

const Navbar = () => {
	return (
		<nav className="Navbar">
			<img className="logo" src={logo} alt="logo" />
			<div>
				<div className="headline">Playing with Sabrican</div>
				<div className="tagline">Win the game or win the job</div>
			</div>
		</nav>
	)
}

export default Navbar
