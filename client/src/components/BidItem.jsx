import React from 'react'

function BidItem({ id, uid, item_id, amount_bid, time_bid, name }) {
  return (
    <div>
        {name} bid £{amount_bid/100} at {time_bid}
    </div>
  )
}

export default BidItem