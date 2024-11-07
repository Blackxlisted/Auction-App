import React from 'react'
import Papa from 'papaparse';
import _ from 'lodash';
import { useState, useEffect } from 'react'; 

function DataPage() {
    const filePath = '/amazon.csv'
    const [data, setData] = useState(null);
    const STATIC_DATA_SIZE = 100;

    const parseCSV = async (filePath) => {
        try {
        const response = await fetch(filePath, {method: 'HEAD'});
        const csvText = await response.text();
        Papa.parse(csvText, {
            complete: (result) => {
            //console.log(result.data);
            formatCSV(result.data);
            },
        });
        } catch (error) {
        console.error('Error fetching CSV:', error);
        }
    };
  
 
    const formatCSV = (csv) => {
        if (!csv || csv.length === 0) {
            setData(`${filePath} not found. Deleted by Joe`)
            return;
        }
        const result = _.sampleSize(csv, STATIC_DATA_SIZE);
        const indicesToKeep = [19, 9, 4, 3, 0];

        // Create a new array with elements at the specified indices
        const filteredResult = result.map((item) => {
            item[4] = parseFloat(item[4]);
            item[9] = item[9].split(",")[0].replace(/^[^a-zA-Z]+|[^a-zA-Z]+$/g, '');;
            
            return (
                item.filter((item, index) => indicesToKeep.includes(index))
            )
            });

            setData(filteredResult);
    }

    useEffect(() => {
        parseCSV(filePath);
    }, [])
    

    return (
        <>
            <pre>{data ? JSON.stringify(data, null, 2) : "Loading data..."}</pre>
        </>
    )
}

export default DataPage