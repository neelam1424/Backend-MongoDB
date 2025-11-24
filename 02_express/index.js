import express from 'express'
import logger from './logger.js'
import morgan from 'morgan'

const app = express()

const port = 3000
//accept data from frontend in json format
app.use(express.json())



app.use(
  morgan(morganFormat, {
    stream: {
      write: (message) => {
        const logObject = {
          method: message.split(" ")[0],
          url: message.split(" ")[1],
          status: message.split(" ")[2],
          responseTime: message.split(" ")[3],
        };
        logger.info(JSON.stringify(logObject));
      },
    },
  })
);




const morganFormat = ":method :url :status :response-time ms";


let teaData = []
let nextId = 1

//Crud 
//add a new tea
app.post('/teas', (req,res) =>{

    const {name,price}=req.body
    //create object to store data in database
    const newTea = {id: nextId++, name, price}
    teaData.push(newTea)
    //send status
    res.status(201).send(newTea)
})
//get all tea
app.get('/teas',(req,res)=>{
    res.status(200).send(teaData)
})

//find
//get a tea with id
app.get('/teas/:id',(req,res)=>{
    const tea = teaData.find(t => t.id === parseInt(req.params.id))
    if(!tea){
        return res.status(404).send('Tea not found')
    }
    res.status(200).send(tea)
})

//update tea

app.put('/teas/:id',(req,res)=>{
    //grab id
    const tea = teaData.find(t => t.id ===parseInt(req.params.id))
    if(!tea){
        return res.status(404).send('Tea not found')
    }
    const {name,price} = req.body
    tea.name = name
    tea.price = price
    res.send(200).send(tea)
})


//delete tea

app.delete('/teas/:id', (req,res) =>{
    const index = teaData.findIndex(t => t.id === parseInt(req.params.id))

    if(index === -1){
        return res.status(404).send('tea not found')
    }
    teaData.splice(index,1)
    return res.status(204).send('deleted')
})




app.listen(port,"0.0.0.0",()=>{
    console.log(`Server is running on port : ${port}... `)
})



