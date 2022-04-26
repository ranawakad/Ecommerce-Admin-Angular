export interface Seller {
       "id": number,
       "created_at": string
        "name": string,
        "email": string,
        "phone": string,
        "address": string,
        "active": boolean,
        "roles": [
            {
              "name": string,
              "guard_name": "web",
              "created_at": string,
            }
          ]
}
