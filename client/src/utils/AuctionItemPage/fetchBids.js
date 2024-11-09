export const fetchBids = async (id, getBidsByItemId, setBids, setCurrentPrice) => {
    try {
        const bidsObject = await getBidsByItemId(id);
        setBids(bidsObject);
        setCurrentPrice(parseFloat(bidsObject[0]?.amount_bid));
        console.log(bidsObject);
        //console.log('bids in fetch', bids);
    } catch (error) {
        console.error(error);
    };
};