import { IGetComputorResponse, IGetProfileResponse, IGetStationResponse, IGetUserResponse } from '@/utils/types'
import api from '../utils/axiosInstance'

const routes = {
    login: async (payload: any) =>  {
        const { data } = await api.post('/signin/login', payload)
        return data
    },
    register: async (payload: any) => {
        const { data } = await api.post('/signin/register', payload)
        return data
    },
    logout: async () => {
        const { data } = await api.get('/signin/logout')
        return data
    },
    getProfile: async () => {
        const { data } = await api.get<IGetProfileResponse>('/profile')
        return data
    },
    getUser: async (userId: number) => {
        const { data } = await api.get<IGetUserResponse>(`/users/${userId}`)
        return data
    },
    getUsers: async () => {
        const { data } = await api.get<IGetUserResponse[]>('/users')
        return data
    },
    getAdmins: async () => {
        const { data } = await api.get<Record<string, number>[]>('/users/admins')
        return data
    },
    toggleAdmin: async (payload: { userId: number}) => {
        const { data } = await api.put('/users/admins/toggle', payload)
        return data
    },
    getActiveUsers: async () => {
        const { data } = await api.get<IGetUserResponse[]>('/users/active')
        return data
    },
    getInactiveUsers: async () => {
        const { data } = await api.get<IGetUserResponse[]>('/users/inactive')
        return data
    },
    getStations: async () => {
        const { data } = await api.get<IGetStationResponse[]>('/stations')
        return data
    },
    getStation: async (stationId: number) => {
        const { data } = await api.get<IGetStationResponse>(`/stations/${stationId}`)
        return data
    },
    getStationByUserId: async (userId: number) => {
        const { data } = await api.get<IGetStationResponse>(`/stations/user/${userId}`)
        return data
    },
    moveUserToStation: async (payload: { userId: number, fromStation: number, toStation: number}) => {
        const { data } = await api.put(`/actions/users/move/fromstation`, payload)
        return data
    },
    moveUserToStationFromBench: async (payload: { userId: number, toStation: number}) => {
        const { data } = await api.put(`/actions/users/move/frombench`, payload)
        return data
    },
    benchUser: async (payload: { userId: number, stationId: number}) => {
        const { data } = await api.put(`/actions/users/move/bench`, payload)
        return data
    },
    deleteUser: async (userId: number) => {
        const { data } = await api.delete(`/users/delete/${userId}`)
        return data
    },
    updateUser: async (payload: { userId: number, firstName: string, lastName: string, email: string }) => {
        const { data } = await api.put(`/users/${payload.userId}`, payload)
        return data
    },
    getComputors: async () => {
        const { data } = await api.get<IGetComputorResponse[]>('/computors')
        return data
    },
    getActiveComputors: async () => {
        const { data } = await api.get<IGetComputorResponse[]>('/computors/active')
        return data
    },
    getInactiveComputors: async () => {
        const { data } = await api.get<IGetComputorResponse[]>('/computors/inactive')
        return data
    },
    getComputor: async (computorId?: number) => {
        const { data } = await api.get<IGetComputorResponse>(`/computors(${computorId}`)
        return data
    },
    moveComputorFromStation: async (payload: { computorId: number, fromStation: number, toStation: number}) => {
        const { data } = await api.put(`/actions/computors/move/fromstation`, payload)
        return data
    },
    moveComputorFromService: async (payload: { computorId: number, toStation: number}) => {
        const { data } = await api.put(`/actions/computors/move/fromservice`, payload)
        return data
    },
    moveComputorToService: async (payload: { fromStation: number }) => {
        const { data } = await api.put(`/actions/computors/move/toservice`, payload)
        return data
    },
    addComputor: async (payload: { serialNr: string, type: string, status: string }) => {
        const { data } = await api.post('/computors', payload)
        return data
    },
    addUser: async (payload: { firstName: string, lastName: string, email: string, password: string }) => {
        const { data } = await api.post('/users/add', payload)
        return data
    },
    deleteComputor: async (computorId: number) => {
        const { data } = await api.delete(`/computors/delete/${computorId}`)
        return data
    },
    updateComputor: async (payload: { computorId: number, serialNr: string, type: string, status: string }) => {
        const { data } = await api.put(`/computors/${payload.computorId}`, payload)
        return data
    },
}

export default routes
