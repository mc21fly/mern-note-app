const Router = require('express').Router;
const ObjectId = require('mongodb').ObjectId;

const db = require('../db');
const router = Router();

router.get('/', (req, res, next) => {
    db.getDb()
        .db('notes')
        .collection('note')
        .find()
        .toArray()
            .then(result => {
                res.status(200).json(result)
            })
            .catch(e => {
                res.status(404).json({msg: 'Notes not found'})
            })
})

router.delete('/:id', (req, res, next) => {
    db.getDb()
        .db('notes')
        .collection('note')
        .deleteOne({_id: ObjectId(req.params.id)})
            .then(result => {
                res.status(200).json({msg: 'Note deleted'})
            })
            .catch(e => console.log(e))
})

router.get('/edit/:id', (req, res, next) => {
    db.getDb()
        .db('notes')
        .collection('note')
        .findOne({_id: ObjectId(req.params.id)})
            .then(result => {
                res.status(200).json(result)
            })
            .catch(e => console.log(e))
})

router.post('/edit/:id', (req, res, next) => {
    db.getDb()
        .db('notes')
        .collection('note')
        .updateOne(
            {_id: ObjectId(req.params.id)},
            {$set: {
                title: req.body.title,
                description: req.body.description,
                editDate: req.body.editDate
            }})
            .then( result => {
                res.status(200).json({msg: 'Note edited'})
            })
            .catch(e => console.log(e))
})

router.post('/create', (req, res, next) => {
    db.getDb()
        .db('notes')
        .collection('note')
        .insertOne({
            title: req.body.title,
            description: req.body.description,
            postDate: req.body.postDate
        })
            .then(result => {
                res.status(200).json({msg: 'Note added'})
            })
            .catch(e => console.log(e))
})

module.exports = router;