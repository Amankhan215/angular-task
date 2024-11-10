const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/angular-task-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.log('Error connecting to MongoDB:', err));

const DataSchema = new mongoose.Schema({
  primitiveData: Number,
  nonPrimitiveData: {
    value: Number
  }
});

const DataModel = mongoose.model('Data', DataSchema);

app.get('/data', async (req, res) => {
  try {
    let data = await DataModel.findOne(); 
    if (!data) {
      data = new DataModel({
        primitiveData: 100,
        nonPrimitiveData: { value: 200 }
      });
      await data.save();
    }
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/data', async (req, res) => {
  try {
    const { primitiveData, nonPrimitiveData } = req.body;
    let data = await DataModel.findOne();
    
    if (data) {
      data.primitiveData = primitiveData;
      data.nonPrimitiveData = nonPrimitiveData;
    } else {
      data = new DataModel({
        primitiveData,
        nonPrimitiveData
      });
    }

    await data.save();
    res.json({ message: 'Data updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
