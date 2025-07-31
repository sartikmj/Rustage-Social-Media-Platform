import User from '../routes/User.js';

/* READ */
export const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        res.status(200).json(user);
    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}

export const getUserFriends = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id)

        const friends = await Promise.all( //This runs all those promises(Executes all DB queries in parallel) in parallel and waits until all are resolved.
            user.friends.map((id) => User.findById(id))
        )
        //formatting the friends list in proper way for frontend    
        const formattedFriends = friends.map(
            ({ _id, firstName, lastName, occupation, location, picturePath, }) => { //fetching only these details from the friends id list, to send them to frontend.
                return { _id, firstName, lastName, occupation, location, picturePath, }
            }
        )
        res.status(200).json(formattedFriends)
    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}

/* UPDATE */
export const addRemoveFriend = async (req,res) => {
    try{
        const { id, friendId } = req.params;
        const user = user.findById(id);
        const friend = await User.findById(friendId)

        //REMOVING FRIEND
        if(user.friends.includes(friendId)){ //if friendId is in the list of friends of user
            //we are removing them 
            user.friends = user.friends.filter((id)=> id !== friendId) //loop around each id in the user.friends array and only keeping those id which are not equal to friendId
            //now removing the user from friends list of the friend that is removed from the friends list of the user
            friend.friends =  friend.friends.filter((id)=> id !== id)
        }
        else{ //if friendId is not in the list of friends of user
            user.friends.push(friendId); //adding friend in user friends
            friend.friends.push(id); //andd user in friends's friends
        }
        //if one adds both gets added, if one removes both gets removed

        await user.save();
        await friend.save();

        //formatting here too
        const friends = await Promise.all( //This runs all those promises(Executes all DB queries in parallel) in parallel and waits until all are resolved.
            user.friends.map((id) => User.findById(id))
        )
        //formatting the friends list in proper way for frontend    
        const formattedFriends = friends.map(
            ({ _id, firstName, lastName, occupation, location, picturePath, }) => { //fetching only these details from the friends id list, to send them to frontend.
                return { _id, firstName, lastName, occupation, location, picturePath, }
            }
        )

        res.status(200).josn(formattedFriends)

    }catch(err){

    }
}