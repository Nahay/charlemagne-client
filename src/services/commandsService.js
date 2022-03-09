import axios from 'axios';
import { toast } from 'react-toastify';
import { config } from './config';

const API_URL = process.env.REACT_APP_API_URL;


const createCommand = async (user, dateC, timeC, paid, container, comment, total) => {
    try {
        const { data } = await axios.post(API_URL + "/commands", {
            user,
            dateC,
            timeC,
            paid,
            container,
            comment,
            total
        });
        return data;
    } catch(err) {
        toast.error(err.message);
    }
};

const getCommands = async (token) => {
    try {
        const { data } = await axios.get(API_URL + "/commands", config(token));
        return data;
    } catch(err) {
        toast.error(err.message);
    }
};

const getVisibleCommands = async (token) => {
    try {
        const { data } = await axios.get(API_URL + "/commands/visible", config(token));
        return data;
    } catch(err) {
        toast.error(err.message);
    }
};

const getCommandByDate = async (dateC, token) => {
    try {
        const { data } = await axios.get(API_URL + "/commands/" +dateC, config(token));
        return data;
    } catch(err) {
        toast.error(err.message);
    }
};

const getCommandByUser = async (user) => {
    try {
        const { data } = await axios.get(API_URL + "/commands/user/" + user);
        return data;
    } catch(err) {
        toast.error(err.message);
    }
};

const getNbOfDishByDay = async (dateC, token) => {
    try {
        const { data } = await axios.get(API_URL + "/commands/" +dateC, config(token));
        
        let nbDish = [];

        data.forEach(d => {
            d.list.forEach(l => {
                if(nbDish.length === 0) nbDish.push({_id: l.dishID._id, nb: l.quantity});
                else {
                    let isHere = false;
                    nbDish.forEach(n => {
                        if(n._id === l.dishID._id) {
                            isHere = true;
                            n.nb += l.quantity;
                        }
                    });
                    !isHere && nbDish.push({_id: l.dishID._id, nb: l.quantity});
                }
            });
        });
        return nbDish;
    } catch(err) {
        toast.error(err.message);
    }
}

const updateCommand = async (id, timeC, paid, container, comment, total, token) => {
    try {
        await axios.patch(
            API_URL + "/commands/" +id, {
                timeC,
                paid,
                container,
                comment,
                total
            }, config(token)
        );
        toast.success("La commande a été mise à jour !");
    } catch(err) {
        toast.error(err.message);
    }
};

const hideCommand = async (id, token) => {
    try {
        await axios.patch(API_URL + "/commands/hide/" + id, {}, config(token));
        toast.success("La commande a été supprimée !");
    } catch(err) {
        toast.error(err.message);
    }
};

const deleteCommand = async (id, token) => {
    try {
        await axios.delete(API_URL + "/commands/" +id, config(token));
        toast.success("La commande a été supprimée !");
    } catch(err) {
        toast.error(err.message);
    }
};


export {
    createCommand,
    getCommands,
    getVisibleCommands,
    getCommandByDate,
    getCommandByUser,
    getNbOfDishByDay,
    updateCommand,
    hideCommand,
    deleteCommand
};