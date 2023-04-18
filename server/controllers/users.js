import User from '../models/User.js';

export const getUser = async (req, res) => {
    try {
        const { id } = req.params;                            //Grab id from params   
        const user = await User.findById(id);                        //Find user by id
        res.status(200).json(user);                           //Send user to client
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
};

export const getUserFriends = async (req, res) => {
    try {
        const { id } = req.params;  
        const user = await User.findById(id);
    
        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        );
        const formattedFriends = friends.map(
            ({_id, firstName, lastName, occupation, location, picturePath}) => {
                return {
                    _id,
                    firstName,
                    lastName,
                    occupation,
                    location,
                    picturePath,
                };
            }
        );
        res.status(200).json(formattedFriends);
    }
    catch (err) {
        res.status(404).json({ error: err.message });
    };
};


/* Update User Friends */
export const addRemoveFriend = async (req, res) => {
    try {
        const { id, friendId } = req.params;
        const user = await User.findById(id);
        const friend = await User.findById(friendId);

        if (user.friends.includes(friendId)) {                              //Checks if friend is already in user's friends array
            user.friends = user.friends.filter((id) => id !== friendId);            //Removes friend from user's friends array
            friend.friends = friend.friends.filter((id) => id !== id);              //Removes user from friend's friends array
        } else {
            user.friends.push(friendId);                                //Adds friend to user's friends array
            friend.friends.push(id);                            //Adds user to friend's friends array
        }
        await user.save();
        await friend.save();

        const friends = await Promise.all(                          //Gets friends data
            user.friends.map((id) => User.findById(id))             //Maps through friends array and finds friends by id
        );
        const formattedFriends = friends.map(
            ({_id, firstName, lastName, occupation, location, picturePath}) => {        //Formats friends data
                return {
                    _id,
                    firstName,
                    lastName,
                    occupation,
                    location,
                    picturePath,
                };
            }
        );
        res.status(200).json(formattedFriends);
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
};

/* Update User Profile */
export const updateUserProfile = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);

        user.firstName = req.body.firstName || user.firstName;
        user.lastName = req.body.lastName || user.lastName;
        user.email = req.body.email || user.email;
        user.password = req.body.password || user.password;
        user.occupation = req.body.occupation || user.occupation;
        user.location = req.body.location || user.location;
        user.picturePath = req.body.picturePath || user.picturePath;

        const updatedUser = await user.save();

        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};