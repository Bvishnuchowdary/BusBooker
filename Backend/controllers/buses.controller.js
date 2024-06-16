import Bus from "../models/buses.models.js"

export const addbus = async (req, res) => {
    try {
      const { operator, busNumber, type, seats, amenities } = req.body;
  
      const existingBus = await Bus.findOne({ busNumber });
      if (existingBus) {
        return res.status(400).json({ error: 'Bus already exists' });
      }
  
      const newBus = new Bus({ operator, busNumber, type, seats, amenities });
      await newBus.save();
  
      res.status(201).json({ message: 'Bus added successfully', bus: newBus });
    } catch (error) {
      console.error('Error in addbus function', error);
      res.status(500).json({ error: 'An error occurred while adding the bus' });
    }
  };

export const fetchbuses = async (req, res) => {
    try {
      const buses = await Bus.find();
      res.status(200).json(buses);
    } catch (error) {
      console.error('Error in fetchbuses function', error);
      res.status(500).json({ error: 'An error occurred while fetching buses' });
    }
   };



export const updatebuses = async (req,res) =>{

}

export const deletebuses = async (req,res) =>{

}


