const express=require('express')
const cors=require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app=express()
app.use(express.json())
app.use(cors())
const port=process.env.PORT || 3000

require ('dotenv').config()

app.get('/',(req,res)=>{
    res.send('server side is running')
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
    try{
        await client.connect()
        const database=client.db('assignment10db')
        const usercoll=database.collection('usercollection')
        const postcoll=database.collection('clientcollection')

         app.get('/jobs', async(req,res)=>{
            const cursor=usercoll.find()
            const result=await cursor.toArray()
            res.send(result)
        })
         app.get('/sortedjob', async(req,res)=>{
            const cursor=usercoll.find().limit(6)
            const result=await cursor.toArray()
            res.send(result)
        })


         app.post("/addjob", async(req,res)=>{
            const newuser=req.body
            const result=await usercoll.insertOne(newuser)
            res.send(result)

        })
         app.post("/jobs", async(req,res)=>{
            const newuser=req.body
            const result=await usercoll.insertOne(newuser)
            res.send(result)

        })
        app.get('/jobs/:id', async (req, res) => {
        const id = req.params.id;
        const category = await usercoll.findOne({ _id: new ObjectId(id) });
        res.send(category);
       })

       app.patch('/jobs/:id',async(req,res)=>{
            const id=req.params.id
            const updatedJob=req.body
            
            const query={_id:new ObjectId(id)}
            const update={
                $set:{
                   title: updatedJob.title,
                    category: updatedJob.category,
                    summary: updatedJob.summary,
                    coverImage: updatedJob.coverImage,
                    postedAt: updatedJob.postedAt,
                }
            }
            const result=await usercoll.updateOne(query,update)
            res.send(result)
        })
        app.delete('/jobs/:id',async(req,res)=>{
            const id=req.params.id
            const query={
                _id:new ObjectId(id)
            }
            const result= await usercoll.deleteOne(query)
            res.send(result)
        })

     await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    }
    finally{

}
    
}

run().catch(console.dir)

app.listen(port,()=>{
    console.log(`server side is running ${port}`)
})