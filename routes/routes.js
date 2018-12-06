const uuidv4 = require('uuid/v4');

const appRouter = (app) => {
    app.get("/api/", function(req, res) {
        let token = req.headers["token"];
        const key = uuidv4();
        if(!token.localeCompare("badgebook")) {
            data = ({
                received_token: token,
                roomKey: key,
                url: "https://comp4711-a1.herokuapp.com/?roomKey=" + key + "&captcha=1"
            });
        } else {
            data = ({
                received_token: token,
                roomKey: key,
                url: "https://comp4711-a1.herokuapp.com/?roomKey=" + key + "&captcha=0"
            });
        }
        
        res.status(200).send(data);
    });

    app.post("/api/", function(req, res) {
        let token = req.headers["token"];
        const key = uuidv4();
        if(!token.localeCompare("badgebook")) {
            data = ({
                received_token: token,
                roomKey: key,
                url: "https://comp4711-a1.herokuapp.com/?roomKey=" + key + "&captcha=1"
            });
        } else {
            data = ({
                received_token: token,
                roomKey: key,
                url: "https://comp4711-a1.herokuapp.com/?roomKey=" + key + "&captcha=0"
            });
        }
        
        res.status(200).send(data);
    });
}
  
module.exports = appRouter;