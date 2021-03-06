import { Payroll } from './payroll.model'
import { s3 } from '../../config/s3.config'


// Save file (Upload to AWS3, then save the record to mongoDB)
export const uploadAndSave = async (req, res) => {
    console.log(req.file);
    const params = {
        Bucket: 'restaskestpayroll',
        Key: req.file.originalname,
        Body: req.file.buffer
    }

    s3.upload(params, async (err, data) => {
        if(err) throw err;
        try {
            const fileRecord = {
                file_title: data.Key,
                file_URL: data.Location
            }
            const addSuccess = await Payroll.create(fileRecord);
            if(addSuccess) {
                return res.status(201).json({
                    success: true,
                    data: addSuccess
                })
            }
            return res.status(400).json({
                success: false,
                message: 'Failed to add record'
            })
        }
        catch (err) {
            console.log(err);
            res.status(500).json({
                success: false,
                message: 'Server Error'
            })
        }
    })
    
}

export const getAllPayroll = async (req, res) => {
    try {
        const allPayroll = await Payroll.find().lean().exec();
        if(!allPayroll){
            return res.status(400).json({
                success: false,
                message: 'No payroll found'
            })
        }
        res.status(200).json({
            success: true,
            data: allPayroll
        })
    }
    catch (err) {
        console.log(err)
        res.status(500).json({
            success: false,
            message: 'Server Error'
        })
    }
}

export const deletePayroll = async (req, res) => {
    try{
        const deletedPayroll = await Payroll.findByIdAndRemove(req.params.id)
        if(!deletedPayroll) {
            return res.status(400).json({
                success: false,
                message: 'Cannot delete payroll'
            })
        }
        res.status(200).json({
            success: true,
            data: deletedPayroll
        })
    }
    catch (err) {
        console.log(err)
        res.status(500).json({
            success: false,
            message: 'Server error'
        })
    }
}

export const updatePayroll = async (req, res) => {
    try {
        const payroll = await Payroll.findByIdAndUpdate({
            _id: req.params.id
        },
        req.body,
        // Add item to database if item does not exist
        {
            new: true
        })
        if (!payroll) {
            return res.status(401).json({
                success: false,
                message: 'Failed to update'
            })
        }
        res.status(200).json({
            success: true,
            message: "Payroll updated successfully",
            data: payroll
        });
    }
    catch (err) {
        if (err.name === "ValidationError") {
            const messages = Object.values(err.errors).map(val => val.message);

            return res.status(400).json({
                success: false,
                error: messages
            });
        } else {
            return res.status(500).json({
                success: false,
                error: "Server Error"
            });
        }
    }
}

export const findPayrollByEmpId = async (req, res) => {
    try {
        const payrollList = await Payroll.find({ employee_id: req.params.id })
    if(!payrollList){
        return res.status(400).json({
            success: false,
            message: 'No payroll for this employee'
        })
    }
    res.status(200).json({
        success: true,
        data: payrollList
    })
    }
    catch (err) {
        console.log(err)
        res.status(500).json({
            success: false,
            message: 'Server Error'
        })
    }
}


