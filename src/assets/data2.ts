const timeStamp = Date.now();

export const data =  {
    cities: [
        {
            id: timeStamp, 
            name: "Mars", 
            buildings:[{tplID:1, level:1}],
            wallet: [
                {
                    resourceID: 1, 
                    amount: 100
                }
            ]
        }
    ], 
    resources:    [
        {id: 1, name: "oxygène"},
        {id: 2, name: "Minerais"},
        {id: 3, name: "Stabilité psychologique"},
    ],
    templateBuildings: [
        {
            "id": 1,
            "name": "Module de survie",
            "levels": [
                {
                    "level": 1,
                    "cost": [],
                    "prod": [
                        { "resourceID": 2, "amount": 1 }
                    ],
                    "cons": [
                        { "resourceID": 1, "amount": 1 }
                    ]
                }
            ]
        },
        {
            "id": 2,
            "name": "Generateur d'oxygène",
            "levels": [
                {
                    "level": 1,
                    "cost": [
                        { "resourceID": 2, "amount": 10 }
                    ],
                    "prod": [
                        { "resourceID": 1, "amount": 2 }
                    ],
                    "cons": []
                },
                {
                    "level": 2,
                    "cost": [
                        { "resourceID": 1, "amount": 100 },
                        { "resourceID": 2, "amount": 150 }
                    ],
                    "prod": [
                        { "resourceID": 1, "amount": 10 }
                    ],
                    "cons": []
                }
            ]
        },
        {
            "id": 4,
            "name": "Extraction de minerais",
            "levels": [
                {
                    "level": 1,
                    "cost": [
                        { "resourceID": 1, "amount": 20 },
                        { "resourceID": 2, "amount": 50 }
                    ],
                    "prod": [
                        { "resourceID": 2, "amount": 5 }
                    ],
                    "cons": [
                        { "resourceID": 1, "amount": 4 }
                    ]
                }
            ]
        },
        {
            "id": 5,
            "name": "Cellule de communication",
            "levels": [
                {
                    "level": 1,
                    "cost": [
                        { "resourceID": 1, "amount": 100 },
                        { "resourceID": 2, "amount": 400 }
                    ],
                    "prod": [
                        { "resourceID": 3, "amount": 1 }
                    ],
                    "cons": [
                        { "resourceID": 1, "amount": 5 },
                        { "resourceID": 2, "amount": 10 }
                    ]
                }
            ]
        }
    ]
}