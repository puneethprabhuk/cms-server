import mongoose from 'mongoose';
import ClientDetails from '../models/client.js';

export const getClients = async (req, res) => {
    try {
        const clientDetails = await ClientDetails.find();
        res.status(200).json(clientDetails);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getClient = async (req, res) => {
    const { id } = req.params;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ message: "No records found" });
        }
        const client = await ClientDetails.findById(id);
        res.status(200).json(client)
    } catch (error) {
        res.status(404).json({ message: 'No client found with that id' });
    }
}

export const addClient = async (req, res) => {
    const clientDetails = req.body;
    clientDetails.createdBy = req.user.id;
    clientDetails.name = `${clientDetails.firstName} ${clientDetails.lastName}`;
    const newClient = new ClientDetails(clientDetails);
    try {
        await newClient.save();
        res.status(201).json(newClient);
    } catch (error) {
        if(error.code === 11000) {
            res.status(409).json({ code: 409, message: "Email address already exists" });
        } else {
            res.status(409).json({ message: error.message });
        }
    }
}

export const updateClient = async (req, res) => {
    const { id } = req.params;
    const client = req.body;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ message: "No records found" });
        }
        const updatedClient = await ClientDetails.findByIdAndUpdate(id, { ...client, id }, { new: true });
        res.status(200).json({ message: "Record updated successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }

}

export const addTransaction = async (req, res) => {
    const { id } = req.params;
    const transaction = req.body;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ message: "No records found" });
        }
        const updatedClient = await ClientDetails.updateOne(
            { _id: id },
            { $push: { transactionDetails: transaction } }
        );
        res.status(200).json({ message: "Record updated successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}


export const updateTransaction = async (req, res) => {
    const { id } = req.params;
    const transaction = req.body;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ message: "No records found" });
        }
        const updatedClient = await ClientDetails.updateOne(
            { _id: id, 'transactionDetails._id': transaction._id },
            { $set: { 
                'transactionDetails.$.typeOfAssignment': transaction.typeOfAssignment,
                'transactionDetails.$.fees': transaction.fees,
                'transactionDetails.$.financialYear': transaction.financialYear,
                'transactionDetails.$.assessmentYear': transaction.assessmentYear,
                'transactionDetails.$.status': transaction.status,
                } 
            }
        );
        res.status(200).json({ message: "Record updated successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const deleteTransaction = async (req, res) => {
    const { id } = req.params;
    const transaction = req.body;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ message: "No records found" });
        }
        const updatedClient = await ClientDetails.updateOne(
            { _id: id },
            { $pull: { transactionDetails: { _id: transaction._id } } }
        );
        res.status(200).json({ message: "Record updated successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}


export const deleteClient = async (req, res) => {
    const { id } = req.params;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ message: "No records found" });
        }
        await ClientDetails.findByIdAndRemove(id);
        res.json({ message: 'Record deleted successfully' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}


export const getTrx = async (req, res) => {
    try {
        const pipeLine = [
            {
                '$unwind': {
                    'path': '$transactionDetails'
                }
            }, {
                '$project': {
                    'name': 1,
                    'clientId': '$_id',
                    'typeOfAssignment': '$transactionDetails.typeOfAssignment',
                    'fees': '$transactionDetails.fees',
                    'financialYear': '$transactionDetails.financialYear',
                    'assessmentYear': '$transactionDetails.assessmentYear',
                    '_id': '$transactionDetails._id',
                    'createdAt': '$transactionDetails.createdAt',
                    'updatedAt': '$transactionDetails.updatedAt',
                    'status': '$transactionDetails.status'
                }
            }, {
                '$sort': {
                    'updatedAt': -1
                }
            }
        ]
        const transactionDetails = await ClientDetails.aggregate(pipeLine);
        res.status(200).json(transactionDetails);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getClientStats = async (req, res) => {

}

export const getTransactionStats = async (req, res) => {

}