const route = require('express').Router();
const Table = require('../../models/Table');

const validate = async (id, name, origStart, origEnd, newStart, newEnd) => {

    let arr = [];

    // Just For convienience
    await Table.find({}, (err, data) => { // We need to Use async keyword because This can take time ......
        arr = data;
    });

    let ok = false;

    for (let i = 0; i < arr.length; i++) {

        if (id === arr[i].id && name === arr[i].name) {

            console.log(id, name, "    ", arr[i].id, arr[i].name, "\n\n");
            console.log(origStart, "   ", origEnd, "   \n", arr[i].startTime, "   ", arr[i].endTime, "\n\n");

            if ((arr[i].startTime === origStart && origEnd === arr[i].endTime)) {
                ok = true;
            }
        }

    }

    if (ok === false) {
        return 2;
    }

    return 1;
}


// const validateTwo = async (id, name,newStart, newEnd) => {

//     let arr = [];

//     // Just For convienience
//     await Table.find({}, (err, data) => { // We need to Use async keyword because This can take time ......
//         console.log(" Inside find");
//         arr = data;
//     });

//     for (let i = 0; i < arr.length; i++) {

//         // If the current person is involved in any other interview at that time
//         if (id === arr[i].id && name === arr[i].name) {

//             if ((arr[i].endTime >= newStart && newEnd >= arr[i].endTime) || (arr[i].startTime <= newEnd && newStart <= arr[i].startTime))
//                 return false;
//         }
//     }
//     return 1;
// }


route.post('/', async (req, res, next) => {

    let name = req.body.name;
    let id = parseInt(req.body.id);
    let oriStart = req.body.origStart + "";
    let oriEnd = req.body.origEnd;
    let newStart = req.body.newStart;
    let newEnd = req.body.newEnd;

    const check = await validate(id, name, oriStart, oriEnd, newStart, newEnd);

    if (check === 2) {
        res.render('failure', {
            message: "Sorry Original Timing Details doesnt match with the respected user"
        })
        return;
    }

    if (check === 0) {
        res.render('failure', {
            message: `Sorry ${name} has another interview scheduled at that time, Try a new Slot`
        });
        return;
    }

    const newInterView = new Table({
        name: name,
        id: id,
        startTime: newStart.toString(),
        endTime: newEnd,
    });

    try {

        await newInterView.save(); // Async is needed else it'll first render the Accepted Page ......

        try {

            await Table.deleteOne({
                name: name,
                id: id,
                startTime: origStart,
                endTime: origEnd,
            }, (err, res) => {

                if (err) {
                    console.log("Document not deleted\n\n", err)
                } else
                    console.log("Deleted Entry\n", res);

            });

        } catch (err) {
            res.render("failure", {
                message: "Soz",
            });
        }

        res.render('accepted', {
            message: `Interview for ${name} with id ${id} has been scheduled at ${startTime}`
        });


    } catch (err) {
        res.render('failure', {
            message: "Sorry Try again",
        })
    }


})

exports = module.exports = {
    route,
}