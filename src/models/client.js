import mongoose from 'mongoose';
import Types from 'mongoose';

const clientSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    name: String,
    contactNumber: Number,
    emailAddress: { type: String, unique: true},
    address: String,
    pan: String,
    itPassword: String,
    remarks: String,
    createdBy: { type: Types.ObjectId },
    transactionDetails: [mongoose.Schema({
        status: String,
        typeOfAssignment: String,
        totalIncome: Number,
        netIncome: Number,
        taxPaid: Number,
        taxRefund: Number,
        modeOfFiling: String,
        dateOfFiling: String,
        fees: Number,
        financialYear: String,
        assessmentYear: String,
    },
    {
        timestamps: true, 
    })]
},
    {
        timestamps: true
    });

const ClientDetails = mongoose.model('ClientDetails', clientSchema);

export default ClientDetails;