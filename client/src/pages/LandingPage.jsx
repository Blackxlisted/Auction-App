import React from 'react'
import hero1 from '../assets/hero1.png'
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';
import { notificationToast } from '../notification_toast/notificationToast';
import axios from 'axios';
import { loadImage } from '../utils/utils';


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
          const image = await loadImage(item.image);
          const { title, outbid_price, time_bid, item_id, name } = item;
          notificationToast(sub, item_id, title, image, outbid_price, time_bid, name);
        })
      }
  }
  
  sendNotis();
  

  return (
    <div className='hero'>
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
        {/* <button onClick={() => {notificationToast(sub)}}>Toast me herrrrree</button> */}
        
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
      <div className="hero-right"></div>
      <img src={hero1} alt="" />
    </div>
  )
}

export default LandingPage