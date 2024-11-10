import React from 'react'
import axios from 'axios';
import { useEffect, useState } from 'react';

function InsertData() {
    const [categories, setCategories] = useState([]);
    const uid = 'static_data';
    const AUCTION_URL = import.meta.env.VITE_DEVELOPMENT_AUCTIONS_URL;

    useEffect(() => {
        const fetchDataAndInsertToAuctions = async () => {
            try {
                const response = await fetch('./data.json');
                const data = await response.json();
                const set = new Set();
                for (const item of data) {
                    const title = item[0];
                    const description = item[1];
                    const price = item[2];
                    const min_bid_increment = parseFloat(price*0.1);
                    const category = item[3];
                    set.add(category);
                    const image_url = item[4];
                    const entries = { uid, title, description, category, price, min_bid_increment, image_url };
                    await insertToAuctions(AUCTION_URL, entries);
                }
                setCategories(set);
            } catch (error) {
                console.log('Error fetching or inserting data', error);
            }
        } 
        fetchDataAndInsertToAuctions();
    }, [])
    


    
    const insertToAuctions = async (AUCTION_URL, entries) => {
        axios
        .post(AUCTION_URL, entries)
        .then((response) => {
            console.log(response.data);
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        })
    }

  return (
    <div>Categories: {categories}</div>
  )
}

export default InsertData