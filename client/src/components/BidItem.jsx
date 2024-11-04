import React from 'react'
import ReactTimeAgo from 'react-time-ago'

function BidItem({ id, item_id, amount_bid, time_bid, name }) {
    const date = new Date(time_bid);
  return (
    <div>
        {name} bid £{amount_bid/100} <ReactTimeAgo date={date} locale="en-GB"/>
    </div>
  )
}

export default BidItem