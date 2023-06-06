import User from '../models/user.model';

//get all users
export const getAllUsers = async (user) => {
  console.log('Use deatils -------', user);
  const data = await User.find();

  let citydata = await fetch('https://goweather.herokuapp.com/weather/France');
  const response = await citydata.json();
  console.log("Output ===> getAllUsers ===> response:", response.forecast[0]);

  return { ...data, ...response };
};



//create new user
export const newUser = async (body) => {
  const data = await User.create(body);
  return data;
};

//create new user
export const userRegistration = async (body) => {
  const data = await User.create(body);
  return data;
};

//update single user
export const updateUser = async (_id, body) => {
  const data = await User.findByIdAndUpdate(
    {
      _id
    },
    body,
    {
      new: true
    }
  );
  return data;
};

//delete single user
export const deleteUser = async (id) => {
  await User.findByIdAndDelete(id);
  return '';
};

//get single user
export const getUser = async (id) => {
  const data = await User.findById(id);
  return data;
};
