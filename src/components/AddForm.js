import React, { useEffect, useState } from 'react';

const initialForm = {
    idGateway: null,
    serialNumber: "",
    humanName: "",
    ip: ""
}

const AddForm = ({ setAddState, createGateway, toUpdating, setToUpdating, updateGateway }) => {
    const [form, setForm] = useState(initialForm);

    useEffect(() => {
        if (toUpdating) {
            setForm(toUpdating)
        }
        else {
            setForm(initialForm)
        }
    }, [toUpdating])

    const handleCancel = () => {
        setAddState(false);
        setToUpdating(null);
        setForm(initialForm);
    }
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        let count = 0;
        for (const key in form) {
            if (form[key] === "" && key !== form.idGateway) count++;
        }

        if (form.idGateway === null) {
            createGateway(form, count);
            setForm(initialForm);
            setAddState(false);
        }
        else {
            updateGateway(form, count);
            setForm(initialForm);
            setAddState(false);
        }
    }

    return (
        <form className="formContainer" onSubmit={handleSubmit}>
            <p>
                <label htmlFor="serialNumber">Serial Number</label>
                <input type="text" name="serialNumber" id="serialNumber" value={form.serialNumber} onChange={handleChange} />
            </p>
            <p>
                <label htmlFor="humanName">Human Name</label>
                <input type="text" name="humanName" id="humanName" value={form.humanName} onChange={handleChange} />
            </p>
            <p>
                <label htmlFor="ip">IP</label>
                <input type="text" name="ip" id="ip" value={form.ip} onChange={handleChange} />
            </p>
            <p className="buttonForm">
                <input type="submit" value={toUpdating ? "Update" : "Add"} />
                <input type="button" className="cancel" value="Cancel" onClick={handleCancel} />
            </p>
        </form>
    )
}

export default AddForm