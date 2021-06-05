const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ArticleSchema = new Schema({
    title: { type: String, min: 5, max: 400, required: true, index: true },
    subtitle: { type: String, min: 5 },
    description: { type: String, min: 5, max: 5000, required: true },
    owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now(), required: true },
    updatedAt: {type:Date, default:Date.now(), required:true}
})

module.exports = mongoose.model('Article', ArticleSchema)