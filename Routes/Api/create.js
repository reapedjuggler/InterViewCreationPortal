const route = require('express').Router();
const Table = require('../../models/Table');

// A function to check if required InterView Can be scheduled
async function validate (start, end, id, name) {

    let arr = [];

    await Table.find({}, (err, data) => {                               // We need to Use async keyword because This will be an async task
        console.log(" Inside find");
        arr = data;
    });

    console.log(arr.length , "\n\n\n iam the length\n\n\n")

    if (arr.length <= 2) {
        return false;
    }
    
    console.log("\n\n\n\nFirst Check passeed\n\n\n");

    for (let i = 0; i < arr.length; i++) {

        if (id === arr[i].id && name === arr[i].name) {
           
            console.log(arr[i].startTime,"   ", arr[i].endTime , " \n", start, "   ", end);

            if (arr[i].endTime < start || arr[i].startTime > end) {
                console.log("\niam here\n\n\n\n");
                continue;
            }

            else
                return false;
        }
    }

    return true;
}

route.post('/', async (req, res, next) => {

    console.log(req.body, " \n\niam text\n");
    // console.log(typeof req.body.startTime, "\n", typeof req.body.endTime, "\n", "\n\nobito forever")

    let startTime = req.body.startTime;
    let endTime = req.body.endTime;
    let id = parseInt(req.body.id);
    let name = req.body.name;

    let check = validate(startTime, endTime, id, name);   

    if (check === false) {
        res.render('failure', {
            message: "Sorry The Person is already enrolled in an interview at that time, Please Pick any other Slot!"
        });
    }

    console.log(check);

    console.log(id, "\n", endTime, "\n", id, "\n", startTime);    

    const newInterView = new Table({
        name: name,
        id: id,
        startTime: startTime,
        endTime: endTime,
    });

    try {
        
        await newInterView.save(); 
        console.log("Accepted tho");
        res.render('accepted', {
            message: "Interview has been created"
        });   
    }

    catch (err) {
        res.render('failure', {
            message: err.message,
        })
    }

    // res.send("Fuvk World");
});

exports = module.exports = {
    route,
}
