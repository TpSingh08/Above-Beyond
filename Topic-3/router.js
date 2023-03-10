var express = require("express");
var router = express.Router();



const credential = [
    { email: 'john@gmail', password: 'password1', car: { make: 'Tesla', model: 'Model S', year: 2022, img: 'https://www.thedrive.com/content/2021/07/tesla-plaid-lead.jpg?quality=85&crop=16%3A9&auto=webp&optimize=high&quality=70&width=1920' } },
    { email: 'jane@gmail', password: 'password2', car: { make: 'BMW', model: 'i3', year: 2021, img: 'https://hips.hearstapps.com/hmg-prod/images/2021-bmw-i3-mmp-1-1612977543.jpg?crop=0.941xw:0.725xh;0.0288xw,0.125xh&resize=1200:*' } },
    { email: 'jack@gmail', password: 'password3', car: { make: 'Nissan', model: 'Leaf', year: 2023, img: 'https://media.ed.edmunds-media.com/nissan/leaf/2023/oem/2023_nissan_leaf_4dr-hatchback_sv-plus_fq_oem_1_1280x855.jpg' } },
];


// login user
router.post('/login', (req, res)=>{
    const { email, password } = req.body;
    const user = credential.find((cred) => cred.email === email && cred.password === password);

    if(user){
        req.session.user = user.email;
        res.redirect('/route/dashboard');
    }else{
        res.send("Invalid Username or Password");
    }
});

// route for dashboard
// route for dashboard
router.get('/dashboard', (req, res) => {
    if(req.session.user){
        const user = credential.find((cred) => cred.email === req.session.user);
        if(user){
            const carMake = user.car.make;
            const carModel = user.car.model;
            const carYear = user.car.year;
            const carImage = user.car.img || ''; // check if image URL exists
            res.render('dashboard', {user: user, car: user.car, carImage: carImage});
        }else{
            res.send("User not found");
        }
    }else{
        res.send("Unauthorize User");
    }
});




// route for logout
router.get('/logout', (req ,res)=>{
    req.session.destroy(function(err){
        if(err){
            console.log(err);
            res.send("Error")
        }else{
            res.render('base', { title: "Express", logout : "logout Successfully...!"})
        }
    })
})

module.exports = router;