'use strict'

import Task from './task.model.js';

//Funcion para realizar test
export const test = (req, res) => {
    console.log('task test is running...');
    return res.send({ message: `Task test is running...` })
}

export const create = async (req, res) => {
    try {
        let data = req.body;

        if (!data || Object.entries(data).length == 0) return res.status(400).send({ message: `Empty data` });

        data.user = req.user._id;
        let task = new Task(data);
        await task.save()
        return res.send({ message: `Task created successfully` });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: `Error creating task`, err });
    }
}

export const get = async (req, res) => {
    try {
        let tasks = await Task.find();
        return res.send({ tasks });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: `Error getting tasks`, err });
    }
}

export const modify = async (req, res) => {
    try {
        let data = req.body;
        let { id } = req.params;

        if (!data || Object.entries(data).length == 0) return res.status(400).send({ mesage: `Empty data` });

        if (
            data.title == '' || 
            data.startDate == '' ||
            data.status == '' ||
            data.user == ''
        ) return res.status(422).send({ message: `Invalid data` })

        let task = await Task.findOneAndUpdate(
            { _id: id },
            data,
            { new: true }
        )

        if (!task) return res.status(404).send({ message: `Task not found` });

        return res.send({ messgae: `Modified task`, task });

    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: `Error modifying task`, err });
    }
}

export const deleteTask = async(req, res)=>{
    try {
        let {id} = req.params;
        let task = await Task.findOneAndDelete({_id: id});
        if(!task) return res.status(404).send({message: `Task not found`});
        return res.send({message: `Task deleted successfully`});
    } catch (err) {
        console.error(err);
        return res.status(500).send({message: `Error deleting task`, err});
    }
}