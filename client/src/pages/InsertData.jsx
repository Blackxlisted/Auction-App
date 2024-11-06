import React from 'react'
import axios from 'axios';
import { useEffect } from 'react';
// table.string("uid", 100).notNullable().defaultTo("");
// table.string("title").notNullable();
// table.text("description").notNullable().defaultTo("No description provided.");
// table.string("category");
// table.decimal("price", 10, 2).notNullable() // change to decimal 
// table.decimal("min_bid_increment", 10, 2).notNullable();
// table.text("image", 500).notNullable().defaultTo("No-Image-Available.jpg");
// table.dateTime("end_time").notNullable().defaultTo(
//   knex.raw("NOW() + INTERVAL '1 day'")
// );
// table.decimal("highest_bid", 10, 2);
// table.boolean('hasEnded').notNullable().defaultTo(false);
function InsertData() {

    const uid = 'static_data';
    const AUCTION_URL = import.meta.env.VITE_DEVELOPMENT_AUCTIONS_URL;

    useEffect(() => {
        const fetchDataAndInsertToAuctions = async () => {
            try {
                const response = await fetch('./data.json');
                const data = await response.json();
                for (const item of data) {
                    const title = item[0];
                    const description = item[1];
                    const price = item[2];
                    const min_bid_increment = parseFloat(price*0.1);
                    const category = item[3];
                    const image_url = item[4];
                    const entries = { uid, title, description, category, price, min_bid_increment, image_url };
                    await insertToAuctions(AUCTION_URL, entries);
                }
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
    <div>InsertData</div>
  )
}

export default InsertData