import e, {Express, Request, Response} from "express";

// apis
import apisRoutes from "./apis/apis.ts";

// Middleware
import { corsMiddleWare } from "./middleware/cors.middleware.ts";
import { jsonMiddleWare } from "./middleware/json.middleware.ts";

const app : Express = e()
const port : number = 3000

// Enable CORS for all origins (for developement; configure more restrictively in production)
app.use(corsMiddleWare);

// Middleware to parse JSON request bodies
app.use(jsonMiddleWare);

// Mount the createNewTableProps
app.use('/api', apisRoutes)

app.get('/', (req : Request, res : Response) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`\n\napi is running at http://localhost:${port}/api/products.`)
  console.log(`\nServer runnig on http://localhost:${port}.`)
})
