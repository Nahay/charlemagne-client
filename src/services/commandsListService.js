import axios from 'axios';
import { toast } from 'react-toastify';
import { config } from './config';

const API_URL = process.env.REACT_APP_API_URL;


const createCommandList = async (command, dishID, quantity) => {
    try {
        await axios.post(API_URL + "/commandsList", {
            command,
            dishID,
            quantity
        });
    } catch(err) {
        toast.error(err.message);
    }
};

const getCommandsList = async (token) => {
    try {
        const { data } = await axios.get(API_URL + "/commandsList", config(token));
        return data;
    } catch(err) {
        toast.error(err.message);
    }
};

const getCommandListById = async (id, token) => {
    try {
        const { data } = await axios.get(API_URL + "/commandsList/" +id, config(token));
        return data;
    } catch(err) {
        toast.error(err.message);
    }
};

const getCommandListByCommand = async (commandID) => {
    try {
        const { data } = await axios.get(API_URL + "/commandsList/command/" +commandID);
        return data;
    } catch(err) {
        toast.error(err.message);
    }
};

const getCommandListByCommandWithDish = async (commandID) => {
    try {
        const { data } = await axios.get(API_URL + "/commandsList/commandAndDish/" +commandID);
        return data;
    } catch(err) {
        toast.error(err.message);
    }
};

const getOneCommandListByDish = async (dishID, token) => {
    try {
        const { data } = await axios.get(API_URL + "/commandsList/dish/" +dishID, config(token));
        return data;
    } catch(err) {
        toast.error(err.message);
    }
};

const getOneCommandListByDate = async (date, token) => {
    try {
        const { data } = await axios.get(API_URL + "/commandsList/date/" +date, config(token));
        return data;
    } catch(err) {
        toast.error(err.message);
    }
};

const updateQuantity = async (id, quantity, token) => {
    try {
        await axios.patch(
            API_URL + "/commandsList/" +id, {
                quantity
            }, config(token)
        );
        toast.success("La quantité a été mise à jour !");
    } catch(err) {
        toast.error(err.message);
    }
};

const deleteCommandList = async (id, token) => {
    try {
        await axios.delete(API_URL + "/commandsList/" +id, config(token));
        toast.success("L'élement a été supprimé de la commande.");
    } catch(err) {
        toast.error(err.message);
    }
};

const deleteCommandListByCommand = async (commandID, token) => {
    try {
        await axios.delete(API_URL + "/commandsList/command/" +commandID, config(token));
        toast.success("L'élement a été supprimé de la commande.");
    } catch(err) {
        toast.error(err.message);
    }
};

const deleteAllCommandsList = async (commandID, token) => {
    try {
        await axios.delete(API_URL + "/commandsList/commands/" +commandID, config(token));
        toast.success("Les éléments ont été supprimés de la commande.");
    } catch(err) {
        toast.error(err.message);
    }
};

export {
    createCommandList,
    getCommandsList,
    getCommandListById,
    getCommandListByCommand,
    getCommandListByCommandWithDish,
    getOneCommandListByDish,
    updateQuantity,
    deleteCommandList,
    deleteAllCommandsList,
    deleteCommandListByCommand,
    getOneCommandListByDate
};