import toast, { Toaster } from 'react-hot-toast';

export const setAmountBid = async (customIncrement, auctionItem, currentPrice, setCurrentPrice) => {
    let amount_bid;
    if (customIncrement) {
        const itemPrice = currentPrice ? currentPrice : auctionItem.price;
        if (customIncrement < itemPrice + auctionItem.min_bid_increment) {
            toast.error(`Bid must be at least £${itemPrice + auctionItem.min_bid_increment}`);
            return;
        }
        amount_bid = customIncrement;
        setCurrentPrice(amount_bid);
    } else {
        amount_bid = (currentPrice !== null && !isNaN(currentPrice) && currentPrice !== undefined && currentPrice > 0)
        ? Math.ceil(currentPrice + auctionItem.min_bid_increment) 
        : Math.ceil(auctionItem.price +  auctionItem.min_bid_increment);
        setCurrentPrice(amount_bid);
    }
    return amount_bid;
}