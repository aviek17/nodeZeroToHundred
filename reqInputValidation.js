const express = require('express');
const app = express();
const zod = require('zod');

/** express.json or bodyparser.json is used to extract the json from req.body */
app.use(express.json());

const schema = zod.array(zod.number());

const schemaValidation = (schema, request) => {
    const status = schema.safeParse(request);
    if (!status.success) {
        throw new Error("Invalid input");
    }
    return status;
}

app.post("/health-checkups", (req, res) => {
    //kidneys = [1,2,3]
    const kidneys = req.body.kidneys;
    const response = schema.safeParse(kidneys);


    try {
        /**if (!response.success) {
            return res.status(400).send({
                message: "Invalid input"
            })
        }
        else {
            res.send({ message: "Health Checkup Results", kidneys: response.data });
        }
            */

        const validatedKidneys = schemaValidation(schema, kidneys);
        res.status(200).send({ message: "Health Checkup Results", kidneys: validatedKidneys.data });
    }
    catch (err) {
        return res.status(400).send({
            message: err.message
        })
    }

    //res.send({response});
})

//global catches to catch any exception that is raised by the server
//Error handling middlewares

/**app.use((err, req, res, next) => {
    console.log(err)
    res.status(500).send({
        message: "Something went wrong"
    })
})
    */


app.listen(3000, () => {
    console.log("App is listening on port 3000")
});