import jwt from "jsonwebtoken";

const isAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token)
      return res
        .status(401)
        .json({ msg: "Please login to access this", success: false });
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        if(!decoded){
            return res.status(401).json({msg: "Invalid token", success: false});
        }
        req.id = decoded.id;
        next();
  } catch (e) {
    console.log(e);
  }
};

export default isAuth;
