import jwt from 'jsonwebtoken';


export const createAccessToken = (email,userId) => {
  const payload ={ email:email, _id: userId ,expiresIn:"1h"};
    const secret = process.env.ACCESS_TOKEN_SECRET;
    const options = {
        issuer: 'bridgelabz.com',
        audience: `${userId}`,
      };
    const accessToken = jwt.sign(payload,secret,options);
    return accessToken;
  };
  
export const createRefreshToken = (email,userId) => {
    const payload ={ email:email, _id: userId ,expiresIn:"1y"};
    const secret = process.env.REFRESH_TOKEN_SECRET;
    const options = {
        issuer: 'bridgelabz.com',
        audience: `${userId}`,
      };
    const refreshToken = jwt.sign(payload,secret,options);
    return refreshToken;
  };
  