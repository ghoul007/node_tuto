console.log('before')
const user = getUser(5,(error, userdock)=>{

    console.log("user ", user);
});
console.log('after')

function getUser(id, callback) {
    setTimeout(() => {
        console.log('testing ....')
        callback(null, { id: id, name: "ahmed" })
    }, 0);

}