import React from 'react'
import { Link, useRouteError} from 'react-router-dom';
import notFound from '../assets/404.svg';
import other from '../assets/other.svg';

const ErrorPage = () => {
    const error = useRouteError();
    console.log(error);

   if (error.status === 404) {
        return (
            <div className='error'>
                <img src={notFound} alt="404"></img>
                <h4>Ohh! The resource requested is no longer available.</h4>
                <Link to="/" className='link'>Back Home</Link>
            </div>
        );
   } 
   return (
        <div className='error'>
            <img src={other} alt="other"></img>
            <h4>
                This is embarassing. Some issues have occurred - We are on it now. Please try again later.
            </h4>
            <Link to="/" className='link'>Back Home</Link>
        </div>
   )
}

export default ErrorPage