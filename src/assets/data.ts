const timeStamp = Date.now();

export const data =  {
    cities: [
        {
            id: timeStamp, 
            name: "Un développeur", 
            buildings:[{tplID:1, level:2}],
            wallet: [
                {
                    resourceID: 1, 
                    amount: 1000
                },
                {
                    resourceID: 2, 
                    amount: 1000
                }
            ]
        }
    ], 
    resources:    [
        {id: 1, name: "money"},
        {id: 2, name: "experience"},
        {id: 3, name: "energy"},
        {id: 4, name: "knowledge_points"},
        {id: 5, name: "HTML"},
        {id: 6, name: "CSS"},
        {id: 7, name: "JavaScript"},
        {id: 8, name: "PHP"},
        {id: 9, name: "Python"},
    ],
    templateBuildings: [
        {
            "id": 1,
            "name": "Online Training",
            "levels": [
                {
                    "level": 1,
                    "cost": [
                        { "resourceID": 1, "amount": 50 }
                    ],
                    "prod": [
                        { "resourceID": 2, "amount": 5 }
                    ],
                    "cons": []
                },
                {
                    "level": 2,
                    "cost": [
                        { "resourceID": 1, "amount": 100 },
                        { "resourceID": 5, "amount": 1 }
                    ],
                    "prod": [
                        { "resourceID": 2, "amount": 10 }
                    ],
                    "cons": []
                }
            ]
        },
        {
            "id": 3,
            "name": "Development Tools",
            "levels": [
                {
                    "level": 1,
                    "cost": [
                        { "resourceID": 1, "amount": 80 }
                    ],
                    "prod": [
                        { "resourceID": 2, "amount": 8 }
                    ],
                    "cons": []
                },
                {
                    "level": 2,
                    "cost": [
                        { "resourceID": 1, "amount": 150 },
                        { "resourceID": 6, "amount": 1 }
                    ],
                    "prod": [
                        { "resourceID": 2, "amount": 15 }
                    ],
                    "cons": []
                }
            ]
        },
        {
            "id": 4,
            "name": "Open Source Projects",
            "levels": [
                {
                    "level": 1,
                    "cost": [
                        { "resourceID": 7, "amount": 1 }
                    ],
                    "prod": [
                        { "resourceID": 2, "amount": 15 }
                    ],
                    "cons": []
                },
                {
                    "level": 2,
                    "cost": [
                        { "resourceID": 7, "amount": 2 },
                        { "resourceID": 8, "amount": 1 }
                    ],
                    "prod": [
                        { "resourceID": 2, "amount": 25 }
                    ],
                    "cons": []
                }
            ]
        },
        {
            "id": 5,
            "name": "Web Hosting Platform",
            "levels": [
                {
                    "level": 1,
                    "cost": [
                        { "resourceID": 1, "amount": 200 }
                    ],
                    "prod": [
                        { "resourceID": 2, "amount": 20 }
                    ],
                    "cons": [
                        { "resourceID": 1, "amount": 10 }
                    ]
                },
                {
                    "level": 2,
                    "cost": [
                        { "resourceID": 1, "amount": 400 },
                        { "resourceID": 9, "amount": 1 }
                    ],
                    "prod": [
                        { "resourceID": 2, "amount": 40 }
                    ],
                    "cons": [
                        { "resourceID": 1, "amount": 20 }
                    ]
                }
            ]
        },
        {
            "id": 7,
            "name": "Digital Marketing Agency",
            "levels": [
                {
                    "level": 1,
                    "cost": [
                        { "resourceID": 1, "amount": 300 },
                        { "resourceID": 9, "amount": 2 }
                    ],
                    "prod": [
                        { "resourceID": 2, "amount": 30 }
                    ],
                    "cons": [
                        { "resourceID": 1, "amount": 20 },
                        { "resourceID": 5, "amount": 1 }
                    ]
                },
                {
                    "level": 2,
                    "cost": [
                        { "resourceID": 1, "amount": 500 },
                        { "resourceID": 9, "amount": 4 },
                        { "resourceID": 11, "amount": 1 }
                    ],
                    "prod": [
                        { "resourceID": 2, "amount": 50 }
                    ],
                    "cons": [
                        { "resourceID": 1, "amount": 30 },
                        { "resourceID": 5, "amount": 2 }
                    ]
                }
            ]
        }
    ]
}