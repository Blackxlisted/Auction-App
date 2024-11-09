export const fetchAuctionItem = async (id, getAuctionItem, setBidIncrement, setAuctionInfo, loadImage, setImage) => {
    try {
        const item = await getAuctionItem(id);
        item.price = parseFloat(item.price);
        item.highest_bid = parseFloat(item.highest_bid);
        item.min_bid_increment = parseFloat(item.min_bid_increment);
        setBidIncrement(item.min_bid_increment);
        console.log(item);
        setAuctionInfo(item);
        console.log(item.image);
        const importedImage = await loadImage(item.image);
        console.log(importedImage);
        setImage(importedImage);
    } catch (error) {
        console.error(error);
    }
} 