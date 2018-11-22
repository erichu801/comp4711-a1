const uuidv4 = require('uuid/v4');

const appRouter = (app) => {
    app.get("/api/", function(req, res) {
        const key = uuidv4();
        data = ({
            roomKey: key,
            url: "https://comp4711-a1.herokuapp.com/?roomKey=" + key
        });
        res.status(200).send(data);
    });

    app.post("/api/", function(req, res) {
        let token = req.headers["token"];
        if(token != "badgebook") {
            res.status(403).send("Invalid token.");
            res.end();
            return;
        }
        const key = uuidv4();
        data = ({
            roomKey: key,
            url: "https://comp4711-a1.herokuapp.com/?roomKey=" + key
        });
        res.status(200).send(data);
    });
}
  
module.exports = appRouter;