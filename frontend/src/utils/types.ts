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
    stationId?: number,
    computorId?: number,
}

export interface IGetStationResponse {
    stationId: number,
    userId: number,
    computorId: number,
    status: string, 
}

export interface IGetComputorResponse {
    computorId: number, 
    serialNr: string, 
    type: string, 
    status: string,
    stationId?: number,
    userId?: number
}

export interface IGetProfileResponse {
    userId: number, 
    email: string, 
    firstName: string, 
    lastName: string,
    roles: ['AGENT' | 'TEAMLEADER' | 'ADMIN']
}
