export type TUserInReq = {
    id: number,
    email: string
}

export type TToken = {
    exp: number,
    data: TUserInReq,
    iat: number
}
