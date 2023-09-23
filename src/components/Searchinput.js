import React from 'react'
import { useSearch } from '../contextapi/Searchcontext'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Searchinput = () => {
    const host = "http://localhost:5000";
    const navigate = useNavigate();

    const [values, setValues] = useSearch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.get(`${host}/api/v3/product/search/${values.keyword}`);
            setValues({ ...values, result: data });
            navigate("/Search");
        } catch (error) {
            console.log(error);
        }

    }
    return (
        <div>
            <form
                className="d-flex search-form"
                role="search"
                onSubmit={handleSubmit}
            >
                <input
                    className="form-control me-2"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    value={values.keyword}
                    onChange={(e) => setValues({ ...values, keyword: e.target.value })}
                />
                <button className="btn btn-outline-success" type="submit">
                    Search
                </button>
            </form>
        </div>
    )
}

export default Searchinput
