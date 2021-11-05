import footerLogo from '../../images/footer_logo.png';

import './styles.scss';

const Footer = () => {
	return (
		<div className="Footer">
			<img src={footerLogo} className="footerLogo" alt="footer logo" />
			<div>
				<span className="cookieStatement">Cookie statement</span>
				<span className="copyright">&copy; 2021 Takeaway.com</span>
			</div>
		</div>
	)
}

export default Footer;
