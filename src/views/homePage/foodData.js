export default function  getData(){
    const fooddata = [
        {
            foodId:1,
            foodName:"冰淇淋",
            category:[
            {
              categoryId: 11,
              categoryName:"可爱多",
              img:"/src/assets/picture/可爱多.jpg",
              nowPrice:5,
              oldPrice:6,
              sellCount:90,
              kinds:[
                {
                kindsId: 111,
                categoryName:"草莓味",
                image:'/src/assets/可爱多/草莓味.jpg',
                price:5,
                count: 0,
              },
              {
                kindsId: 112,
                categoryName:"非常草莓味",
                image:'/src/assets/可爱多/非常草莓味.jpg',
                price:6,
                count: 0,
              },
              {
                kindsId: 113,
                categoryName:"非常曲奇奶风味",
                image:'/src/assets/可爱多/非常曲奇奶风味.jpg',
                price:6,
                count: 0,
              },
              {
                kindsId: 114,
                categoryName:"芒果酸奶味",
                image:'/src/assets/可爱多/芒果酸奶味.jpg',
                price:5,
                count: 0,
              },
              {
                kindsId: 115,
                categoryName:"巧克力味",
                image:'/src/assets/可爱多/巧克力味.jpg',
                price:5,
                count: 0,
              },
              {
                kindsId: 116,
                categoryName:"香芋牛奶味",
                image:'/src/assets/可爱多/香芋牛奶味.jpg',
                price:5,
                count: 0,
                },
              ],
           },
           {
            categoryId: 12,
            categoryName:"哈根达斯",
            nowPrice:10,
            sellCount:63,
            img:"/src/assets/冰淇淋/哈根达斯/曲奇香奶口味.jpg",
            kinds:[
              {
                kindsId: 121,
                categoryName:"曲奇香奶口味",
                image:'/src/assets/冰淇淋/哈根达斯/曲奇香奶口味.jpg',
                price:10,
                count: 0,
              },
              {
                kindsId: 122,
                categoryName:"夏威夷果仁口味",
                image:'/src/assets/冰淇淋/哈根达斯/夏威夷果仁口味.jpg',
                price:10,
                count: 0,
              }
            ]
           },
           {
            categoryId: 13,
            categoryName:"巧乐兹",
            nowPrice:4,
            oldPrice:6,
            sellCount:125,
            img:"/src/assets/冰淇淋/巧乐兹/蛋奶双层巧克力味.jpg",
            kinds:[
              {
                kindsId: 131,
                categoryName:"蛋奶双层巧克力味",
                image:'/src/assets/冰淇淋/巧乐兹/蛋奶双层巧克力味.jpg',
                price:4,
                count: 0,
              },
              {
                kindsId: 132,
                categoryName:"柑橘口味",
                image:'/src/assets/冰淇淋/巧乐兹/柑橘口味.jpg',
                price:4,
                count: 0,
              },
              {
                kindsId: 133,
                categoryName:"经典巧恋果口味",
                image:'/src/assets/冰淇淋/巧乐兹/经典巧恋果口味.jpg',
                price:4,
                count: 0,
              },
              {
                kindsId: 134,
                categoryName:"经典巧丝绒口味",
                image:'/src/assets/冰淇淋/巧乐兹/经典巧丝绒口味.jpg',
                price:4,
                count: 0,
              }
            ]
           },
           {
            categoryId: 14,
            categoryName:"甄稀",
            nowPrice:6,
            sellCount:96,
            img:"/src/assets/冰淇淋/甄稀/轻恬香草口味.jpg",
            kinds:[
              {
                kindsId: 141,
                categoryName:"轻恬香草口味",
                image:'/src/assets/冰淇淋/甄稀/轻恬香草口味.jpg',
                price:6,
                count: 0,
              },
              {
                kindsId: 142,
                categoryName:"热恋草莓口味",
                image:'/src/assets/冰淇淋/甄稀/热恋草莓口味.jpg',
                price:6,
                count: 0,
              },
              {
                kindsId: 143,
                categoryName:"提拉米苏口味",
                image:'/src/assets/冰淇淋/甄稀/提拉米苏口味.jpg',
                price:6,
                count: 0,
              },
              {
                kindsId: 144,
                categoryName:"希腊风味酸奶口味",
                image:'/src/assets/冰淇淋/甄稀/希腊风味酸奶口味.jpg',
                price:6,
                count: 0,
              }
            ]
           },
           {
            categoryId: 15,
            categoryName:"钟薛高",
            sellCount:102,
            img:"/src/assets/冰淇淋/钟薛高/丝绒可可口味.jpg",
            nowPrice:20,
            oldPrice:25,
            kinds:[
              {
                kindsId: 151,
                categoryName:"丝绒可可口味",
                image:'/src/assets/冰淇淋/钟薛高/丝绒可可口味.jpg',
                price:20,
                count: 0,
              },
              {
                kindsId: 152,
                categoryName:"半巧主义口味",
                image:'/src/assets/冰淇淋/钟薛高/半巧主义口味.jpg',
                price:20,
                count: 0,
              },
              {
                kindsId: 153,
                categoryName:"芝士草莓口味",
                image:'/src/assets/冰淇淋/钟薛高/芝士草莓口味.jpg',
                price:20,
                count: 0,
              },
            ]
           },
           {
            categoryId: 16,
            categoryName:"可爱多",
            sellCount:234,
            img:"/src/assets/picture/可爱多.jpg",
            nowPrice:4,
            oldPrice:5,
            kinds:[
              {
                kindsId: 161,
                categoryName:"草莓口味",
                image:'/src/assets/可爱多/草莓味.jpg',
                price:20,
                count: 0,
              },
              {
                kindsId: 162,
                categoryName:"非常草莓口味",
                image:'/src/assets/可爱多/非常草莓味.jpg',
                price:20,
                count: 0,
              },
              {
                kindsId: 163,
                categoryName:"非常曲奇奶风口味",
                image:'/src/assets/可爱多/非常曲奇奶风味.jpg',
                price:20,
                count: 0,
              },
              {
                kindsId: 164,
                categoryName:"芒果酸奶口味",
                image:'/src/assets/可爱多/芒果酸奶味.jpg',
                price:20,
                count: 0,
              },
              {
                kindsId: 165,
                categoryName:"巧克力口味",
                image:'/src/assets/可爱多/巧克力味.jpg',
                price:20,
                count: 0,
              },
              {
                kindsId: 166,
                categoryName:"香芋牛奶口味",
                image:'/src/assets/可爱多/香芋牛奶味.jpg',
                price:20,
                count: 0,
              },
            ]
           },
          ]
        },
          {
          foodId:2,
          foodName:"溜溜梅",
          category:[
          {
            categoryId: 21,
            categoryName:"九制梅",
            img:"/src/assets/picture/溜溜梅.jpg",
            nowPrice:5,
            oldPrice:6,
            sellCount:90,
            kinds:[]
          },
        ]
          },

          {
            foodId:3,
            foodName:"溜溜梅",
            category:[
            {
              categoryId: 21,
              categoryName:"九制梅",
              img:"/src/assets/picture/溜溜梅.jpg",
              nowPrice:5,
              oldPrice:6,
              sellCount:90,
              kinds:[]
            }]
            }

        // {
        //     id: 2,
        //     Foodname:"溜溜梅",
        //     img:"/src/assets/picture/溜溜梅.jpg",
        //     category:"零食",
        //     kinds:[
        //       {
        //         id: 21,
        //         name:"九制梅",
        //         image:'/src/assets/溜溜梅/九制梅.jpg',
        //         price:3,
        //         count: 0,
        //       },
        //       {
        //         id: 22,
        //         name:"清梅",
        //         image:'/src/assets/溜溜梅/清梅.jpg',
        //         price:3,
        //         count: 0,
        //       },
        //       {
        //         id: 23,
        //         name:"乌梅",
        //         image:'/src/assets/溜溜梅/乌梅.jpg',
        //         price:3,
        //         count: 0,
        //       },
        //       {
        //         id: 24,
        //         name:"雪梅",
        //         image:'/src/assets/溜溜梅/雪梅.jpg',
        //         price:3,
        //         count: 0,
        //       },
        //       {
        //         id: 25,
        //         name:"咖啡梅",
        //         image:'/src/assets/溜溜梅/咖啡梅.jpg',
        //         price:3,
        //         count: 0,
        //       },
        //       {
        //         id: 26,
        //         name:"话梅",
        //         image:'/src/assets/溜溜梅/话梅.jpg',
        //         price:3,
        //         count: 0,
        //       },
        //       {
        //         id: 27,
        //         name:"情人梅",
        //         image:'/src/assets/溜溜梅/情人梅.jpg',
        //         price:3,
        //         count: 0,
        //       },
        //       {
        //         id: 28,
        //         name:"凤梨梅",
        //         image:'/src/assets/溜溜梅/凤梨梅.jpg',
        //         price:3,
        //         count: 0,
        //       },
        //       {
        //         id: 29,
        //         name:"绿茶梅",
        //         image:'/src/assets/溜溜梅/绿茶梅.jpg',
        //         price:3,
        //         count: 0,
        //       }
        //     ],
        // },
        // {
        //     id: 3,
        //     Foodname:"奥利奥",
        //     img:"/src/assets/picture/奥利奥.jpg",
        //     category:"零食",
        //     kinds:[
        //         {
        //           id: 31,
        //           name:"草莓味夹心",
        //           image:'/src/assets/奥利奥/草莓味夹心.jpg',
        //           price:4,
        //           count: 0,
        //         },
        //         {
        //           id: 32,
        //           name:"红丝绒缤纷豆味",
        //           image:'/src/assets/奥利奥/红丝绒缤纷豆味.jpg',
        //           price:4,
        //           count: 0,
        //         },
        //         {
        //           id: 33,
        //           name:"巧克力夹心原味",
        //           image:'/src/assets/奥利奥/巧克力夹心原味.jpg',
        //           price:4,
        //           count: 0,
        //         },
        //         {
        //           id: 34,
        //           name:"轻甜夹心",
        //           image:'/src/assets/奥利奥/轻甜夹心.png',
        //           price:4,
        //           count: 0,
        //         },
        //         {
        //           id: 35,
        //           name:"树莓味+蓝莓味",
        //           image:'/src/assets/奥利奥/树莓味+蓝莓味.jpg',
        //           price:4,
        //           count: 0,
        //         },
        //       ],
        // },
        // {
        //     id: 4,
        //     Foodname:"麻辣王子",
        //     img:"/src/assets/picture/麻辣王子.jpg",
        //     category:"辣条",
        //     kinds:[
        //         {
        //           id: 41,
        //           name:"单包麻辣王子",
        //           image:'/src/assets/麻辣王子/单包麻辣王子.png',
        //           price:1,
        //           count: 0,
        //         },
        //         {
        //           id: 42,
        //           name:"单袋麻辣王子",
        //           image:'/src/assets/麻辣王子/单袋麻辣王子.png',
        //           price:5,
        //           count: 0,
        //         },
        //         {
        //           id: 43,
        //           name:"麻辣王子大礼包",
        //           image:'/src/assets/麻辣王子/麻辣王子大礼包.jpg',
        //           price:10,
        //           count: 0,
        //         },
        //         {
        //           id: 44,
        //           name:"单箱麻辣王子",
        //           image:'/src/assets/麻辣王子/单箱麻辣王子.jpg',
        //           price:20,
        //           count: 0,
        //         },
        //       ],
        // },
        // {
        //     id: 5,
        //     Foodname:"麻辣王子",
        //     img:"/src/assets/picture/麻辣王子.jpg",
        //     category:"辣条",
        //     kinds:[
        //            {
        //           id: 51,
        //           name:"单包麻辣王子",
        //           image:'/src/assets/麻辣王子/单包麻辣王子.png',
        //           price:1,
        //           count: 0,
        //         },
        //         {
        //           id: 52,
        //           name:"单袋麻辣王子",
        //           image:'/src/assets/麻辣王子/单袋麻辣王子.png',
        //           price:5,
        //           count: 0,
        //         },
        //         {
        //           id: 53,
        //           name:"麻辣王子大礼包",
        //           image:'/src/assets/麻辣王子/麻辣王子大礼包.jpg',
        //           price:10,
        //           count: 0,
        //         },
        //         {
        //           id: 54,
        //           name:"单箱麻辣王子",
        //           image:'/src/assets/麻辣王子/单箱麻辣王子.jpg',
        //           price:20,
        //           count: 0,
        //         }
        //       ],
        // },
        // {
        //     id: 6,
        //     Foodname:"麻辣王子",
        //     img:"/src/assets/picture/麻辣王子.jpg",
        //     category:"辣条",
        //     count: 0,
        //     kinds:[]
        // },
        // {
        //     id: 7,
        //     Foodname:"麻辣王子",
        //     img:"/src/assets/picture/麻辣王子.jpg",
        //     category:"辣条",
        //     count: 0,
        //     kinds:[]
        // },
        // {
        //     id: 8,
        //     Foodname:"麻辣王子",
        //     img:"/src/assets/picture/麻辣王子.jpg",
        //     category:"辣条",
        //     count: 0,
        //     kinds:[]
        // },
        // {
        //     id: 9,
        //     Foodname:"麻辣王子",
        //     img:"/src/assets/picture/麻辣王子.jpg",
        //     category:"辣条",
        //     count: 0,
        //     kinds:[]
        // },
        // {
        //     id: 10,
        //     Foodname:"麻辣王子",
        //     img:"/src/assets/picture/麻辣王子.jpg",
        //     category:"辣条",
        //     count: 0,
        //     kinds:[]
        // },
    ]
    return fooddata
}
