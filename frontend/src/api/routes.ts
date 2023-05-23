import { IGetUserResponse } from '@/utils/types'
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
        const { data } = await api.get('/profile')
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
    getActiveUsers: async () => {
        const { data } = await api.get<IGetUserResponse[]>('/users/active')
        return data
    },
    getInactiveUsers: async () => {
        const { data } = await api.get<IGetUserResponse[]>('/users/inactive')
        return data
    },
    getStations: async () => {
        const { data } = await api.get('/stations')
        return data
    },
    getStation: async (stationId: number) => {
        const { data } = await api.get(`/stations/${stationId}`)
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
}

export default routes
