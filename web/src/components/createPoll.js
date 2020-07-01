import React, { Fragment, useReducer, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";

const endpoints = {
    create: "http://localhost:3000/polls"
};


const initialState = { loading: false, error: null, success: null, submitting: null };
function reducer(state, action) {
    switch (action.type) {
        case "START_SAVING": {
            return { loading: false, error: null, success: null, submitting: true };
        }
        case "SUCCESS_SAVING": {
            return { loading: false, error: false, success: true, false: true };
        }
        case "ERROR_SAVING": {
            return { loading: false, error: true, success: false, false: true };
        }
        default:
            return state;
    }
}



export default function CreatePoll() {
    const history = useHistory();
    const [state, dispatch] = useReducer(reducer, initialState);
    const [data, setData] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isError, setIsError] = useState(false);
    const { register, handleSubmit, watch, errors } = useForm();


    const onSubmit = async (data) => {
        dispatch({ type: "START_SAVING" });
        savaData(data)
            .then(() => dispatch({ type: "SUCCESS_SAVING" }))
            .catch(() => dispatch({ type: "ERROR_SAVING" }));
    }
    const savaData = async data => {
        alert(JSON.stringify(data))
        setIsError(false);
        setIsSubmitting(true);

        try {
            console.log("Submitting:", data);
            alert(JSON.stringify(data))
            const result = await axios.post(endpoints.create, {
                inputValues: data.formData
            });
            history.push("/polls/" + result.data._id)
        } catch (error) {
            console.log("error", error);
            setIsError(true);
            throw (error)
        }
    };

    return (
        <Fragment>
            {/* "handleSubmit" will validate your inputs before invoking "onSubmit" */}
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* register your input into the hook by invoking the "register" function */}
                <div>
                    <input className="pollTitle" name="title" placeholder="How are you feelin today?" ref={register({ required: true })} />
                    {errors.titleRequired && <span>This field is required</span>}
                </div>

                {/* errors will return when field validation fails  */}                
                <div className="pollChoices">
                    <input
                        className={['choice first-of-type']}
                        placeholder="Awesome"
                        value="Awesome"
                        name="poll[choices][0][text]"
                        ref={register({ required: true })} 
                    >
                    </input>
                    <input
                        className={['choice']}
                        placeholder="Great"
                        value="Great"
                        name="poll[choices][1][text]"
                        ref={register({ required: true })} 
                    >
                    </input>
                </div>
                <input className="pollSubmit" type="submit" />
            </form>
            );
            <div className="creationStatus">
                {state.submitting && <p>submitting...</p>}
                {state.error && <p>Error saving!</p>}
                {state.success && <p>Saved succesfully!</p>}
            </div>
        </Fragment>
    );
}
