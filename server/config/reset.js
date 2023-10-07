import { pool } from "./database.js";
import './dotenv.js'
import rollerskateData from "../data/rollerskateData.js";

const createrollerskateTable=async ()=>{
    const createTableQuery=`
    DROP TABLE IF EXISTS rollerskate;
    CREATE TABLE IF NOT EXISTS rollerskate (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,   
        location VARCHAR(50) NOT NULL,
        image VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        date TEXT,
        countdowndays TEXT
        
    );
    `
    try{
        const res =await pool.query(createTableQuery)
        console.log('rollerskate table created successfully')
    }
    catch (err){
        console.error('Error creating rollerskate table',err)
    }
}
// Place rollerskate data into rollerskate table
const seedrollerskateTable=async () =>{
    await createrollerskateTable()
    rollerskateData.forEach((rollerskate)=>{
        const insertQuery={
            text:'Insert INTO rollerskate(title, location, image, description, date, countdowndays) VALUES ($1,$2,$3,$4,$5,$6)'
        }

        const values = [
            rollerskate.title,            
            rollerskate.location,
            rollerskate.image,
            rollerskate.description,
            rollerskate.date,
            rollerskate.countdowndays
        ]

        pool.query(insertQuery,values,(err,res)=>{
            if (err){
                console.error(` Error inserting rollerskate ${rollerskate.id}`,err)
                return
            }

            console.log(`${rollerskate.title} added successfully!`)
        })

    })

}
seedrollerskateTable()