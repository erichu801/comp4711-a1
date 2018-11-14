const appRouter = (app) => {
    app.get("/api/", function(req, res) {
        const key = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        data = ({
            roomKey: key,
            url: "localhost:8080/?roomKey=" + key
        });
        res.status(200).send(data);
    });

    app.post("/api/", function(req, res) {
        let urlString = window.location.href;
        let url = new URL(urlString);
        const key = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        data = ({
            roomKey: key,
            url: url + "/?roomKey=" + key
        });
        res.status(200).send(data);
    });
}
  
module.exports = appRouter;