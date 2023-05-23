export interface ILoginBody {
    email: string, 
    password: string
}

export interface IRegisterBody {
    firstName: string, 
    lastName: string, 
    email: string, 
    password: string
}

export interface IGetUserResponse {
    userId: number,
    firstName: string, 
    lastName: string, 
    email: string, 
}

export interface IGetStationResponse {
    stationId: number,
    userId: number,
    computorId: number,
    status: string, 
}
