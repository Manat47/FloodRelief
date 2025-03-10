
const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  wantHelp: Object,
  medicineOptions: Object,
  medicineDetails: Object,
  peopleCount: Number,
  details: String,
  selectedMedia:{ type:mongoose.Schema.Types.ObjectId, ref:"uploads.files",}
  
});

const Request = mongoose.model('Request', requestSchema,'test.abc');

module.exports = Request;