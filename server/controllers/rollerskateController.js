import {pool} from '../config/database.js';

const getEvents=async(req,res)=>{
    try{
        const queryEvents =`SELECT title, location, image, description, date, countdowndays FROM rollerskate;`
        const results= await pool.query(queryEvents)
        res.status(200).json(results.rows)
    }
    catch(err){
        console.error(err);
        res.status(409).json({error:err.message})
    }
}

const getEventsById=async(req,res)=>{
    try{
        console.log('Get Event: '+req.params.eventID)
        const eventID=req.params.eventID
        const selectQuery=`
        SELECT title, location, image, description, date, countdowndays 
        FROM rollerskate 
        WHERE id=${eventID}`
        
        // Get the first result
        const results= await pool.query(selectQuery)
        console.log(results.rows[0])
        res.status(200).json(results.rows[0])


    }
    catch(error){
        console.log(error)
        res.status(409).json( { error: error.message} )

    }
}

export default {
    getEvents,getEventsById
}