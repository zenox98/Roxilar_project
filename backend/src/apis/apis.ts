import e, { Router, Request, Response} from "express";

const router : Router = e.Router();

router.post('/', async(req : Request, res: Response) => {
  try {
    const response = req.body
    console.log(response)
    res.status(201).json({
      message : "success",
      data : response
    })
  } catch (e) {
    console.error(e);
  }
})

export default router;
