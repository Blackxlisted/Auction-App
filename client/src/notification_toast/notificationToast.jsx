import toast from 'react-hot-toast';
import ReactTimeAgo from 'react-time-ago'
const DEL_NOTIFICATION_URL = 'http://localhost:5005/api/notifications/delete'
import axios from 'axios';
import { shortenString } from '../utils/utils';

async function notificationToast( uid, item_id, title, image, outbid_price, time_bid, name, hasEnded, isBidder ) {
  const url = `/auctions/${item_id}`;
  const MAX_TITLE_LENGTH = 30;

  axios
    .post(DEL_NOTIFICATION_URL, {uid, item_id})
    .then((response) => {
        console.log(response.data);
    })
    .catch((error) => {
        console.log(error);
    });

  toast.custom((t) => (
    <div
      className={`${
        t.visible ? 'animate-enter' : 'animate-leave'
      } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
    >
      <div className="flex-1 w-0 p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0 pt-0.5">
            <img
              className="h-10 w-10 rounded-full"
              src={image}
              alt=""
            />
          </div>
          <div className="ml-3 flex-1">
            <p className="text-sm font-medium text-gray-900">
              {shortenString(title, MAX_TITLE_LENGTH)}
            </p>
            <p className='text-sm text-gray-600 absolute right-[329px] top-[5px]'><ReactTimeAgo date={Date.parse(time_bid)} locale="en-GB"/></p>
            {console.log('hasEnded', hasEnded)}
            {!hasEnded && hasEnded !== undefined ? (
              <>
                <p className="mt-1 text-sm text-gray-500">
                  You were outbid on <a href={url} className='text-indigo-600 hover:text-indigo-500'>this</a> item by <span className='text-gray-600'>{name}</span>
                </p>
                <p className="mt-0 text-sm text-gray-500">
                  Current bid: <span className='text-gray-600'>£{outbid_price}</span>
                </p>
              </>
            ) : !isBidder && isBidder !== undefined && outbid_price ? (
              <>
                <p className="mt-1 text-sm text-gray-500">
                  You sold your <a href={url} className='text-indigo-600 hover:text-indigo-500'>item!</a>
                </p>
                <p className="mt-0 text-sm text-gray-500">
                  Price sold at: <span className='text-gray-600'>£{outbid_price}</span>
                </p>
              </>
            ) : !isBidder && isBidder !== undefined ? (
              <>
                <p className="mt-1 text-sm text-gray-500">
                  You  <a href={url} className='text-indigo-600 hover:text-indigo-500'>auction</a> expired with no bids
                </p>
              </>
            ) 
            : (
              <>
                <p className="mt-1 text-sm text-gray-500">
                  You won <a href={url} className='text-indigo-600 hover:text-indigo-500'>this</a> auction!
                </p>
                <p className="mt-0 text-sm text-gray-500">
                  Price bought: <span className='text-gray-600'>£{outbid_price}</span>
                </p>
              </>
            )}
            
            
          </div>
        </div>
      </div>
      <div className="flex border-l border-gray-200">
        <button
          onClick={() => toast.dismiss(t.id)}
          className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Close
        </button>
      </div>
    </div>
  ), );
}

export { notificationToast }