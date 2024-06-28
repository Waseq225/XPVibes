const express = require('express')
const cors = require('cors')
const app = express()

const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
}
app.use(cors(corsOptions))

// app.use(
//   cors({
//     credentials: true,
//     origin: "http://127.0.0.1:5173",
//   })
// );

app.get('/test', (req, res) => {
    res.json('message ok')
    return res
})

app.listen(4000)
