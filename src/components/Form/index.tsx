import { useSelector, useDispatch } from "react-redux"
import { PersonState, setData, setPerson } from "../../features/person/personSlice"
import { PersonService } from "../../services/person.service";
import React, { useState } from "react";
import { IPerson, Person } from "../../interfaces/Person";
import Swal from "sweetalert2";
import { title } from "process";

export const Form = () => {
    const { person } = useSelector((state: {person: PersonState }) => state);

    const [ errorForm, setErrorForm ] = useState({
        name: false,
        address: false,
        phone: false,
    })

    const dispatch = useDispatch();

    //formのバリデーション
    const isValidForm = () => {
        const error = {
            name: false,
            address: false,
            phone: false,
        }

        if(!person.data.name) error.name = true
        if(!person.data.address) error.address = true
        if(!person.data.phone) error.phone = true

        setErrorForm(error)

        return error.name || error.address || error.phone;
    }

    const personService = new PersonService();

    const setFormValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setData({...person.data, [event.target.id]: event.target.value }))
    }

    const fetchUpdate = async (event: React.FormEvent<HTMLFormElement>) => {
        try {
            event.preventDefault()
            if(isValidForm()) return null;
            const data: IPerson = await personService.put(person.data)
            //アイテムの追加
            const dataArray: IPerson[] = [...person.list]
            //検索のためのID
            let index: number = dataArray.findIndex((item: IPerson) => item.id === data.id)
            //アイテムの置き換え
            dataArray.splice(index, 1, data)
            //アイテムを更新
            dispatch(setPerson(dataArray))
            //formのデータをクリア
            dispatch(setData(new Person()))

            Swal.fire({
                icon: 'success',
                title: 'The data has been updated'
            })
        }catch(error) {
            console.log(error)
        }
    }

    const fetCreate = async(event: React.FormEvent<HTMLFormElement>) => {
        try {
            event.preventDefault()
            const data: IPerson = await personService.post(person.data)
            //formをクリア
            dispatch(setData(new Person()))
            //アイテムの追加
            const dataArray: IPerson[] = [...person.list]
            dataArray.push(data)
            dispatch(setPerson(dataArray))

            Swal.fire({
                icon: 'success',
                title: 'saveしたよ'
            })
        } catch (error) {
            console.log(error)
        }
    }
    return(
        <div className="px-8 py-4 pb-8 rounded-lg bg-aray-50">
            <form onSubmit={(e) => person.data.id?fetchUpdate(e):fetchUpdate(e)}>
                <div className="mt-4">
                    <label className="md-2 text-gray-800">名前</label>
                    <input id="name" type="text" placeholder="React 太郎" onChange={(e) => setFormValue(e)}
                    value={person.data.name}
                    className="block w-full px-5 py-2.5 mt-2 text-gray-700 placeholder-gray-400 bg-white border-gray-200 rounded-lg" />
                    {errorForm.name && <p className="mt-1 text-m text-red-400">名前を入力してください</p>}
                </div>

                <div className="mt-4">
                    <label className="md-2 text-gray-800">アドレス</label>
                    <input id="address" type="text" placeholder="address" onChange={(e) => setFormValue(e)} 
                    value={person.data.address}
                    className="block w-full px-5 py-2.5 mt-2 text-gray-700 placeholder-gray-400 bg-white border-gray-200 rounded-lg" />
                    {errorForm.address && <p className="mt-1 text-m text-red-400">emailアドレスを入力してください</p>}
                </div>

                <div className="mt-4">
                    <label className="md-2 text-gray-800">電話番号</label>
                    <input id="phone" type="text" placeholder="Arryom" onChange={(e) => setFormValue(e)} 
                    value={person.data.phone} 
                    className="block w-full px-5 py-2.5 mt-2 text-gray-700 placeholder-gray-400 bg-white border-gray-200 rounded-lg" />
                    {errorForm.phone && <p className="mt-1 text-m text-red-400">電話番号を入力してください</p>}
                </div>

                <button className="w-full mt-8 bg-teal-600 text-gray-50 font-semibold py-2 px-4 rounded-lg">
                    {person.data.id?"更新":"登録"}
                </button>

            </form>
        </div>
    )
}