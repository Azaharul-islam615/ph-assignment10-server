const { MongoClient, ServerApiVersion } = require('mongodb');
const express=require ('express')
const cors=require('cors')
require('dotenv').config()

const port=process.env.PORT || 3000
const app=express()
app.use(cors())
app.use(express.json())
app.get('/',(req,res)=>{
    res.send('server is running')
})
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.jckqi5e.mongodb.net/?appName=Cluster0`;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
        const database=client.db()
    await client.connect();
    
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    
    
  }
}
run().catch(console.dir);
app.listen(port,()=>{
     console.log(`Server is running on port ${port}`)
})
