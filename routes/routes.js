const uuidv4 = require('uuid/v4');
var reqCaptcha = false;

const appRouter = (app) => {
    app.get("/api/", function(req, res) {
        let token = req.headers["token"];
        if(token != "badgebook") {
            reqCaptcha = true;
        }
        const key = uuidv4();
        if(reqCaptcha) {
            data = ({
                roomKey: key,
                url: "https://comp4711-a1.herokuapp.com/?roomKey=" + key + "&captcha=1"
            });
        } else {
            data = ({
                roomKey: key,
                url: "https://comp4711-a1.herokuapp.com/?roomKey=" + key + "&captcha=0"
            });
        }
        
        res.status(200).send(data);
    });

    app.post("/api/", function(req, res) {
        let token = req.headers["token"];
        if(token != "badgebook") {
            reqCaptcha = true;
        }
        const key = uuidv4();
        if(reqCaptcha) {
            data = ({
                roomKey: key,
                url: "https://comp4711-a1.herokuapp.com/?roomKey=" + key + "&captcha=1"
            });
        } else {
            data = ({
                roomKey: key,
                url: "https://comp4711-a1.herokuapp.com/?roomKey=" + key + "&captcha=0"
            });
        }
        
        res.status(200).send(data);
    });
}
  
module.exports = appRouter;