import {createClient} from 'redis'
export const redis = createClient({
    url: 'redis://:mendi1234@127.0.0.1:6379'
})

export const connectToRedis = async () => {
    try {
      await redis.connect();
      console.log('Connected to Redis');
    } catch (error) {
      console.error('Error connecting to Redis:', error);
    }
  };

const DEFAULT_EXPIRATION  = 24


// export const getOrSetCache = async <T>(key: string ,cb:() => T) => {
//     try{
//         const data = await redis.get(key);
//         if (data !== null) {
//             return JSON.parse(data)
//         }
//         const freshData = await cb()
//         await redis.set(key, JSON.stringify(freshData));
//         await redis.expire(key, DEFAULT_EXPIRATION)
//         return freshData
//     }
//     catch (error){
//         return error
//     }
// }
// export const getOrSetCacheWithArgument = async <T>(key: string ,cb:(arg: T) => any, arg: T) => {
//     try{
//         const data = await redis.get(key);
//         if (data !== null) {
//             return JSON.parse(data)
//         }
//         const freshData = await cb(arg)
//         await redis.set(key, JSON.stringify(freshData));
//         await redis.expire(key, DEFAULT_EXPIRATION)
//         return freshData
//     }
//     catch (error){
//         return error
//     }
// }

