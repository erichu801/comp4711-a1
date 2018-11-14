const uuidv4 = require('uuid/v4');

const appRouter = (app) => {
    app.get("/api/", function(req, res) {
        const key = uuidv4();
        data = ({
            roomKey: key,
            url: "/?roomKey=" + key
        });
        res.status(200).send(data);
    });

    app.post("/api/", function(req, res) {
        const key = uuidv4();
        data = ({
            roomKey: key,
            url: "/?roomKey=" + key
        });
        res.status(200).send(data);
    });
}
  
module.exports = appRouter;