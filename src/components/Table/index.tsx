import { useDispatch, useSelector } from "react-redux"
import { PersonState, setData, setPerson } from "../../features/person/personSlice"
import { PersonService } from "../../services/person.service";
import { IPerson, Person } from "../../interfaces/Person";
import Swal from "sweetalert2";


export const Table = () => {
    const { person } = useSelector((state: { person: PersonState}) => state);

    const personService = new PersonService();

    const dispatch = useDispatch();

    const fetchData = async() => {
        try {
            const res: IPerson[] = await personService.getAll();
            dispatch(setPerson(res))
        } catch (error) {
            console.log('Error to failed load =>',error)
        }
    }

    const onClickEdit = (item: IPerson) => {
        dispatch(setData(item))
    }

    const onClickDelete = (item: IPerson) => {
        Swal.fire({
            title: 'Do you want to save the changes?',
            showCancelButton: true,
            confirmButtonText: 'save',
        }).then((result) => {
            if(result.isConfirmed) {
                fetchDelete(item)
            }
        })
    }

    const fetchDelete = async (item: IPerson) => {
        try {
            await personService.delete(item)

            Swal.fire({
                icon: 'success',
                title: 'the item hos been deleted',
                showConfirmButton: false
            })

            fetchData()

        } catch (error) {
            console.log('Error to faled load ==>', error)
        }
    }

    const onClickInfo = async (item: IPerson) => {
        try {
            const data: IPerson = await personService.getById( item.id! )

            Swal.fire({
                title: 'Details',
                icon: 'info',
                html:
                `<b>名前</b> : ${data.name} <br>` +
                `<b>アドレス</b> : ${data.address} <br>` +
                `<b>電話番号</b> : ${data.phone} <br>`,
                showCloseButton: false,
                showCancelButton: false,
                confirmButtonText: 'OK',
            })
        } catch (error) {
            console.log('Error ==>', error)
        }
    }

    return (
        <div className="inline-block">
            <button className="bg-teal-600 text-gray-50 font-semihold py-2 px-4 rounded-lg" 
            onClick={() => dispatch(setData(new Person()))}>
                New
            </button>

            <div className="over-flow-hidden border border-gray-200 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-slate-800">
                        <tr>
                            <th scope="col" className="px-12 py-3.5 text-slate-50 font-medium text-left">
                                名前
                            </th>
                            <th scope="col" className="px-12 py-3.5 text-slate-50 font-medium text-left">
                                アドレス
                            </th>
                            <th scope="col" className="px-12 py-3.5 text-slate-50 font-medium text-left">
                                電話番号
                            </th>
                            <th scope="col" className="px-12 py-3.5 text-slate-50 font-medium text-left">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {
                            person.list.map((item: IPerson, i) => {
                                return(
                                    <tr key={i}>
                                        <td className="px-12 py-4 whitespace-nowrap">
                                            {item.name}
                                        </td>
                                        <td className="px-4 py-4 whitespace-nowrap">
                                            {item.address}
                                        </td>
                                        <td className="px-4 py-4 whitespace-nowrap">
                                            {item.phone}
                                        </td>
                                        <td className="px-4 py-4 whitespace-nowrap">
                                            <div className="flex items-center gap-x-6">
                                                <button className="bg-sky-600 text-sky-50 font-semibold py-2 px-4 rounded-lg" 
                                                onClick={() => onClickInfo(item)}>
                                                    Info
                                                </button>
                                                <button className="bg-sky-600 text-sky-50 font-semibold py-2 px-4 rounded-lg" 
                                                onClick={() => onClickEdit(item)}>
                                                    Edit
                                                </button>
                                                <button className="bg-sky-600 text-sky-50 font-semibold py-2 px-4 rounded-lg" 
                                                onClick={() => onClickDelete(item)}>
                                                    削除
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}