import { parse } from 'csv-parse';
import fs from 'fs';

const parser = parse({columns: true}, function (err, records) {
    if (err) {
        console.error('Error parsing CSV:', err);
    } else {
        console.log('Parsed records:', records);
    }
})

fs.createReadStream('./flipkart_com-ecommerce_sample.csv')
    .on('error', error => console.error('Error reading file:', error))
    .pipe(parser);