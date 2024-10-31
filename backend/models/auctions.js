import knex from 'knex';
import config from "../db/knexfile.js";

const db = knex(config['development']);

const getAllAuctions = async () => {
    const results = await db
        .select('*')
        .from('auctions')
        .orderBy([{column: 'end_time', order: 'desc'}]);
    console.log(results);
    return results;
}

const insertToAuctions = async (req, res) => {
    try {
        const body = req.body;
        console.log(body);
        const { title, uid, description, price, file, end_time } = body;
  
        await db('auctions').insert({
            title: title,
            uid: uid,
            description: description,
            price: price,
            image: file,
            end_time: end_time
        })
        
        // console.log('Success');
        res.status(201).json({ message: 'Auction created successfully' });       
    }
    
    catch (error) {
        
        console.error('Error inserting record', error);
        res.status(500).json({ error: 'Error creating auction' });
        
    };
};

export { getAllAuctions, insertToAuctions }