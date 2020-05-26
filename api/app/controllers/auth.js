const axios = require('axios');
const error = require('debug')('api:error');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { Users } = require('../models');

exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await Users.findOne({ where: { username } });
    const result = await bcrypt.compare(password, user.password);

    // if (username === user.username && result) {
    //   console.log('Looged In!');
    // }

    if (!user || !result) {
      // Return 400 error message (User doesn't exists)
      return res.status(400).send({ error: 'User does not exist' });
      console.log(error);
    }

    const secret = process.env.SECRET || 'JWT SECRET';

    const token = jwt.sign({ id: user.id }, secret);
    return res.json({
      token, loggedIn: true, id: user.id,
    });
  } catch (err) {
    return res.status(400).send({ error: err });
  }
};

exports.exchangeCode = async (req, res) => {
  // pull the code out of the body
  const { code, url } = req.body;
  try {
    // make a request to github for the access_token
    const { data } = await axios.get(
      'https://github.com/login/oauth/access_token',
      {
        params: {
          client_id: process.env.CLIENT_ID,
          client_secret: process.env.CLIENT_SECRET,
          redirect_uri: url,
          code,
        },
      },
    );

    const [user] = await Users.upsert({
      username: data.user.username,
      email: data.user.email,
      access_token: data.user.access_token,
      password: data.user.password,
      type: 'regular',
    }, { returning: true });

    const token = jwt.sign({ id: user.id }, process.env.SECRET);
    res.json({ token, loggedIn: true });
  } catch (e) {
    // log the error
    error(e);
    // send an unauthorized response if something above fails to work.
    res.status(401).json({ loggedIn: false });
  }
};
