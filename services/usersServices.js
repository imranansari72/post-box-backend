import users from "../assets/data.js";


//implementing promises
//get all users

const getAll = () => {
    return new Promise((resolve, reject) => {
        if (users.length > 0) {
            resolve({
                totalUsers: users.length,
                users: users.map((user) => {
                    const { password,posts, ...data } = user;
                    return data;
                }),
            });
        } else {
            reject(new Error("No users found"));
        }
    });
//   return {
//     totalUsers: users.length,
//     users: users.map((user) => {
//       const { password, ...data } = user;
//       return data;
//     }),
//   };
};

//get user by id

const getById = (id) => {
    return new Promise((resolve, reject) => {
        const user = users.find((user) => {
            return user.id === Number(id);
        });
        if (user) {
            const { password, ...data } = user;
            resolve(data);
        }
        reject(new Error("User not found"));
    });
};

export default { getAll, getById };
