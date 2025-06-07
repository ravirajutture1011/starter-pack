import User from "../models/user.model.js";

import {LRUCache} from 'lru-cache';

//redis
// import User from "../models/user.model.js";
import redis from "../utils/redis.js";



const userCache = new LRUCache({
  max: 100,              // max items
  ttl: 1000 * 60 * 5     // 5 minutes TTL
});

export const login = async(req,res)=>{
    try{
      const{name,password} = req.body;
      const user = await User.create({name:name,password:password});
      res.status(200).json({
         data : user,
         message : "User created successfully"
      });

    }
    catch(error){
        res.status(500).json({message:error.message})
    }
}

// export const getData = async(req,res)=>{
//   try{
//     const data = await User.find({name:req.body.name})
//     res.status(200).json({
//          res : data,
//          message : "User created successfully"
//       });
//   }
//    catch(error){
//         res.status(500).json({message:error.message})
//     }
// }

// export const getData = async (req, res) => {
//   try {
//     const { name } = req.body;
//         console.log("Received body:", req.body); // 🪵 log body
//     if (!name) {
//       return res.status(400).json({ message: "Name is required" });
//     }

//     console.log("Request to get user with name:", name);

//     // 1. Try fetching from cache
//     if (userCache.has(name)) {
//       console.log("Serving from LRU cache");
//       return res.status(200).json({
//         res: userCache.get(name),
//         message: "User fetched from cache"
//       });
//     }

//     // 2. Fetch from database
//     const data = await User.find({ name });

//     console.log("Fetched from DB, storing in cache");

//     // 3. Cache it
//     userCache.set(name, data);

//     // 4. Return response
//     res.status(200).json({
//       res: data,
//       message: "User fetched from DB"
//     });

//   } catch (error) {
//     console.error("Error in getData:", error);
//     res.status(500).json({ message: error.message });
//   }
// };


export const getData = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: "Name is required" });

    // Check in Redis
    const cachedData = await redis.get(name);
    if (cachedData) {
      console.log("⚡ Fetched from Redis");
      return res.status(200).json({
        res: JSON.parse(cachedData),
        message: "User fetched from Redis cache"
      });
    }

    // Fetch from DB
    const data = await User.find({ name });
    console.log("Fetched from DB");

    // Set Redis cache with TTL
    await redis.set(name, JSON.stringify(data), "EX", 60 * 60 * 24 * 5); // 5 days TTL

    res.status(200).json({
      res: data,
      message: "User fetched from DB"
    });

  } catch (error) {
    console.error("Redis Error:", error);
    res.status(500).json({ message: error.message });
  }
};

