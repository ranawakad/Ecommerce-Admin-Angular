export interface Role {
    id:number,
    name:string,
    permissions:[
        {
            id:number,
            name:string
        }
    ]
}
