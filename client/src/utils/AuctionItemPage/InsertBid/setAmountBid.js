import toast from 'react-hot-toast';

export const setAmountBid = async (customIncrement, auctionItem, currentPrice, setCurrentPrice) => {
    let amount_bid;
    if (customIncrement) { // if the user bidding on auction wants to set a custom bid
        const itemPrice = currentPrice ? currentPrice : auctionItem.price; // set auction price to either the current price if there are
        // previous bids, or the base price (auctionItem.price) if there are no bids yet.
        if (customIncrement < itemPrice + auctionItem.min_bid_increment) { // before allowing a user's custom bid, first check if
            // the bid is above the current item price + the min bid increment set by the auction creator.
            toast.error(`Bid must be at least £${itemPrice + auctionItem.min_bid_increment}`); // if not, send error to user that
            // the bid must be above the item price + the min bid increment.
            return;
        }
        amount_bid = customIncrement;
        setCurrentPrice(amount_bid);
    } else { // if user does not set custom bid, bids the predefined bid increment then:
        amount_bid = (currentPrice !== null && !isNaN(currentPrice) && currentPrice !== undefined && currentPrice > 0)
        ? Math.ceil(currentPrice + auctionItem.min_bid_increment) 
        : Math.ceil(auctionItem.price +  auctionItem.min_bid_increment);
        setCurrentPrice(amount_bid);
        // ternary operator that checks if current price (which is the base price + previous bids) 
        // is not: null, NaN, undefined, or 0. This is a check to see if anyone has bid on the item.
        // if true (there are bids on item) then add the min increment to the currentPrice 
        // else add min bid increment to base price (this will be the first bid on the item)
    }
    return amount_bid;
}