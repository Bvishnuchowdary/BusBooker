import Route from "../models/routes.models.js";

export const addroutes = async (req, res) => {
  try {
    const { source, destination, travelTime } = req.body;

    const existingRoute = await Route.findOne({ source, destination, travelTime });
    if (existingRoute) {
      return res.status(400).json({ error: "Route already exists" });
    }
    
    const newRoute = new Route({
      source,
      destination,
      travelTime,
    });
    if(newRoute) { 
        await newRoute.save();
        res.status(201).json({ message: "Route added successfully", route: newRoute });
    }
    else{
        res.status(500).json({ message: "error occured in saving the route" });
    }
  } catch (error) {
    console.error("Error inside the addroutes function", error);
    res.status(500).json({ error: "An error occurred while adding the route" });
  }
};


export const fetchroutes = async (req,res)=>{
    try {
          const routes = await Route.find().select('source destination -_id');
          const locations = new Set();
          routes.forEach(route => {
          locations.add(route.source);
          locations.add(route.destination);
        });
        res.status(200).json([...locations]);
      } catch (error) {
        console.error("Error inside the fetchroutes function", error);
        res.status(500).json({ error: "An error occurred while fetching the route" });
    }
}


export const fetchroutesWithSourceAndDest = async (req,res)=>{
  try {
      const routes = await Route.find()
      res.status(200).json(routes);
    } catch (error) {
      console.error("Error inside the fetchroutes function", error);
      res.status(500).json({ error: "An error occurred while fetching the route" });
  }
}