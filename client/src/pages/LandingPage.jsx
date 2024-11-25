import React from 'react'
import mainpage from '../assets/mainpage.png'
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';
import { notificationToast } from '../notification_toast/notificationToast';
import axios from 'axios';
import { loadImage } from '../utils/utils';
import Hcategories from '../components/Hcategories';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';

const LandingPage = () => {
  
  const { user, loginWithRedirect } = useAuth0();
  const sub = user?.sub;
  console.log(sub);
  

  

  const NOTIS_ENDPOINT = 'http://localhost:5005/api/notifications/get-by-uid'
  const getNotis = async () => {
    try {
      const response = await axios.get(`${NOTIS_ENDPOINT}`, {
          headers: {
              'uid': sub
          }
      });
      console.log('Notifications:', response.data);
      return response.data;
    } catch (error) {
        console.error('Error fetching notifications:', error);
    };
  };
  
  const sendNotis = async () => {
    const notifications = sub ? await getNotis() : '';
    if (notifications)
      {
        notifications.map(async (item) => {
          console.log('notification object: ',item)
          const image = await loadImage(item.image);
          const { title, outbid_price, time_bid, item_id, name, hasEnded, isBidder } = item;
          notificationToast(sub, item_id, title, image, outbid_price, time_bid, name, hasEnded, isBidder);
        })
      }
  }
  
  sendNotis();
  

  return (
    <>

    <div className='hero bg-gradient-to-tr from-shiko from-30% via-shino via-30% to bg-shilo to-70%'>
      <div className="hero-left">
        <h2>Bid, win, own—just one click away!</h2>
        <div>
            <div className="hero-hand-icon">
                <p>
                    New
                </p>
            </div>
            <p>Items</p>
            <p>for Everyone</p>
        </div>
        
        <div className="hero-latest-btn"> 
          {sub ? (
              <Link to='/auctions'>
                <div >
                  View Auctions
                </div>
              </Link>
              
            ) :
            (
              <div>
                <button onClick={() => loginWithRedirect()}>Start bidding!</button>
              </div>
            )
          }
            
        </div>
      </div>
      <div className='flex-1 flex items-center justify-center max-w-lg '></div>
      <img src={mainpage} alt="" className='max-w-[50%] bg-blend-normal'/>

    </div>
          <Hcategories/>
          <Newsletter/>
          <Footer/>
          
    </>
  )


}


export default LandingPage