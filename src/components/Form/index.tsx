import { useSelector, useDispatch } from "react-redux"
import { PersonState, setData } from "../../features/person/personSlice"
import { PersonService } from "../../services/person.service";
import React from "react";

export const Form = () => {
    const { person } = useSelector((state: {person: PersonState }) => state);

    const dispatch = useDispatch();

    const personService = new PersonService();

    const setFormValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setData({...person.data, [event.target.id]: event.target.value }))
    }
}