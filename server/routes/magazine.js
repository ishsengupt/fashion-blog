const express = require('express');
const router = express.Router();
const { Magazine } = require("../models/Magazine");
const multer = require('multer');

const { auth } = require("../middleware/auth");

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`)
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        if (ext !== '.jpg' || ext !== '.png') {
            return cb(res.status(400).end('only jpg, png are allowed'), false);
        }
        cb(null, true)
    }
})

var upload = multer({ storage: storage }).single("file")


//=================================
//            Magazine
//=================================

router.post("/uploadImageMag", auth, (req, res) => {

    upload(req, res, err => {
        if (err) {
            return res.json({ success: false, err })
        }
        return res.json({ success: true, image: res.req.file.path, fileName: res.req.file.filename })
    })

});


router.post("/uploadMagazine", auth, (req, res) => {

    //save all the data we got from the client into the DB 
    const magazine = new Magazine(req.body)

    magazine.save((err) => {
        if (err) return res.status(400).json({ success: false, err })
        return res.status(200).json({ success: true })
    })

});


router.post("/getMagazines", (req, res) => {

    let order = req.body.order ? req.body.order : "desc";
    let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
    let limit = req.body.limit ? parseInt(req.body.limit) : 100;
    let skip = parseInt(req.body.skip);

    let findArgs = {};
    let term = req.body.searchTerm;

    for (let key in req.body.filters) {

        if (req.body.filters[key].length > 0) {
            if (key === "price") {
                findArgs[key] = {
                    $gte: req.body.filters[key][0],
                    $lte: req.body.filters[key][1]
                }
            } else {
                findArgs[key] = req.body.filters[key];
            }
        }
    }

    console.log(findArgs)

    if (term) {
        Magazine.find(findArgs)
            .find({ $text: { $search: term } })
            .populate("writer")
            .sort([[sortBy, order]])
            .skip(skip)
            .limit(limit)
            .exec((err, magazines) => {
                if (err) return res.status(400).json({ success: false, err })
                res.status(200).json({ success: true, magazines, postSize: magazines.length })
            })
    } else {
        Magazine.find(findArgs)
            .populate("writer")
            .sort([[sortBy, order]])
            .skip(skip)
            .limit(limit)
            .exec((err, magazines) => {
                if (err) return res.status(400).json({ success: false, err })
                res.status(200).json({ success: true, magazines, postSize: magazines.length })
            })
    }

});


//?id=${productId}&type=single
//id=12121212,121212,1212121   type=array 
router.get("/magazines_by_id", (req, res) => {
    let type = req.query.type
    let magazineIds = req.query.id

    if (type === "array") {
        let ids = req.query.id.split(',');
        magazineIds = [];
        magazineIds = ids.map(item => {
            return item
        })
    }

    //we need to find the product information that belong to product Id 
    Magazine.find({ '_id': { $in: magazineIds } })
    .populate('writer')
    .exec((err, magazine) => {
        if(err) return req.status(400).send(err)
        return res.status(200).send(magazine)
    })
});



module.exports = router;