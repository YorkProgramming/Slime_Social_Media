import jwt from 'jsonwebtoken';             //AUTHORIZATION MIDDLEWARE

export const verifyToken = async (req, res, next) => {
    try {
        let token = req.header("Authorization");    //from the request, we grab the authorization header

        if (!token) {
            return res.status(403).send("Access Denied");   //If token doest exist
        }

        if (token.startsWith("Bearer ")) {                          //If token starts with Bearer
            token = token.slice(7, token.length).trimLeft();         //Remove Bearer from string to grab token
        }

        const verified = jwt.verify(token, process.env.JWT_SECRET);  //Verify token
        req.user = verified;                                        //Add user from payload
        next();                                                     //Continue to next middleware
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};