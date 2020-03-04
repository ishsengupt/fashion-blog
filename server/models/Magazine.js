const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const magazineSchema = mongoose.Schema({
    writer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        maxlength: 50
    },
    description: {
        type: String
    },
    price: {
        type: Number,
        default: 0
    },
    images: {
        type: Array,
        default: []
    },
    feature: {
        type: Number,
        default: 0
    },
    continents: {
        type: Number,
        default: 1
    },

    views: {
        type: Number,
        default: 0
    }
}, { timestamps: true })


magazineSchema.index({ 
    title:'text',
    description: 'text',
}, {
    weights: {
        name: 5,
        description: 1,
    }
})

const Magazine = mongoose.model('Magazine', magazineSchema);

module.exports = { Magazine }