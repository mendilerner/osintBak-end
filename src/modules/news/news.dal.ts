
import pool from '../../dataAccess/postgresConnection';
import {redis} from '../../dataAccess/redisClient'








export const getAllNewsFromRedis = async () => {
    try{
        const keys = await redis.keys("news_report:*");
        const raw_data = await redis.json.MGET(keys,"$")
        const data = raw_data.map((item) => item[0])
        console.log(data);
        if (data !== null) {
            return data
        }
        else{
            const news = await pool.query(
                `SELECT *
                FROM news
                WHERE time::timestamp >= current_timestamp - interval '24 hours'`
              );
            return news.rows 
    }}
    catch (error){
        return error
    }
}

