import { PassThrough } from "stream";
import { api, headerAPI } from "../configs/axios";
import { IPerson } from "../interfaces/Person";

export class PersonService {
    private apiURL = "v1/persons";

    /**
     * テーブルの内容をすべて取得 API
     */
    public async getAll() {
        try {
            console.log("Consulto")
            const response = await api.get<IPerson[]>(`${this.apiURL}`)
        return await response.data
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    /**
     * formの内容をポストする　API
     */
    public async post(data: IPerson) {
        try {
            const response = await api.post<IPerson>(`${this.apiURL}`,data, headerAPI)
            return await response.data
            
        } catch (error) {
            console.log(error)
            throw error
        }
    }
    public async getById(id: number) {
        try {
            const response = await api.get<IPerson>(`${this.apiURL}/${id}`, headerAPI)
            const data: IPerson = response.data
            return data
        } catch (error) {
            console.log(error)
            throw error;
        }
    }

    /**
     * 更新処理
     */
    public async put(data: IPerson) {
        try {
            const response = await api.put<IPerson>(`${this.apiURL}/${data.id}`, data, headerAPI)
            return await response.data
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    /**
     * 削除処理
     */
    public async delete(data: IPerson) {
        try {
            const response = await api.delete(`${this.apiURL}/${data.id}`, headerAPI)
            return await response.data
        } catch (error) {
            console.log(error)
            throw error
        }
    }
}