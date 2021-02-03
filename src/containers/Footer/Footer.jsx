import React from 'react'
import './Footer.css';
import  { Link }  from 'react-router-dom';

function Footer() {
    return (
        <div>
            <div className='footer-container'>
                <section className='footer-subscription'>
                    <p className='footer-subscription-heading'>
                        Join the Adventure of amazing style
                    </p>
                    <p className='footer-subscription-text'>
                        You can unsubscribe at any time.
                    </p>
                   

                </section>
                <div className='footer-links'>
                    <div className='footer-link-wrapper'>
                        <div className='footer-link-items'>
                            <h2>About Us</h2>
                            <Link to='/'>Home</Link>
                            <Link to='/'>Women</Link>
                            <Link to='/'>Men</Link>
                            <Link to='/'>Kids</Link>
                            <Link to='/'>Shoes</Link>
                        </div>
                        <div className='footer-link-items'>
                            <h2>Contact Us</h2>
                            <Link to='/signup'>Sign Up</Link>
                            <Link to='/'>Email</Link>
                            <Link to='/'>Investors</Link>
                            <Link to='/'>Phone</Link>
                            <Link to='/'>Products</Link>
                        </div>
                    </div>

                </div>
                <section className='social-media'>
                    <div className='social-media-wrap'>
                        <div className='footer-logo'>
                            <Link to='/review' className='social-logo'>
                                Leave comment
                            </Link>
                        </div>
                        <small className='website-rights'>Follow us on</small>
                        <div className="social-icons">
                            <Link className="social-icon-link facebook"
                                to='/'
                                target='_blank'
                                aria-label='Facebook'>
                                <i className='fab fa-facebook-f'></i>
                            </Link>
                            <Link
                                className='social-icon-link instagram'
                                to='/'
                                target='_blank'
                                aria-label='Instagram'>
                                <i className='fab fa-instagram'></i>
                            </Link>
                            <Link
                                className='social-icon-link twitter'
                                to='/'
                                target='_blank'
                                aria-label='Twitter'>
                                <i className='fab fa-twitter'></i>
                            </Link>
                            <Link
                                className='social-icon-link pinterest'
                                to='/'
                                target='_blank'
                                aria-label='Pinterest'>
                                <i className='fab fa-pinterest'></i>
                            </Link>

                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default Footer